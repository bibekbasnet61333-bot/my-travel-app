import { useState, useEffect, useCallback } from 'react';

/**
 * Animated counter hook with requestAnimationFrame for smooth animations
 * @param {number} targetValue - The target number to animate to
 * @param {boolean} isVisible - Whether the element is visible (triggers animation)
 * @param {number} duration - Animation duration in milliseconds (default: 2000)
 * @returns {number} The current animated value
 */
const useAnimatedCounter = (targetValue, isVisible, duration = 2000) => {
  const [count, setCount] = useState(0);

  const animate = useCallback(() => {
    if (!isVisible || targetValue <= 0) {
      setCount(targetValue);
      return;
    }

    let startTime;
    const startValue = 0;

    const step = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out quart for smooth deceleration
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(startValue + (targetValue - startValue) * easeOutQuart);

      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [isVisible, targetValue, duration]);

  useEffect(() => {
    animate();
  }, [animate]);

  return count;
};

export default useAnimatedCounter;

