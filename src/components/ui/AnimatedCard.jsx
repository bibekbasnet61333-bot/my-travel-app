import { memo, useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

/**
 * AnimatedCard - Shared card component with intersection observer animation
 * Consolidates WhyChooseUsCard and ServiceCard patterns
 * 
 * Usage:
 * <AnimatedCard 
 *   index={index}
 *   icon={<Icon />}
 *   title="Card Title"
 *   description="Card description"
 *   iconBgColor="bg-blue-50"
 *   iconColor="text-blue-600"
 * />
 */
const AnimatedCard = memo(({
  index = 0,
  icon,
  title,
  description,
  iconBgColor = 'bg-blue-50',
  iconColor = 'text-blue-600',
  onClick,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const style = {
    transitionDelay: `${index * 0.1}s`,
  };

  const cardContent = (
    <div
      ref={elementRef}
      onClick={onClick}
      className={`
        bg-white p-4 md:p-5 rounded-xl shadow-sm hover:shadow-lg 
        transition-all duration-500 border border-gray-100
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      style={style}
    >
      <div className="flex items-start gap-3 md:gap-4">
        <div className={`${iconBgColor} p-2.5 md:p-3 rounded-lg ${iconColor} flex-shrink-0`}>
          {icon}
        </div>
        <div>
          <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1">{title}</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );

  // Render with fade-in effect when visible
  if (!isVisible) {
    return (
      <div
        ref={elementRef}
        className="opacity-0 translate-y-4"
        style={style}
      >
        {cardContent}
      </div>
    );
  }

  return cardContent;
});

AnimatedCard.displayName = 'AnimatedCard';

AnimatedCard.propTypes = {
  index: PropTypes.number,
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  iconBgColor: PropTypes.string,
  iconColor: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default AnimatedCard;

