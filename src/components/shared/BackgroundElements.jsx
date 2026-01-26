import { memo } from 'react';
import { motion } from 'framer-motion';

/**
 * Unified BackgroundElements component
 * Extracts animated background from all destination pages
 * Theme-configurable for consistent styling
 */
const BackgroundElements = memo(({ theme }) => {
  // Parse gradient colors from theme for background blobs
  const getGradientColors = () => {
    const gradient = theme?.primaryGradientClass || 'from-emerald-600 to-teal-600';
    const match = gradient.match(/from-([\w-]+)\s+to-([\w-]+)/);
    if (match) {
      return {
        primary: match[1],
        secondary: match[2]
      };
    }
    return { primary: 'emerald', secondary: 'teal' };
  };

  const colors = getGradientColors();

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    >
      {/* Top left blob */}
      <motion.div
        className={`absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-${colors.primary}-400/10 to-${colors.secondary}-500/10 rounded-full blur-3xl`}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Top right blob */}
      <motion.div
        className={`absolute top-1/3 right-20 w-96 h-96 bg-gradient-to-br from-${colors.secondary}-400/8 to-${colors.primary}-500/8 rounded-full blur-3xl`}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Bottom left blob */}
      <motion.div
        className={`absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-br from-${colors.primary}-500/5 to-${colors.secondary}-600/5 rounded-full blur-3xl`}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
    </motion.div>
  );
});

BackgroundElements.displayName = 'BackgroundElements';

export default BackgroundElements;

