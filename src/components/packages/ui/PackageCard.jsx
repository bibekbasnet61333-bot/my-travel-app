import { memo, useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { HighlightedText } from '../../../utils/searchUtils';

// SVG placeholder as data URL for reliable fallback
const PLACEHOLDER_IMAGE = `data:image/svg+xml,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
    <rect fill="#1f2937" width="400" height="300"/>
    <path fill="#374151" d="M200 150 L250 200 L250 100 Z"/>
    <circle fill="#4b5563" cx="200" cy="120" r="40"/>
    <text fill="#6b7280" font-family="system-ui" font-size="14" text-anchor="middle" y="260">Travel Package</text>
  </svg>
`)}`;

function PackageCard({ packageData, searchQuery = '' }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const imgRef = useRef(null);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const handleImageError = useCallback(() => {
    setImageError(true);
    setImageLoaded(true);
  }, []);

  return (
    <Link
      to={`/packages/${packageData.id}`}
      aria-label={`View details for ${packageData.name}`}
      className="group block bg-black rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-black">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse" />
        )}
        <img
          ref={imgRef}
          src={imageError ? PLACEHOLDER_IMAGE : packageData.image}
          alt={packageData.name}
          loading="lazy"
          onLoad={handleImageLoad}
          onError={handleImageError}
          className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-800 text-sm font-semibold rounded-full capitalize">
            {packageData.category}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 text-white text-sm font-semibold rounded-full ${
            packageData.difficulty === 'Easy' ? 'bg-green-500' :
            packageData.difficulty === 'Moderate' ? 'bg-yellow-500' : 'bg-red-500'
          }`}>
            {packageData.difficulty}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 bg-black">
        <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-indigo-300 transition-colors">
          <HighlightedText text={packageData.name} query={searchQuery} />
        </h3>
        <p className="text-gray-300 text-sm mb-4 line-clamp-2">
          <HighlightedText text={packageData.shortDescription} query={searchQuery} />
        </p>

        {/* Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-400">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{packageData.duration}</span>
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>{packageData.groupSize}</span>
          </div>
        </div>

        {/* CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-800">
          <span className="text-sm text-gray-400 group-hover:text-indigo-300 transition-colors">
            View Details
          </span>
          <svg className="w-5 h-5 text-gray-400 group-hover:text-indigo-300 transition-colors transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

PackageCard.propTypes = {
  packageData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    groupSize: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    shortDescription: PropTypes.string.isRequired,
  }).isRequired,
  searchQuery: PropTypes.string,
};

export default memo(PackageCard);
