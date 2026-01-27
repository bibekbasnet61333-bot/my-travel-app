import { motion } from 'framer-motion';
import { useState, useRef, useEffect, useMemo } from 'react';
import useAnimatedCounter from '../../hooks/about/useAnimatedCounter';
import { parseGradientToStyle } from '../../utils/gradientUtils';

// Default theme values to ensure buttons always have proper coloring
const DEFAULT_THEME = {
  primaryGradientClass: 'from-orange-500 to-red-500',
  secondaryGradientClass: 'from-red-500 to-orange-600',
  titleGradient: 'linear-gradient(to right, #f97316, #ef4444)',
  accentColor: '#ea580c',
  overlayGradient: 'from-amber-900/70 via-yellow-900/60 to-orange-900/70'
};

const StatItem = ({ stat, index, isVisible, themeColor }) => {
  const targetValue = parseInt(stat.value.replace(/[^0-9]/g, '')) || 0;
  const count = useAnimatedCounter(targetValue, isVisible);
  const hasPlus = stat.value.includes('+');
  const hasPercent = stat.value.includes('%');
  const hasMeters = stat.value.includes('m');
  const hasKm = stat.value.includes('km');

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0, y: 20 }}
      animate={isVisible ? { scale: 1, opacity: 1, y: 0 } : { scale: 0.8, opacity: 0, y: 20 }}
      transition={{ delay: 0.4 + index * 0.15, duration: 0.6, ease: 'easeOut' }}
      className="flex flex-col items-center"
    >
      <stat.icon className="w-6 h-6 mb-2" style={{ color: themeColor }} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 + index * 0.15, duration: 0.5 }}
        className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg"
      >
        {count}{hasPlus ? '+' : ''}{hasPercent ? '%' : ''}{hasMeters ? 'm' : ''}{hasKm ? ' km²' : ''}
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 + index * 0.15, duration: 0.5 }}
        className="text-sm md:text-base text-white/80 mt-1"
      >
        {stat.label}
      </motion.div>
    </motion.div>
  );
};

const DestinationHero = ({
  title,
  subtitle,
  backgroundImage,
  stats,
  theme,
  onDownloadPDF,
  onViewGallery,
  contactFormId,
  tourTitle,
  tourSubtitle,
  tourSubtitleColor,
  short = false
}) => {
  // Reduce height when short prop is true - making it shorter overall
  const minHeightClass = short
    ? 'min-h-[40vh] md:min-h-[45vh]'
    : 'min-h-[50vh] md:min-h-[55vh]';
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleBookNow = () => {
    const contactForm = document.querySelector(`#${contactFormId}`);
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Merge theme with defaults and memoize to prevent re-computation
  const mergedTheme = useMemo(() => ({
    ...DEFAULT_THEME,
    ...theme,
    primaryGradientClass: theme?.primaryGradientClass || DEFAULT_THEME.primaryGradientClass,
    secondaryGradientClass: theme?.secondaryGradientClass || DEFAULT_THEME.secondaryGradientClass,
    titleGradient: theme?.titleGradient || DEFAULT_THEME.titleGradient,
    accentColor: theme?.accentColor || DEFAULT_THEME.accentColor,
    overlayGradient: theme?.overlayGradient || DEFAULT_THEME.overlayGradient,
  }), [theme]);

  // Parse theme gradient colors for buttons - memoized
  const primaryGradient = useMemo(() => parseGradientToStyle(mergedTheme.primaryGradientClass), [mergedTheme.primaryGradientClass]);
  const secondaryGradient = useMemo(() => parseGradientToStyle(mergedTheme.secondaryGradientClass), [mergedTheme.secondaryGradientClass]);

  // Extract primary color for accents
  const themePrimaryColor = mergedTheme.accentColor;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className={`relative w-screen relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] ${minHeightClass} flex flex-col items-center justify-center overflow-hidden`}
    >
      {/* Background Image - using img element for better LCP */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: 'easeOut' }}
        className="absolute inset-0 w-full h-full"
      >
        {/* Gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${mergedTheme.overlayGradient} z-10`} />
        <div className="absolute inset-0 bg-black/25 z-10" />

        {/* Image with proper loading attributes for LCP */}
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          src={backgroundImage}
          alt={title}
          className="w-full h-full object-cover"
          fetchpriority="high"
          loading="eager"
          decoding="sync"
        />
      </motion.div>

      {/* Background Overlay with theme colors */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
        className={`absolute inset-0 bg-gradient-to-br ${mergedTheme.overlayGradient}`}
      />

      <div className="relative z-10 text-center text-white px-6 sm:px-8 max-w-5xl mx-auto w-full pt-10 md:pt-14">
        {/* Main Title */}
        <motion.h1
          initial={{ y: 50, opacity: 0, filter: 'blur(10px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 font-poppins bg-gradient-to-r bg-clip-text text-transparent drop-shadow-xl"
          style={{ backgroundImage: mergedTheme.titleGradient }}
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0, filter: 'blur(5px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          transition={{ delay: 0.35, duration: 0.6, ease: 'easeOut' }}
          className="text-lg sm:text-xl md:text-2xl mb-5 md:mb-6 max-w-3xl mx-auto text-white/95 leading-relaxed"
        >
          {subtitle}
        </motion.p>

        {/* Tour Title and Subtitle - With destination theme coloring, Dubai-style animated */}
        {(tourTitle || tourSubtitle) && (
          <motion.div
            initial={{ y: 30, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
            className="mb-8 md:mb-10"
          >
            {tourTitle && (
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 drop-shadow-lg tracking-wide text-red-500"
                style={{ color: String(tourSubtitleColor || '#ef4444') }}
              >
                {tourTitle}
              </motion.h2>
            )}
            {tourSubtitle && (
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.75, duration: 0.6 }}
                className="text-base sm:text-lg md:text-xl font-bold drop-shadow-md"
                style={{ color: String(tourSubtitleColor || '') }}
              >
                {tourSubtitle}
              </motion.p>
            )}
          </motion.div>
        )}

        {/* CTA Buttons - Dubai-style */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.85, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center mb-8 md:mb-10"
        >
          <motion.button
            onClick={handleBookNow}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="text-white px-6 py-3 md:px-8 md:py-3.5 rounded-xl font-bold text-sm md:text-base transition-all duration-300 shadow-lg w-full sm:w-auto min-w-[140px]"
            style={primaryGradient}
          >
            Book Now
          </motion.button>

          {onDownloadPDF && (
            <motion.button
              onClick={onDownloadPDF}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="text-white px-6 py-3 md:px-8 md:py-3.5 rounded-xl font-bold text-sm md:text-base transition-all duration-300 shadow-lg w-full sm:w-auto min-w-[140px]"
              style={secondaryGradient}
            >
              Download PDF
            </motion.button>
          )}

          {onViewGallery && (
            <motion.button
              onClick={onViewGallery}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="text-white px-6 py-3 md:px-8 md:py-3.5 rounded-xl font-bold text-sm md:text-base transition-all duration-300 shadow-lg w-full sm:w-auto min-w-[140px]"
              style={{
                background: `linear-gradient(135deg, #78716c 0%, #57534e 100%)`,
              }}
            >
              View Gallery
            </motion.button>
          )}
        </motion.div>

        {/* Stats Section - Smaller and more compact */}
        {stats && stats.length > 0 && (
          <motion.div
            ref={statsRef}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="w-full max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.5 }}
              className="grid grid-cols-4 gap-4 md:gap-6 py-5 px-4 md:py-6 md:px-8 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20"
            >
              {stats.map((stat, index) => (
                <StatItem
                  key={index}
                  stat={stat}
                  index={index}
                  isVisible={statsVisible}
                  themeColor={themePrimaryColor}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

export default DestinationHero;

