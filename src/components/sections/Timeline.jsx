import { useMemo, memo } from 'react';
import PropTypes from 'prop-types';
import useIntersectionObserver from '../../hooks/about/useIntersectionObserver';

// Timeline Item with image and connected line
const TimelineItem = memo(({ item, index, totalItems }) => {
  const { elementRef, isVisible } = useIntersectionObserver({ threshold: 0.2, unobserveOnIntersect: false });
  const isEven = index % 2 === 0;

  return (
    <div ref={elementRef} className="relative flex items-center justify-between md:justify-normal gap-4 md:gap-8 min-h-[180px]">
      {/* Left side - Image */}
      <div className={`flex-1 ${isEven ? 'md:order-1 md:text-right' : 'md:order-3 md:text-left'}`}>
        <div
          className={`relative overflow-hidden rounded-xl shadow-lg group transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: `${index * 0.1 + 0.2}s` }}
        >
          <img
            src={item.image}
            alt={`${item.title} - ${item.year}`}
            className="w-full h-40 md:h-48 object-cover transform transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60" />
          {/* Year overlay */}
          <div className="absolute bottom-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-lg font-bold text-sm">
            {item.year}
          </div>
        </div>
      </div>

      {/* Center - Timeline connector */}
      <div className="relative flex flex-col items-center md:order-2 z-10">
        {/* Dot */}
        <div
          className={`w-4 h-4 md:w-5 md:h-5 rounded-full border-2 transition-all duration-500 ${
            isVisible
              ? 'bg-blue-600 border-blue-600 scale-110'
              : 'bg-white border-gray-300'
          }`}
          style={{ transitionDelay: `${index * 0.1 + 0.1}s` }}
        />

        {/* Connecting line to next item */}
        {index < totalItems - 1 && (
          <div
            className={`w-0.5 flex-1 mt-0 transition-all duration-500 ${
              isVisible ? 'bg-blue-600' : 'bg-gray-200'
            }`}
            style={{ transitionDelay: `${index * 0.1 + 0.3}s`, height: isVisible ? '80px' : '0px' }}
          />
        )}
      </div>

      {/* Right side - Content */}
      <div className={`flex-1 ${isEven ? 'md:order-3 md:text-left' : 'md:order-1 md:text-right'}`}>
        <div
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: `${index * 0.1 + 0.3}s` }}
        >
          <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1">
            {item.title}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
});

TimelineItem.displayName = 'TimelineItem';
TimelineItem.propTypes = {
  item: PropTypes.shape({
    year: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
};

// Main Timeline Component
const Timeline = memo(({ data }) => {
  const { elementRef: headerElementRef, isVisible: headerVisible } = useIntersectionObserver({
    threshold: 0.2,
    unobserveOnIntersect: false,
  });

  // Memoized items
  const timelineItems = useMemo(
    () => data.map((item, index) => (
      <TimelineItem
        key={`${item.year}-${index}`}
        item={item}
        index={index}
        totalItems={data.length}
      />
    )),
    [data]
  );

  return (
    <section className="py-12 md:py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div
          ref={headerElementRef}
          className={`text-center mb-12 md:mb-16 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 md:mb-3">
            Our Journey
          </h2>
          <p className="text-base md:text-lg text-gray-600">Milestones that shaped our story</p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Main vertical line background */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gray-200" />

          {/* Timeline Items */}
          <div className="pl-8 md:pl-0 relative z-10">
            {timelineItems}
          </div>
        </div>
      </div>
    </section>
  );
});

Timeline.displayName = 'Timeline';
Timeline.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      year: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Timeline;

