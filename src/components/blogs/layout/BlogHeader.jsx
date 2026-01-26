import { formatDate } from '../../../utils/dateUtils';

const BlogHeader = ({ blog }) => {
  return (
    <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[65vh] overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${blog.image})` }}
      />
      <div className="absolute inset-0 bg-black/50 md:bg-black/55 flex items-end">
        <div className="container mx-auto px-4 md:px-6 pb-5 md:pb-6">
          <div className="max-w-4xl">
            <div className="flex items-center justify-between mb-2.5 md:mb-3">
              <span className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold capitalize shadow-lg">
                {blog.category || blog.destination}
              </span>
            </div>

            <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-white mb-2.5 md:mb-3 leading-tight drop-shadow-lg">
              {blog.title}
            </h1>

            <div className="flex flex-wrap items-center gap-2.5 md:gap-4 text-white/90 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 md:w-8 md:h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs md:text-sm">
                  {blog.author?.charAt(0).toUpperCase()}
                </div>
                <span className="font-medium text-sm md:text-base">{blog.author}</span>
              </div>
              <span className="text-white/60 hidden sm:inline">•</span>
              <span className="flex items-center gap-1 text-sm">
                <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {formatDate(blog.date)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogHeader;

