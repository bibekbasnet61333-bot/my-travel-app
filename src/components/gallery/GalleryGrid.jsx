import React, { memo } from 'react';
import PropTypes from 'prop-types';
import GalleryCard from './GalleryCard';

const GalleryGrid = ({ destinations, searchQuery }) => {
  if (!destinations || destinations.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="bg-gray-100 rounded-2xl p-12 max-w-md mx-auto">
          <svg
            className="w-16 h-16 mx-auto text-gray-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No destinations available
          </h3>
          <p className="text-gray-500">
            Check back later for new gallery additions.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
      role="list"
      aria-label="Gallery destinations"
    >
      {destinations.map((destination, index) => (
        <GalleryCard
          key={destination.id}
          destination={destination}
          index={index}
          searchQuery={searchQuery}
        />
      ))}
    </div>
  );
};

GalleryGrid.propTypes = {
  destinations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      description: PropTypes.string,
      thumbnail: PropTypes.string,
      imageCount: PropTypes.number,
      comingSoon: PropTypes.bool
    })
  ),
  searchQuery: PropTypes.string
};

export default memo(GalleryGrid);

