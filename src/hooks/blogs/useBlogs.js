import { useEffect, useState } from 'react';
import { blogs } from '../../data/blogs/blogsData';
import useFilter from '../useFilter';

/**
 * Custom hook for fetching and filtering blogs
 * Uses centralized useFilter hook for DRY filter logic
 */
const useBlogs = (category = null) => {
  const initialCategory = category || 'all';
  const { activeCategory, setActiveCategory, filteredData, handleCategoryChange } = useFilter(
    blogs,
    initialCategory,
    'category'
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    // Simulate async data fetching
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [activeCategory]);

  // Sync with prop changes
  useEffect(() => {
    if (category && category !== activeCategory) {
      setActiveCategory(category);
    }
  }, [category, activeCategory, setActiveCategory]);

  return {
    blogs: filteredData,
    loading,
    error,
    activeCategory,
    handleCategoryChange
  };
};

export default useBlogs;
