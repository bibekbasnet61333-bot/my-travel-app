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
  const transitionDuration = prefersReducedMotion ? '0ms' : '800ms';
  const animationDelay = prefersReducedMotion ? '0ms' : '300ms';

  return (
    <section
      ref={heroRef}
      className="relative h-[45vh] sm:h-[55vh] lg:h-[65vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 min-h-0"
    >
      <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, #f0f9ff 0%, #f0fdf4 100%)' }} />
      
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
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f4c5c]/60 via-[#0f4c5c]/40 to-[#0f4c5c]/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
      </div>

      {/* Floating Elements for Visual Appeal */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-16 sm:top-20 left-4 sm:left-20 w-12 sm:w-16 h-12 sm:h-16 border border-white/20 rounded-full" />
          <div className="absolute top-28 sm:top-40 right-8 sm:right-32 w-10 sm:w-12 h-10 sm:h-12 bg-white/10 rotate-45" />
          <div className="absolute bottom-24 sm:bottom-32 left-8 sm:left-40 w-8 sm:w-10 h-8 sm:h-10 bg-white/10 rounded-lg" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-3 sm:px-6">
        <div className={`text-center ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transition: `opacity ${transitionDuration}` }}>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4 tracking-tight text-white drop-shadow-lg">
            {currentHero.title}
          </h1>
          <p className="text-sm sm:text-lg lg:text-xl text-white/95 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            {currentHero.subtitle}
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className={`absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transition: `opacity ${transitionDuration}`, transitionDelay: animationDelay }} aria-hidden="true">
          <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/40 rounded-full flex justify-center">
            <div className="w-1 h-2 sm:h-3 bg-white/60 rounded-full mt-1 sm:mt-2 animate-pulse"></div>
          </div>
        </div>

        {/* Image Navigation Buttons */}
        <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 flex gap-2">
          <button
            onClick={prevImage}
            aria-label="View previous image"
            className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextImage}
            aria-label="View next image"
            className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Image Counter */}
        <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 text-white/70 text-xs sm:text-sm" aria-live="polite">
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

