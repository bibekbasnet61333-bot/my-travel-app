import React, { useEffect, useRef, useState } from 'react';

/**
 * FloatingElement - Performance optimized floating animation component
 * Uses CSS-based animations instead of JavaScript scroll tracking
 * to eliminate the continuous requestAnimationFrame loop issue
 */
const FloatingElement = ({
  children,
  className = '',
  intensity = 1,
  speed = 1,
  delay = 0,
  direction = 'both',
  trigger = 'scroll',
  range = 20,
  childrenClassName = ''
}) => {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || trigger === 'always') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (trigger === 'scroll') {
            observer.unobserve(element);
          }
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [trigger]);

  // Calculate CSS animation parameters based on props
  const getAnimationName = () => {
    const floatX = direction === 'x' || direction === 'both';
    const floatY = direction === 'y' || direction === 'both';
    const rotate = direction === 'rotate';

    if (rotate) return 'floatRotate';
    if (floatX && floatY) return 'floatBoth';
    if (floatX) return 'floatX';
    if (floatY) return 'floatY';
    return 'floatBoth';
  };

  // Calculate animation duration based on speed prop
  const animationDuration = `${4 / Math.max(speed, 0.1)}s`;

  // Calculate translate range based on intensity and range props
  const translateRange = range * intensity;

  // Generate custom CSS for this instance
  const baseStyle = {
    '--float-range': `${translateRange}px`,
    '--float-duration': animationDuration,
    '--float-delay': `${delay}ms`,
  };

  const animationStyle = {
    ...baseStyle,
    opacity: isVisible ? 1 : 0,
    transform: 'translate3d(0,0,0)', // Force hardware acceleration
    animationName: getAnimationName(),
    animationDuration: animationDuration,
    animationDelay: `${delay}ms`,
    animationIterationCount: 'infinite',
    animationTimingFunction: 'ease-in-out',
  };

  return (
    <div
      ref={elementRef}
      className={`floating-element ${className}`}
      style={animationStyle}
    >
      <style>{`
        .floating-element {
          will-change: transform, opacity;
        }
        
        @keyframes floatBoth {
          0%, 100% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(var(--float-range), calc(var(--float-range) * -0.5));
          }
          50% {
            transform: translate(calc(var(--float-range) * -0.5), var(--float-range));
          }
          75% {
            transform: translate(var(--float-range), calc(var(--float-range) * 0.5));
          }
        }
        
        @keyframes floatX {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(var(--float-range));
          }
        }
        
        @keyframes floatY {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(calc(var(--float-range) * -1));
          }
        }
        
        @keyframes floatRotate {
          0%, 100% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(var(--float-range, 15deg));
          }
        }
      `}</style>
      <div className={childrenClassName}>
        {children}
      </div>
    </div>
  );
};

export default FloatingElement;

