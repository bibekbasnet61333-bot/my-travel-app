import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Reusable scroll progress indicator component
 * Place this at the top of any page that needs scroll progress tracking
 *
 * @param {string} color - Custom color class (e.g., 'from-blue-600 to-stone-600')
 * @param {number} height - Height in pixels (default: 3)
 * @param {boolean} showShadow - Whether to show shadow effect (default: true)
 * @param {boolean} rounded - Whether to show rounded edges (default: true)
 * @param {string} position - Position: 'top' or 'bottom' (default: 'top')
 */
const ScrollProgress = ({
  color = 'from-blue-600 to-stone-600',
  height = 3,
  showShadow = true,
  rounded = true,
  position = 'top',
  className = ''
}) => {
  const { scrollYProgress } = useScroll();
  
  // Smooth out the scroll progress animation
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const positionClasses = position === 'bottom' 
    ? 'bottom-0' 
    : 'top-0';

  const radiusClasses = rounded && height <= 4 
    ? 'rounded-full' 
    : '';

  const shadowClass = showShadow 
    ? 'shadow-lg shadow-blue-600/30' 
    : '';

  return (
    <motion.div
      className={`
        fixed left-0 right-0 z-50
        bg-gradient-to-r ${color}
        ${positionClasses}
        ${radiusClasses}
        ${shadowClass}
        ${className}
      `}
      style={{ 
        height: `${height}px`,
        scaleX,
        transformOrigin: '0%'
      }}
      initial={{ scaleX: 0 }}
      transition={{ duration: 0.1 }}
    />
  );
};

/**
 * Pre-themed scroll progress components for each destination
 * These provide automatic color theming based on the destination
 */
export const ScrollProgressChina = (props) => (
  <ScrollProgress
    color="from-orange-600 via-red-500 to-amber-600"
    {...props}
  />
);

export const ScrollProgressThailand = (props) => (
  <ScrollProgress
    color="from-blue-600 via-cyan-500 to-teal-600"
    {...props}
  />
);

export const ScrollProgressVietnam = (props) => (
  <ScrollProgress
    color="from-teal-600 via-emerald-500 to-green-600"
    {...props}
  />
);

export const ScrollProgressDubai = (props) => (
  <ScrollProgress
    color="from-teal-600 via-orange-500 to-amber-600"
    {...props}
  />
);

export const ScrollProgressBali = (props) => (
  <ScrollProgress
    color="from-emerald-600 via-teal-500 to-cyan-600"
    {...props}
  />
);

export const ScrollProgressAustralia = (props) => (
  <ScrollProgress
    color="from-amber-600 via-orange-500 to-red-600"
    {...props}
  />
);

export const ScrollProgressTurkey = (props) => (
  <ScrollProgress
    color="from-violet-600 via-purple-500 to-fuchsia-600"
    {...props}
  />
);

export const ScrollProgressJapan = (props) => (
  <ScrollProgress
    color="from-pink-600 via-rose-500 to-rose-600"
    {...props}
  />
);

export default ScrollProgress;

