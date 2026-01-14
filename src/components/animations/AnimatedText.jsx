import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useIntersectionObserverRef } from '../../hooks/useScrollAnimation';

const AnimatedText = ({
  text,
  className = '',
  type = 'fadeIn', // fadeIn, slideUp, slideLeft, slideRight, scale, typewriter
  delay = 0,
  duration = 1000,
  stagger = 0,
  threshold = 0.1
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [ref, inView] = useIntersectionObserverRef({ threshold });
  const textRef = useRef(null);

  useEffect(() => {
    if (inView && !isVisible) {
      setIsVisible(true);
    }
  }, [inView, isVisible]);

  useEffect(() => {
    if (isVisible) {
      if (type === 'typewriter') {
        let i = 0;
        const timer = setInterval(() => {
          if (i < text.length) {
            setDisplayText(prev => prev + text[i]);
            i++;
          } else {
            clearInterval(timer);
          }
        }, 50);
        return () => clearInterval(timer);
      } else {
        setDisplayText(text);
      }
    }
  }, [isVisible, text, type]);

  const getAnimationClass = () => {
    if (!isVisible) return 'opacity-0';

    switch (type) {
      case 'slideUp':
        return 'animate-slideUp';
      case 'slideLeft':
        return 'animate-slideLeft';
      case 'slideRight':
        return 'animate-slideRight';
      case 'scale':
        return 'animate-scale';
      case 'fadeIn':
      default:
        return 'animate-fadeIn';
    }
  };

  const style = {
    animationDelay: `${delay}ms`,
    animationDuration: `${duration}ms`,
    animationFillMode: 'both'
  };

  if (stagger > 0) {
    const words = text.split(' ');
    return (
      <span ref={ref} className={className}>
        {words.map((word, index) => (
          <span
            key={index}
            className={`inline-block ${getAnimationClass()}`}
            style={{
              ...style,
              animationDelay: `${delay + (index * stagger)}ms`
            }}
          >
            {word}
            {index < words.length - 1 && ' '}
          </span>
        ))}
      </span>
    );
  }

  return (
    <span
      ref={ref}
      className={`${className} ${getAnimationClass()}`}
      style={style}
    >
      {type === 'typewriter' ? displayText : text}
      {type === 'typewriter' && isVisible && displayText.length < text.length && (
        <span className="animate-pulse">|</span>
      )}
    </span>
  );
};

export default AnimatedText;
