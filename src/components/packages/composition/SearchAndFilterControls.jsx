import { memo } from 'react';
import PropTypes from 'prop-types';
import { colors } from '../../../constants/colors';

const SearchAndFilterControls = memo(function SearchAndFilterControls({
  searchQuery,
  totalPackages,
  filteredCount,
  onSearchChange,
  onClearSearch
}) {
  return (
    <div
      className="rounded-2xl p-5 sm:p-6 mb-8 sm:mb-10 border"
      style={{
        backgroundColor: colors.surface.light,
        borderColor: colors.neutral[200],
      }}
    >
      {/* Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <svg
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none"
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
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base shadow-sm"
          />
        </div>
        {onClearSearch && searchQuery && (
          <button
            onClick={onClearSearch}
            className="px-4 py-2.5 text-sm font-medium rounded-lg bg-slate-100 text-slate-600 hover:bg-primary-50 hover:text-primary-700 border border-slate-200 transition-colors whitespace-nowrap"
            aria-label="Clear search"
          >
            Clear
          </button>
        )}
      </div>

      {/* Results Count */}
      <div className="mt-4 text-center">
        <span className="text-slate-600 text-sm sm:text-base font-medium">
          Showing <span className="text-primary-600 font-bold">{filteredCount}</span> of <span className="text-slate-700 font-bold">{totalPackages}</span> packages
          {searchQuery && (
            <span className="ml-2 text-slate-600">
              for <span className="text-primary-700 font-semibold">"{searchQuery}"</span>
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

