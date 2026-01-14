import React from 'react';
import { useNavigate } from 'react-router-dom';
import BlogCard from '../ui/BlogCard';

const RelatedBlogs = ({ blogs, searchQuery = '' }) => {
  const navigate = useNavigate();

  if (!blogs || blogs.length === 0) {
    return null;
  }

  const handleBlogClick = (blog) => {
    navigate(`/blogs/${blog.id}${searchQuery ? `?search=${encodeURIComponent(searchQuery)}` : ''}`);
  };

  return (
    <section className="mt-12">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog, index) => (
          <BlogCard
            key={blog.id}
            blog={blog}
            onClick={handleBlogClick}
            index={index}
            searchQuery={searchQuery}
          />
        ))}
      </div>
    </section>
  );
};

export default RelatedBlogs;
