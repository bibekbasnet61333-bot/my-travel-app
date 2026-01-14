import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

export default function DestinationsHero({ category, onCategoryChange }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const heroData = {
    local: {
      images: [
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?q=80&w=2000&auto=format&fit=crop',
      ],
      title: 'Destinations',
      subtitle: 'Discover your next adventure',
    },
    international: {
      images: [
        '/src/assets/bali.jpg',
        '/src/assets/york.jpg',
        '/src/assets/tokyo.jpg',
        '/src/assets/paris_destination.jpg',
      ],
      title: 'Destinations',
      subtitle: 'Discover your next adventure',
    },
  };

  const currentHero = heroData[category];
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

  // Preload next image
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
    <section className="relative h-[400px] md:h-[500px] overflow-hidden">
      {/* Background Images with Fade Transition */}
      <div className="absolute inset-0">
        {images.map((image, index) => (
          <div
            key={image}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex && !isTransitioning ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
        ))}
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-6">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">{currentHero.title}</h1>
        <p className="text-xl md:text-2xl mb-8">{currentHero.subtitle}</p>


        {/* Category Toggle */}
        <div className="bg-white/95 backdrop-blur-sm rounded-full p-2 shadow-xl flex gap-2">
          <button
            onClick={() => handleCategoryClick('local')}
            className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
              category === 'local'
                ? 'bg-gray-900 text-white shadow-lg'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            aria-pressed={category === 'local'}
          >
            Nepal
          </button>
          <button
            onClick={() => handleCategoryClick('international')}
            className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
              category === 'international'
                ? 'bg-gray-900 text-white shadow-lg'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            aria-pressed={category === 'international'}
          >
            International
          </button>
        </div>

        {/* Image Indicators */}
        {images.length > 1 && (
          <div className="flex gap-2 mt-8">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsTransitioning(true);
                  setTimeout(() => {
                    setCurrentImageIndex(index);
                    setIsTransitioning(false);
                  }, 500);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentImageIndex ? 'bg-white w-8' : 'bg-white/50'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

DestinationsHero.propTypes = {
  category: PropTypes.oneOf(['local', 'international']).isRequired,
  onCategoryChange: PropTypes.func.isRequired,
};
