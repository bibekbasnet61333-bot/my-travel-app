import { useState, useEffect, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import { destinationsHeroConfig } from '../../data/destinations';

/**
 * DestinationsHero - Hero section for Destinations page
 * Displays category-based hero with image carousel
 * Uses centralized configuration from destinations.js
 */
function DestinationsHero({ category, onCategoryChange }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentHero = destinationsHeroConfig[category] || destinationsHeroConfig.local;
  const images = currentHero.images;

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
        setIsTransitioning(false);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  // Preload next image for smoother transitions
  useEffect(() => {
    if (images.length <= 1) return;
    const nextIndex = (currentImageIndex + 1) % images.length;
    const img = new Image();
    img.src = images[nextIndex];
  }, [currentImageIndex, images]);

  const handleCategoryClick = useCallback((newCategory) => {
    if (newCategory !== category) {
      setCurrentImageIndex(0);
      onCategoryChange(newCategory);
    }
  }, [category, onCategoryChange]);

  return (
    <section className="relative h-[50vh] sm:h-[60vh] lg:h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Darker Overlay */}
      <div className="absolute inset-0">
        <img
          src={images[currentImageIndex]}
          alt={currentHero.title}
          className={`w-full h-full object-cover transition-opacity duration-700 ${isTransitioning ? 'opacity-80' : 'opacity-100'}`}
        />
        {/* Dark gradient overlay for better focus and contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f4c5c]/60 via-[#0f4c5c]/40 to-[#0f4c5c]/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto text-center px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 text-white drop-shadow-lg tracking-tight">
          {currentHero.title}
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-white/95 mb-8 font-medium drop-shadow-md">
          {currentHero.subtitle}
        </p>

        {/* Category Tabs */}
        <div className="flex justify-center gap-2 sm:gap-4 flex-wrap">
          {['local', 'international', 'combo'].map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`px-6 py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 border-2 ${
                category === cat
                  ? 'bg-white text-[#0f4c5c] border-white shadow-lg'
                  : 'bg-transparent text-white border-white/60 hover:bg-white hover:text-[#0f4c5c] hover:border-white'
              } focus:outline-none focus:ring-2 focus:ring-white/50`}
            >
              {cat === 'local' ? 'Nepal' : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#f7fafc] to-transparent" />
    </section>
  );
}

DestinationsHero.propTypes = {
  category: PropTypes.oneOf(['local', 'international', 'combo']).isRequired,
  onCategoryChange: PropTypes.func.isRequired,
};

// Memoized for performance
export default memo(DestinationsHero);

