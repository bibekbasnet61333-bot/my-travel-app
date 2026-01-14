import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for Intersection Observer functionality
 * @param {Object} options - Intersection Observer options
 * @param {number} options.threshold - Threshold for intersection (default: 0.1)
 * @param {boolean} options.triggerOnce - Whether to trigger only once (default: false)
 * @returns {Object} - { ref, isIntersecting, entry }
 */
export const useIntersectionObserver = (options = {}) => {
  const {
    threshold = 0.1,
    triggerOnce = false,
    root = null,
    rootMargin = '0px'
  } = options;

  const [isIntersecting, setIsIntersecting] = useState(false);
  const [entry, setEntry] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setEntry(entry);
        setIsIntersecting(entry.isIntersecting);

        // If triggerOnce is true and element is intersecting, unobserve
        if (triggerOnce && entry.isIntersecting) {
          observer.unobserve(element);
        }
      },
      {
        threshold,
        root,
        rootMargin
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, triggerOnce, root, rootMargin]);

  return { ref, isIntersecting, entry };
};
