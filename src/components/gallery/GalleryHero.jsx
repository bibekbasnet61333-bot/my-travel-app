import React, { useMemo, memo } from 'react';
import { motion } from 'framer-motion';
import { getThemeByCategory, GALLERY_HERO_IMAGES } from '../../data/gallery';
import GallerySkeleton from './GallerySkeleton';

const GalleryHero = ({ category, isLoading }) => {
  // Get theme for current category
  const theme = useMemo(() => getThemeByCategory(category), [category]);

  // Get hero image from config
  const heroConfig = useMemo(() => {
    const original = GALLERY_HERO_IMAGES[category] || GALLERY_HERO_IMAGES.national;
    return {
      ...original,
      src: original.image,
      srcSet: null,
      sizes: null
    };
  }, [category]);

  // Hero data based on category
  const heroData = useMemo(() => ({
    national: {
      title: 'Gallery',
      subtitle: 'Discover the beauty within our borders'
    },
    international: {
      title: 'Gallery',
      subtitle: 'Explore destinations worldwide'
    }
  }), []);

  // Show loading skeleton
  if (isLoading) {
    return <GallerySkeleton variant="hero" />;
  }

  // Hero content animation variants
  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    },
    exit: {
      opacity: 0,
      y: -30,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="relative h-[50vh] md:h-[60vh] overflow-hidden">
      {/* Background Image - using img element for better LCP */}
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="absolute inset-0"
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/20 to-black/55 z-10" />

        {/* Image with proper loading attributes for LCP */}
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          src={heroConfig.src}
          alt={heroConfig.alt || 'Gallery hero image'}
          className="w-full h-full object-cover"
          fetchpriority="high"
          loading="eager"
          decoding="sync"
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-6">
        <motion.div
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-4xl"
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent"
            style={{ backgroundImage: theme.titleGradient }}
          >
            {heroData[category]?.title || 'Gallery'}
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-200 mb-8"
          >
            {heroData[category]?.subtitle || 'Discover amazing destinations'}
          </motion.p>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <svg
          className="w-6 h-6 text-white/70"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </motion.div>
    </motion.section>
  );
};

export default memo(GalleryHero);

