import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Re-export of useIntersectionObserver from main hooks location
 * This file exists for backward compatibility
 * Reusable intersection observer hook for performance optimization
 * @param {Object} options - IntersectionObserver options
 * @param {number} options.threshold - Threshold for intersection (0-1)
 * @param {boolean} options.unobserveOnIntersect - Whether to unobserve after first intersection
 * @returns {Object} - { elementRef, isVisible }
 */
export const useIntersectionObserver = ({
  threshold = 0.1,
  unobserveOnIntersect = true,
} = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);
  const observerRef = useRef(null);

  const handleIntersect = useCallback(
    (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setIsVisible(true);
        if (unobserveOnIntersect && elementRef.current && observerRef.current) {
          observerRef.current.unobserve(elementRef.current);
        }
      }
    },
    [unobserveOnIntersect]
  );

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    observerRef.current = new IntersectionObserver(handleIntersect, { threshold });
    observerRef.current.observe(element);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleIntersect, threshold]);

  return { elementRef, isVisible };
};

// Default export for backward compatibility
export default useIntersectionObserver;

