import React, { useState, useEffect } from 'react';
import useBlogHero from '../../../hooks/blogs/useBlogHero';

const BlogHero = ({ category, onCategoryChange }) => {
  const { currentHero, handleCategoryClick } = useBlogHero(category, onCategoryChange);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [prevImage, setPrevImage] = useState(currentHero.image);
  const [displayImage, setDisplayImage] = useState(currentHero.image);

  useEffect(() => {
    if (currentHero.image !== displayImage) {
      setIsTransitioning(true);
      setPrevImage(displayImage);
      setTimeout(() => {
        setDisplayImage(currentHero.image);
        setIsTransitioning(false);
      }, 500);
    }
  }, [currentHero.image, displayImage]);

  const heroCategories = ['nepal', 'international'];

  return (
    <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        {/* Previous image during transition */}
        <img
          src={prevImage}
          alt="Previous"
          className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-500 animate-slow-pulse ${
            isTransitioning ? 'opacity-100' : 'opacity-0'
          }`}
        />
        {/* Current image */}
        <img
          src={displayImage}
          alt={currentHero.title}
          className={`w-full h-full object-cover absolute inset-0 transition-all duration-700 animate-slow-pulse ${
            isTransitioning ? 'opacity-0' : 'opacity-100'
          }`}
        />
        {/* Animated overlay with vintage travel theme color transitions */}
        <div className="absolute inset-0 z-10 animate-color-fade"></div>
        {/* Static base overlay for better text readability */}
        <div className="absolute inset-0 z-20 bg-black/30"></div>
      </div>

      <div className="relative z-30 text-center text-white px-6 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight animate-fade-in-up">
          <span className={`inline-block transition-all duration-500 ${
            category === 'nepal'
              ? 'text-amber-400'
              : 'text-amber-300'
          }`}>
            {currentHero.title}
          </span>
        </h1>
        <p className="text-xl md:text-2xl mb-12 text-gray-100 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {currentHero.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <button
            onClick={() => handleCategoryClick('nepal')}
            className={`px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 ${
              category === 'nepal'
                ? 'bg-amber-500 text-white shadow-lg scale-105'
                : 'bg-white/20 text-white hover:bg-white/30 hover:scale-105 backdrop-blur-sm'
            }`}
          >
            Nepal Adventures
          </button>
          <button
            onClick={() => handleCategoryClick('international')}
            className={`px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 ${
              category === 'international'
                ? 'bg-amber-500 text-white shadow-lg scale-105'
                : 'bg-white/20 text-white hover:bg-white/30 hover:scale-105 backdrop-blur-sm'
            }`}
          >
            International Journeys
          </button>
        </div>
      </div>

      {/* Image Indicator Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex items-center">
        {heroCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            className={`image-indicator ${
              category === cat ? 'image-indicator-active' : 'image-indicator-inactive'
            }`}
            aria-label={`Switch to ${cat} category`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator">
        <svg
          className="w-6 h-6 text-white/80"
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
      </div>
    </section>
  );
};

export default BlogHero;

