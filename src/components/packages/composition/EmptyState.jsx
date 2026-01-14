import React from 'react';
import PropTypes from 'prop-types';

/**
 * Reusable EmptyState component for package listings
 * Dark theme by default for consistent dark backgrounds
 */
const EmptyState = ({
  onClearSearch,
  title = 'No packages found',
  description = 'We couldn\'t find any travel packages matching your search criteria. Try adjusting your search or browse all our available packages.',
  iconType = 'search'
}) => {

  const renderIcon = () => {
    switch (iconType) {
      case 'search':
        return (
          <svg
            className="mx-auto h-24 w-24 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        );
      case 'package':
        return (
          <svg
            className="mx-auto h-24 w-24 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      default:
        return (
          <svg
            className="mx-auto h-24 w-24 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
        );
    }
  };

  return (
    <div className="text-center py-24 bg-black" role="status" aria-live="polite">
      <div className="mb-8">
        {renderIcon()}
      </div>
      <h3 className="text-2xl font-medium mb-4 text-white">
        {title}
      </h3>
      <p className="mb-8 max-w-md mx-auto text-gray-400">
        {description}
      </p>
      {onClearSearch && (
        <button
          onClick={onClearSearch}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          Clear Search
        </button>
      )}
    </div>
  );
};

EmptyState.propTypes = {
  onClearSearch: PropTypes.func,
  title: PropTypes.string,
  description: PropTypes.string,
  iconType: PropTypes.oneOf(['search', 'package', 'box'])
};

EmptyState.displayName = 'EmptyState';

export default EmptyState;

