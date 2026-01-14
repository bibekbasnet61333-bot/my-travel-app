import { useState, useMemo, useCallback } from 'react';

/**
 * Custom hook for managing filter state and filtered data
 * @param {Array} data - The data array to filter
 * @param {string} initialCategory - Initial active category
 * @param {string} categoryKey - Key to filter by (default: 'category')
 * @returns {Object} - { activeCategory, setActiveCategory, filteredData, handleCategoryChange }
 */
export const useFilter = (data, initialCategory = 'all', categoryKey = 'category') => {
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  const filteredData = useMemo(() =>
    data.filter(item =>
      activeCategory === 'all' || item[categoryKey] === activeCategory
    ),
    [data, activeCategory, categoryKey]
  );

  const handleCategoryChange = useCallback((category) => {
    setActiveCategory(category);
  }, []);

  return {
    activeCategory,
    setActiveCategory,
    filteredData,
    handleCategoryChange,
  };
};

export default useFilter;
