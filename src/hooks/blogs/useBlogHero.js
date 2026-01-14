import { useState, useCallback } from 'react';

import blogsImage from '../../assets/blogs/blogs.png';
import blogsImage1 from '../../assets/blogs/blogs1.png';

const useBlogHero = (initialCategory = 'nepal', onCategoryChange) => {
  const [category, setCategory] = useState(initialCategory);

  const heroData = {
    nepal: {
      image: blogsImage,
      title: 'Nepal Travel Blogs',
      subtitle: 'Discover the heart of the Himalayas',
    },
    international: {
      image: blogsImage1,
      title: 'International Travel Blogs',
      subtitle: 'Explore the world beyond borders',
    },
  };

  const currentHero = heroData[category];

  const handleCategoryClick = useCallback((newCategory) => {
    if (newCategory !== category) {
      setCategory(newCategory);
      if (onCategoryChange) {
        onCategoryChange(newCategory);
      }
    }
  }, [category, onCategoryChange]);

  return {
    category,
    currentHero,
    handleCategoryClick,
  };
};

export default useBlogHero;

