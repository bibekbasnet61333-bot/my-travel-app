import { useEffect, useState, useCallback, useRef } from 'react';

/**
 * Scroll animation hook - throttled for performance
 * Uses throttled scroll events instead of requestAnimationFrame loop
 */
export const useScrollAnimation = () => {
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('down');
  const [scrollVelocity, setScrollVelocity] = useState(0);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let lastTime = Date.now();
    let throttleTimer = null;
    const THROTTLE_MS = 50; // Limit to 20fps for performance

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentTime = Date.now();
      const deltaTime = currentTime - lastTime;

      setScrollY(currentScrollY);
      setScrollDirection(currentScrollY > lastScrollY ? 'down' : 'up');
      setScrollVelocity(Math.abs(currentScrollY - lastScrollY) / deltaTime);

      lastScrollY = currentScrollY;
      lastTime = currentTime;
    };

    const throttledHandleScroll = () => {
      if (!throttleTimer) {
        handleScroll();
        throttleTimer = setTimeout(() => {
          throttleTimer = null;
        }, THROTTLE_MS);
      }
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
      if (throttleTimer) clearTimeout(throttleTimer);
    };
  }, []);

  return { scrollY, scrollDirection, scrollVelocity };
};

/**
 * Reusable intersection observer hook for performance optimization
 * @param {Object} options - IntersectionObserver options
 * @param {number} options.threshold - Threshold for intersection (0-1)
 * @param {boolean} options.unobserveOnIntersect - Whether to unobserve after first intersection
 * @param {string} options.rootMargin - Root margin for the observer
 * @returns {Object} - { elementRef, isVisible }
 */
export const useIntersectionObserver = ({
  threshold = 0.1,
  unobserveOnIntersect = false,
  rootMargin = '0px',
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
      } else if (!unobserveOnIntersect) {
        setIsVisible(false);
      }
    },
    [unobserveOnIntersect]
  );

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    observerRef.current = new IntersectionObserver(handleIntersect, {
      threshold,
      rootMargin,
    });
    observerRef.current.observe(element);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [handleIntersect, threshold, rootMargin]);

  return { elementRef, isVisible };
};

/**
 * Alternative return format for useIntersectionObserver (array)
 * @param {Object} options - IntersectionObserver options
 * @returns {Array} - [setRef, isIntersecting, entry]
 */
export const useIntersectionObserverRef = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [entry, setEntry] = useState(null);
  const [ref, setRef] = useState(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        setEntry(entry);
      },
      {
        threshold: 0.1,
        rootMargin: '-10% 0px -10% 0px',
        ...options,
      }
    );

    observer.observe(ref);

    return () => observer.disconnect();
  }, [ref, options]);

  return [setRef, isIntersecting, entry];
};

export const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return mousePosition;
};

export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let throttleTimer = null;
    const THROTTLE_MS = 16;

    const calculateProgress = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalHeight) * 100;
      setProgress(Math.min(currentProgress, 100));
    };

    const throttledCalculateProgress = () => {
      if (!throttleTimer) {
        calculateProgress();
        throttleTimer = setTimeout(() => {
          throttleTimer = null;
        }, THROTTLE_MS);
      }
    };

    window.addEventListener('scroll', throttledCalculateProgress, { passive: true });
    calculateProgress();

    return () => {
      window.removeEventListener('scroll', throttledCalculateProgress);
      if (throttleTimer) clearTimeout(throttleTimer);
    };
  }, []);

  return progress;
};

