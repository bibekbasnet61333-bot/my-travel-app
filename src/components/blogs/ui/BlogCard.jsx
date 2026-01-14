
import { Calendar } from 'lucide-react';
import { HighlightedText } from '../../../utils/searchUtils';
import { formatDateShort } from '../../../utils/dateUtils';
import Image from '../../shared/Image';

const DEFAULT_READ_TIME = 5;

const BlogCard = ({ blog, onClick, index, searchQuery }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(blog);
    }
  };

  const readTimeText = blog.readTime ? `${blog.readTime} min read` : `${DEFAULT_READ_TIME} min read`;

  return (
    <div
      className="bg-white rounded-xl shadow-lg border border-amber-100/50 overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-500 cursor-pointer group animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms` }}
      onClick={handleClick}
    >
      {blog.image && (
        <Image
          src={blog.image}
          alt={blog.title}
          className="w-full h-48 group-hover:scale-110 transition-transform duration-700"
          aspectRatio="16/9"
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-cyan-600 group-hover:text-amber-500 transition-colors duration-300" />
            <span className="text-sm font-semibold text-cyan-600 uppercase group-hover:text-amber-600 transition-colors duration-300">
              {blog.category === 'nepal' ? 'NEPAL' : 'INTERNATIONAL'}
            </span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500 group-hover:text-gray-700 transition-colors duration-300">
            <Calendar className="w-3 h-3" />
            <span>{formatDateShort(blog.date)}</span>
          </div>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-cyan-700 transition-colors duration-300">
          <HighlightedText text={blog.title} query={searchQuery} />
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3 group-hover:text-gray-700 transition-colors duration-300">
          <HighlightedText text={blog.excerpt || blog.description} query={searchQuery} />
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center group-hover:from-amber-400 group-hover:to-orange-500 transition-all duration-300">
              <span className="text-white text-sm font-medium">
                {blog.author?.charAt(0) || 'A'}
              </span>
            </div>
            <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300">{blog.author || 'Anonymous'}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-sm text-gray-500 group-hover:text-gray-700 transition-colors duration-300">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{readTimeText}</span>
            </div>
            <svg className="w-4 h-4 text-cyan-600 group-hover:text-amber-500 transition-all duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;

