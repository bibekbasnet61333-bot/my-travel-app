import React from 'react';
import BlogCard from './BlogCard';

const BlogGrid = React.memo(({ blogs, loading, searchQuery, onBlogClick, onClearSearch }) => {
  const handleCardClick = (blog) => {
    if (onBlogClick) {
      onBlogClick(blog);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-amber-100/50 overflow-hidden animate-pulse">
            <div className="w-full h-48 bg-gray-200"></div>
            <div className="p-6">
              <div className="flex items-center justify-end mb-2">
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </div>
              <div className="h-8 bg-gray-200 rounded mb-3"></div>
              <div className="space-y-2 mb-4">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
              <div className="flex items-center justify-end">
                <div className="h-8 bg-gray-200 rounded w-20"></div>
              </div>
              <div className="mt-4 h-4 bg-gray-200 rounded w-32"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!blogs || blogs.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">No Stories Found</h3>
        <p className="text-gray-600 mb-8">
          {searchQuery ? `We couldn't find any travel stories matching "${searchQuery}".` : 'We couldn\'t find any travel stories matching your criteria.'}
        </p>
        {searchQuery && (
          <button
            onClick={onClearSearch}
            className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors"
          >
            Clear Search
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map((blog, index) => (
        <BlogCard
          key={blog.id}
          blog={blog}
          onClick={handleCardClick}
          index={index}
          searchQuery={searchQuery}
        />
      ))}
    </div>
  );
});

export default BlogGrid;

