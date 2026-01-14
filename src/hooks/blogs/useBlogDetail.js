import { useState, useEffect } from 'react';
import { blogs } from '../../data/blogs/blogsData';

const useBlogDetail = (blogId) => {
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!blogId) {
      setError('Blog ID is required');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const foundBlog = blogs.find(b => b.id === blogId);

    if (!foundBlog) {
      setError('Blog not found');
      setLoading(false);
      return;
    }

    setBlog(foundBlog);

    // Get related blogs with proper ID validation
    let related = [];

    // First, try to get related blogs by explicit relatedBlogs IDs (if they exist)
    if (foundBlog.relatedBlogs && foundBlog.relatedBlogs.length > 0) {
      related = foundBlog.relatedBlogs
        .map(relatedId => blogs.find(b => b.id === relatedId))
        .filter(Boolean) // Remove undefined/null entries
        .filter(b => b.id !== blogId); // Exclude current blog
    }

    // If we don't have enough related blogs from explicit IDs, fill with category/tag matches
    if (related.length < 3) {
      const categoryAndTagRelated = blogs
        .filter(b =>
          b.id !== blogId &&
          !related.find(r => r.id === b.id) && // Not already in related
          (b.category === foundBlog.category ||
           b.tags.some(tag => foundBlog.tags.includes(tag)))
        )
        .slice(0, 3 - related.length);

      related = [...related, ...categoryAndTagRelated];
    }

    // Final safety: limit to 3 and ensure uniqueness
    related = related
      .filter((blog, index, self) =>
        index === self.findIndex((b) => b.id === blog.id)
      )
      .slice(0, 3);

    setRelatedBlogs(related);
    setLoading(false);
  }, [blogId]);

  return {
    blog,
    relatedBlogs,
    loading,
    error
  };
};

export default useBlogDetail;
