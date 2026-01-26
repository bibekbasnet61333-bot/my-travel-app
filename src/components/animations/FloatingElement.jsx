import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const FloatingElement = ({
  children,
  intensity = 0.2,
  speed = 1,
  direction = 'both',
  range = 10,
  delay = 0
}) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let animationFrameId;
    let startTime = Date.now() + delay;
    let initialTransform = { x: 0, y: 0, rotate: 0 };

    // Get initial position
    const computedStyle = window.getComputedStyle(element);
    const matrix = new DOMMatrix(computedStyle.transform);
    initialTransform = {
      x: matrix.m41,
      y: matrix.m42
    };

    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      const adjustedSpeed = speed * 0.5;

      let transformX = initialTransform.x;
      let transformY = initialTransform.y;
      let rotate = 0;

      if (direction === 'both' || direction === 'x') {
        transformX = initialTransform.x + Math.sin(elapsed * adjustedSpeed) * range;
      }
      if (direction === 'both' || direction === 'y') {
        transformY = initialTransform.y + Math.sin(elapsed * adjustedSpeed * 0.7 + 1) * range;
      }
      if (direction === 'rotate') {
        rotate = Math.sin(elapsed * adjustedSpeed) * range * 2;
      }

      const scale = 1 + Math.sin(elapsed * adjustedSpeed * 0.5) * intensity * 0.1;

      element.style.transform = `translate(${transformX}px, ${transformY}px) rotate(${rotate}deg) scale(${scale})`;

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [intensity, speed, direction, range, delay]);

  return (
    <div
      ref={elementRef}
      style={{ willChange: 'transform' }}
    >
      {children}
    </div>
  );
};

FloatingElement.propTypes = {
  children: PropTypes.node.isRequired,
  intensity: PropTypes.number,
  speed: PropTypes.number,
  direction: PropTypes.oneOf(['both', 'x', 'y', 'rotate']),
  range: PropTypes.number,
  delay: PropTypes.number
};

export default FloatingElement;

