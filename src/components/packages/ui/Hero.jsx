import { memo, useState, useMemo, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import heroData from '../../../data/heroData.json';

function Hero({ category }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const heroRef = useRef(null);

  const currentHero = useMemo(() => heroData[category] || heroData.all, [category]);
  const images = currentHero.images;

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Intersection Observer for scroll-triggered animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Manual image rotation on user interaction (optional)
  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => {
      return (prev + 1) % images.length;
    });
  }, [images.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => {
      return prev === 0 ? images.length - 1 : prev - 1;
    });
  }, [images.length]);

  // Animation duration based on reduced motion preference
  const transitionDuration = prefersReducedMotion ? '0ms' : '1000ms';
  const animationDelay = prefersReducedMotion ? '0ms' : '500ms';

  return (
    <section
      ref={heroRef}
      className="relative h-[48vh] sm:h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#f7fafc] via-[#f3f6fa] to-[#f7fafc]"
    >
      <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, #f7fafc 0%, #f3f6fa 100%)' }} />
      {/* Background Images */}
      <div className="absolute inset-0">
        {images.map((image, index) => (
          <div
            key={image}
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              opacity: index === currentImageIndex ? 1 : 0,
              transition: `opacity ${transitionDuration}`,
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
      </div>

      {/* Floating Elements for Luxury Feel */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-2 h-2 bg-white/20 rounded-full" style={{ animation: 'gentle-glow 3s ease-in-out infinite' }}></div>
          <div className="absolute top-40 right-20 w-1 h-1 bg-white/30 rounded-full" style={{ animation: 'gentle-glow 3s ease-in-out infinite 1s' }}></div>
          <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-white/10 rounded-full" style={{ animation: 'gentle-glow 3s ease-in-out infinite 2s' }}></div>
          <div className="absolute bottom-20 right-10 w-2 h-2 bg-white/20 rounded-full" style={{ animation: 'gentle-glow 3s ease-in-out infinite 3s' }}></div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-6">
        <div className={`text-center mb-12 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`} style={{ transition: `opacity ${transitionDuration}` }}>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent drop-shadow-2xl">
            {currentHero.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed drop-shadow-lg">
            {currentHero.subtitle}
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`} style={{ transition: `opacity ${transitionDuration}`, transitionDelay: animationDelay }} aria-hidden="true">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>

        {/* Image Navigation Buttons */}
        <div className="absolute bottom-8 right-8 flex gap-2">
          <button
            onClick={prevImage}
            aria-label="View previous image"
            className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextImage}
            aria-label="View next image"
            className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Image Counter */}
        <div className="absolute bottom-8 left-8 text-white/60 text-sm" aria-live="polite">
          {currentImageIndex + 1} / {images.length}
        </div>
      </div>
    </section>
  );
}

Hero.propTypes = {
  category: PropTypes.oneOf(['all', 'cultural', 'luxury', 'wellness', 'adventure']).isRequired,
};

export default memo(Hero);

