
import { formatDate } from '../../../utils/dateUtils';


const BlogHeader = ({ blog }) => {
  return (
    <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${blog.image})` }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 flex items-end">
        <div className="container mx-auto px-6 pb-8">
          <div className="max-w-4xl">
            <div className="flex items-center justify-between mb-4">
              <span className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold capitalize shadow-lg">
                {blog.category || blog.destination}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
              {blog.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-white/90">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {blog.author?.charAt(0).toUpperCase()}
                </div>
                <span className="font-medium">{blog.author}</span>
              </div>
              <span className="text-white/60">•</span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

