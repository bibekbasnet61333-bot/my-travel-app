import { memo, useMemo } from 'react';
import { Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { HighlightedText } from '../../../utils/searchUtils';
import { formatDateShort } from '../../../utils/dateUtils';
import Image from '../../shared/Image';

const DEFAULT_READ_TIME = 5;

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: Math.min(index * 0.08, 0.5)
    }
  })
};

const BlogCard = memo(function BlogCard({ blog, onClick, index, searchQuery }) {
  const readTimeText = useMemo(() => {
    return blog.readTime ? `${blog.readTime} min read` : `${DEFAULT_READ_TIME} min read`;
  }, [blog.readTime]);

  const handleClick = useMemo(() => {
    return () => onClick && onClick(blog);
  }, [blog, onClick]);

  return (
    <motion.article
      className="bg-white rounded-lg md:rounded-xl shadow-md md:shadow-lg border border-amber-100/50 overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer group"
      custom={index}
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      onClick={handleClick}
      role="article"
      aria-label={`Read more about ${blog.title}`}
    >
      {blog.image && (
        <div className="aspect-video overflow-hidden">
          <Image
            src={blog.image}
            alt={blog.title}
            className="w-full h-full group-hover:scale-110 transition-transform duration-500"
            aspectRatio="16/9"
            priority={index < 2}
          />
        </div>
      )}
      <div className="p-4 md:p-5">
        <div className="flex items-center justify-between mb-2 md:mb-3">
          <div className="flex items-center gap-1.5 md:space-x-2">
            <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4 text-cyan-600 group-hover:text-amber-500 transition-colors duration-300" />
            <span className="text-xs md:text-sm font-semibold text-cyan-600 uppercase group-hover:text-amber-600 transition-colors duration-300">
              {blog.category === 'nepal' ? 'NEPAL' : 'INTERNATIONAL'}
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-500 group-hover:text-slate-700 transition-colors duration-300">
            <Calendar className="w-3 h-3" />
            <span className="hidden sm:inline">{formatDateShort(blog.date)}</span>
          </div>
        </div>
        <h3 className="text-base md:text-lg lg:text-xl font-bold text-slate-800 mb-2 line-clamp-2 group-hover:text-cyan-700 transition-colors duration-300">
          <HighlightedText text={blog.title} query={searchQuery} />
        </h3>
        <p className="text-slate-600 text-sm line-clamp-2 mb-3 group-hover:text-slate-700 transition-colors duration-300">
          <HighlightedText text={blog.excerpt || blog.description} query={searchQuery} />
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 md:gap-2">
            <motion.div
              className="w-7 h-7 md:w-8 md:h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center group-hover:from-amber-400 group-hover:to-orange-500 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
            >
              <span className="text-white text-xs md:text-sm font-medium">
                {blog.author?.charAt(0) || 'A'}
              </span>
            </motion.div>
            <span className="text-xs md:text-sm text-slate-600 group-hover:text-slate-800 transition-colors duration-300 hidden sm:inline">{blog.author || 'Anonymous'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-1 text-xs text-slate-500 group-hover:text-slate-700 transition-colors duration-300">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="hidden sm:inline">{readTimeText}</span>
            </div>
            <motion.svg
              className="w-4 h-4 text-cyan-600 group-hover:text-amber-500 transition-all duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              whileHover={{ x: 3 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </motion.svg>
          </div>
        </div>
      </div>
    </motion.article>
  );
});

export default BlogCard;

