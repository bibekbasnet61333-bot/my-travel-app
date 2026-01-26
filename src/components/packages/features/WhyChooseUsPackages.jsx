import { memo, useState, useEffect, useRef, useCallback } from 'react';
import { colors } from '../../../constants/colors';

// Constants for WhyChooseUs section - extracted for maintainability
const PACKAGES_WHY_CHOOSE_US_POINTS = [
  {
    title: "Expert Local Knowledge",
    description: "Our travel specialists have firsthand experience with every destination, ensuring authentic and immersive experiences.",
  },
  {
    title: "Personalized Service",
    description: "We customize every itinerary to match your interests and travel style for a truly unique journey.",
  },
  {
    title: "24/7 Support",
    description: "Our dedicated team is available around the clock to assist with any questions or concerns during your trip.",
  },
  {
    title: "Transparent Pricing",
    description: "We offer competitive rates with no hidden fees, ensuring you get the best value for your investment.",
  }
];

const PACKAGE_STATS = [
  { value: '100%', label: 'Customized' },
  { value: '24/7', label: 'Support' },
  { value: '50+', label: 'Destinations' },
  { value: '4.9★', label: 'Rating' }
];

const AIRLINE_PARTNERS = [
  { name: 'Emirates', logo: null, fallback: 'EK' },
  { name: 'Qatar Airways', logo: null, fallback: 'QR' },
  { name: 'Singapore Airlines', logo: null, fallback: 'SQ' },
  { name: 'Cathay Pacific', logo: null, fallback: 'CX' },
  { name: 'Thai Airways', logo: null, fallback: 'TG' },
  { name: 'Air India', logo: null, fallback: 'AI' }
];

// Animation duration in milliseconds
const ANIMATION_DURATION = 2000;
// Stagger delay between animations in milliseconds
const STAGGER_DELAY = 200;

const AnimatedStat = memo(({ stat, index }) => {
  const [displayValue, setDisplayValue] = useState('0');
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);
  const animationRef = useRef(null);
  const startTimeRef = useRef(null);

  const animateValue = useCallback((timestamp) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
    }

    const elapsed = timestamp - startTimeRef.current;
    const progress = Math.min(elapsed / ANIMATION_DURATION, 1);

    // Easing function for smooth animation
    const easeOutCubic = 1 - Math.pow(1 - progress, 3);

    let currentValue = 0;

    if (stat.value === '100%') {
      currentValue = Math.floor(easeOutCubic * 100);
      setDisplayValue(`${currentValue}%`);
    } else if (stat.value === '50+') {
      currentValue = Math.floor(easeOutCubic * 50);
      setDisplayValue(`${currentValue}+`);
    } else if (stat.value === '4.9★') {
      currentValue = (easeOutCubic * 4.9).toFixed(1);
      setDisplayValue(`${currentValue}★`);
    } else if (stat.value === '24/7') {
      // For text values, just show after delay
      if (progress > 0.5) {
        setDisplayValue(stat.value);
      } else {
        setDisplayValue('');
      }
    }

    if (progress < 1) {
      animationRef.current = requestAnimationFrame(animateValue);
    } else {
      setDisplayValue(stat.value);
    }
  }, [stat.value]);

  // Cleanup function for animation frame
  const cancelAnimation = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          // Stagger animation start based on index
          setTimeout(() => {
            animationRef.current = requestAnimationFrame(animateValue);
          }, index * STAGGER_DELAY);
        }
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
      cancelAnimation();
    };
  }, [animateValue, index, isVisible, cancelAnimation]);

  return (
    <div
      ref={elementRef}
      role="listitem"
      className={`bg-white rounded-lg p-6 shadow-sm border border-slate-200 transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="text-3xl md:text-4xl font-bold mb-2" style={{ color: colors.primary[600] }} aria-label={`${stat.label}: ${stat.value}`}>
        {displayValue}
      </div>
      <div className="text-sm md:text-base text-slate-600">
        {stat.label}
      </div>
    </div>
  );
});

AnimatedStat.displayName = 'AnimatedStat';

const WhyChooseUsPackages = memo(() => {
  return (
    <section
      className="py-12 md:py-16 px-4 sm:px-6 bg-white"
      aria-labelledby="why-choose-us-title"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-slate-800">
            Why Choose Our Travel Packages
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
            Discover what makes our curated travel experiences stand out from the rest, delivering exceptional value and unforgettable memories.
          </p>
        </div>

        {/* Points Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          role="list"
          aria-label="Why choose us features"
        >
          {PACKAGES_WHY_CHOOSE_US_POINTS.map((point, index) => (
            <div
              key={index}
              role="listitem"
              className="text-center p-6 rounded-xl bg-slate-50 border border-slate-100 hover:shadow-md hover:border-slate-200 transition-all duration-300"
            >
              <h3 className="text-lg font-semibold mb-3 text-slate-800">{point.title}</h3>
              <p className="text-slate-600 leading-relaxed text-sm">{point.description}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center mb-12"
          role="list"
          aria-label="Our statistics"
        >
          {PACKAGE_STATS.map((stat, index) => (
            <AnimatedStat key={index} stat={stat} index={index} />
          ))}
        </div>
      </div>

      {/* Preferred Airline Partners */}
      <div className="w-full py-8 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h3 className="text-lg md:text-xl font-bold mb-6 text-slate-800 text-center">Preferred Airline Partners</h3>
          <div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
            role="list"
            aria-label="Airline partners"
          >
            {AIRLINE_PARTNERS.map((airline, index) => (
              <div
                key={index}
                role="listitem"
                className="rounded-lg p-4 border border-slate-200 bg-white transition-all duration-300 hover:shadow-md hover:scale-105 flex items-center justify-center"
              >
                {airline.fallback ? (
                  <span className="text-slate-600 text-sm font-medium text-center">{airline.fallback}</span>
                ) : (
                  <span className="text-slate-600 text-sm font-medium text-center">{airline.name}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

WhyChooseUsPackages.displayName = 'WhyChooseUsPackages';

export default WhyChooseUsPackages;

