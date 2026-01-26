import React, { useState, useEffect, useMemo, useCallback, memo } from 'react';
import { motion } from 'framer-motion';
import useBlogHero from '../../../hooks/blogs/useBlogHero';

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' }
  }
};

const imageVariants = {
  hidden: { opacity: 0, scale: 1.05 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

const OVERLAY_ANIMATION = {
  nepal: {
    background: 'linear-gradient(135deg, rgba(120,53,15,0.6) 0%, rgba(0,0,0,0.4) 50%, rgba(180,83,9,0.5) 100%)'
  },
  international: {
    background: 'linear-gradient(135deg, rgba(15,23,42,0.6) 0%, rgba(30,64,120,0.4) 50%, rgba(15,23,42,0.5) 100%)'
  }
};

const BlogHero = memo(function BlogHero({ category, onCategoryChange }) {
  const { currentHero, handleCategoryClick } = useBlogHero(category, onCategoryChange);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const heroCategories = useMemo(() => ['nepal', 'international'], []);

  const onCategoryClickHandler = useCallback((cat) => {
    handleCategoryClick(cat);
  }, [handleCategoryClick]);

  return (
    <section className="relative h-[45vh] md:h-[55vh] lg:h-[60vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute inset-0"
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={imageVariants}
        >
          <img
            src={currentHero.image}
            alt={currentHero.title}
            className="w-full h-full object-cover"
            loading="eager"
            fetchpriority="high"
          />
        </motion.div>

        <motion.div
          className="absolute inset-0 z-10"
          animate={category === 'nepal' ? OVERLAY_ANIMATION.nepal : OVERLAY_ANIMATION.international}
          transition={{ duration: 1, ease: 'easeInOut' }}
        />

        <div className="absolute inset-0 z-20 bg-black/35" />
      </div>

      <div className="relative z-30 text-center text-white px-4 sm:px-6 max-w-3xl mx-auto">
        <motion.h1
          className="text-xl sm:text-3xl lg:text-4xl font-bold mb-2.5 sm:mb-3 lg:mb-4 tracking-tight"
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={fadeInUpVariants}
        >
          <motion.span
            className={`inline-block transition-colors duration-500 ${
              category === 'nepal'
                ? 'text-amber-400'
                : 'text-amber-300'
            }`}
          >
            {currentHero.title}
          </motion.span>
        </motion.h1>

        <motion.p
          className="text-sm sm:text-base lg:text-lg mb-5 sm:mb-6 lg:mb-8 text-gray-100"
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={fadeInUpVariants}
          style={{ transitionDelay: '0.1s' }}
        >
          {currentHero.subtitle}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-2.5 sm:gap-4 justify-center items-center"
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={fadeInUpVariants}
          style={{ transitionDelay: '0.15s' }}
        >
          <motion.button
            onClick={() => onCategoryClickHandler('nepal')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`px-5 py-2 sm:px-6 sm:py-2.5 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 ${
              category === 'nepal'
                ? 'bg-amber-500 text-white shadow-lg'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            Nepal Adventures
          </motion.button>
          <motion.button
            onClick={() => onCategoryClickHandler('international')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`px-5 py-2 sm:px-6 sm:py-2.5 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 ${
              category === 'international'
                ? 'bg-amber-500 text-white shadow-lg'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            International Journeys
          </motion.button>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-4 sm:bottom-5 left-1/2 transform -translate-x-1/2 z-30 flex items-center gap-2"
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.3 }}
      >
        {heroCategories.map((cat) => (
          <motion.button
            key={cat}
            onClick={() => onCategoryClickHandler(cat)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 ${
              category === cat ? 'bg-amber-400 w-5 sm:w-6' : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Switch to ${cat} category`}
          />
        ))}
      </motion.div>

      <motion.div
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 hidden sm:block"
        initial={{ opacity: 0, y: -10 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
        transition={{ delay: 0.4, duration: 0.3 }}
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg
            className="w-5 h-5 text-white/60"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
});

export default BlogHero;

