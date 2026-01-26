import { memo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * Unified DestinationCard component with variant support
 * Supports: 'standard' (Destinations page), 'combo' (ComboCountries), 'compact' (home section)
 */
function DestinationCard({
  destination,
  category,
  variant = 'standard',
  showDuration = false,
  className = ''
}) {
  const { id, name, description, image, duration } = destination;
  const linkPath = `/destinations/${category}/${id}`;

  // Variant-based styling configurations
  const variants = {
    standard: {
      containerClass: 'bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2',
      imageHeight: 'h-64',
      imageScale: 'group-hover:scale-110',
      titleClass: 'text-2xl font-bold text-white absolute bottom-4 left-4',
      contentClass: 'p-6',
      descriptionClass: 'text-gray-600 line-clamp-2',
      badgeClass: 'px-3 py-1 bg-[#0f4c5c] text-white backdrop-blur-sm rounded-full text-xs font-medium',
      linkColor: 'text-indigo-600'
    },
    combo: {
      containerClass: 'bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2',
      imageHeight: 'h-64',
      imageScale: 'group-hover:scale-110',
      titleClass: 'text-xl font-bold text-white absolute bottom-4 left-4',
      contentClass: 'p-6',
      descriptionClass: 'text-gray-600 line-clamp-2 mb-4',
      badgeClass: 'px-3 py-1 bg-[#0f4c5c] text-white backdrop-blur-sm rounded-full text-xs font-medium',
      linkColor: 'text-indigo-600'
    },
    compact: {
      containerClass: 'group relative block overflow-hidden rounded-xl cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1',
      imageHeight: 'aspect-[4/3]',
      imageScale: 'group-hover:scale-110',
      titleClass: 'text-lg sm:text-xl font-bold mb-1',
      descriptionClass: 'text-gray-200 text-sm mb-3 line-clamp-1',
      badgeClass: 'px-3 py-1 bg-[#1A1A40] text-white backdrop-blur-sm rounded-full text-xs font-medium',
      linkColor: 'text-white'
    }
  };

  const styles = variants[variant] || variants.standard;

  const renderBadge = () => {
    if (variant === 'compact') {
      return (
        <div className="absolute top-4 right-4">
          <span className={styles.badgeClass}>{duration}</span>
        </div>
      );
    }
    if (showDuration && duration) {
      return (
        <div className="absolute top-4 right-4">
          <span className={styles.badgeClass}>{duration}</span>
        </div>
      );
    }
    return null;
  };

  return (
    <Link
      to={linkPath}
      className={`${styles.containerClass} ${className}`}
    >
      <div className={`relative ${styles.imageHeight} overflow-hidden`}>
        <img
          src={image}
          alt={name}
          loading="lazy"
          decoding="async"
          className={`w-full h-full object-cover transition-transform duration-500 ${styles.imageScale}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        {renderBadge()}
        <h3 className={styles.titleClass}>
          {name}
        </h3>
      </div>
      <div className={styles.contentClass}>
        <p className={styles.descriptionClass}>{description}</p>
        {variant !== 'compact' && (
          <div className={`mt-4 flex items-center ${styles.linkColor} font-semibold group-hover:gap-2 transition-all`}>
            <span>Explore</span>
            <svg
              className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        )}
      </div>
    </Link>
  );
}

DestinationCard.propTypes = {
  destination: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    duration: PropTypes.string,
  }).isRequired,
  category: PropTypes.oneOf(['local', 'international', 'nepal', 'combo']).isRequired,
  variant: PropTypes.oneOf(['standard', 'combo', 'compact']),
  showDuration: PropTypes.bool,
  className: PropTypes.string,
};

// Memoized for performance optimization
export default memo(DestinationCard);

