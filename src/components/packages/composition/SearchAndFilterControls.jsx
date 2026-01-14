import { memo } from 'react';
import PropTypes from 'prop-types';

const SearchAndFilterControls = memo(function SearchAndFilterControls({
  searchQuery,
  totalPackages,
  filteredCount,
  onSearchChange,
  onClearSearch
}) {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 mb-12">
      {/* Search Bar */}
      <div className="flex flex-col md:flex-row gap-6 items-center">
        <div className="relative flex-1">
          <svg
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search packages by name, description, or destination..."
            value={searchQuery}
            onChange={onSearchChange}
            aria-label="Search travel packages"
            className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
          />
        </div>
        {onClearSearch && searchQuery && (
          <button
            onClick={onClearSearch}
            className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors"
            aria-label="Clear search"
          >
            Clear
          </button>
        )}
      </div>

      {/* Results Count */}
      <div className="mt-6 text-center">
        <span className="text-gray-300">
          Showing <span className="text-indigo-400 font-semibold">{filteredCount}</span> of <span className="text-purple-400 font-semibold">{totalPackages}</span> packages
          {searchQuery && (
            <span className="ml-3 text-gray-300">
              for "<span className="text-white font-medium">{searchQuery}</span>"
            </span>
          )}
        </span>
      </div>
    </div>
  );
});

SearchAndFilterControls.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  totalPackages: PropTypes.number.isRequired,
  filteredCount: PropTypes.number.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  onClearSearch: PropTypes.func,
};

SearchAndFilterControls.displayName = 'SearchAndFilterControls';

export default SearchAndFilterControls;

