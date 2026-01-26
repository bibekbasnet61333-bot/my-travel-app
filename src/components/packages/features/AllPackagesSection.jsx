import { memo, useCallback } from 'react';
import { SearchAndFilterControls, PackageGrid, EmptyState, PackageGridSkeleton } from '../index';
import ErrorBoundary from '../../ui/ErrorBoundary';
import { useIntersectionObserver } from '../../../hooks/useIntersectionObserver';
import { usePackagesWithSorting } from '../hooks';
import { useSearch } from '../../../utils/searchUtils';
import { SEARCH_FIELDS } from '../../../constants';
import { colors } from '../../../constants/colors';

function AllPackagesSection() {
  const { ref: sectionRef, isIntersecting: isVisible } = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });
  const { packages, loading, error, categoryCounts } = usePackagesWithSorting();
  const { query, setQuery, filteredItems, totalCount, filteredCount, clearSearch } = useSearch(packages, SEARCH_FIELDS.PACKAGE);

  const handleSearchChange = useCallback((e) => {
    setQuery(e.target.value);
  }, [setQuery]);

  const handleClearSearch = useCallback(() => {
    clearSearch();
  }, [clearSearch]);

  return (
    <ErrorBoundary fallbackMessage="Failed to load packages section. Please try refreshing the page.">
      <section ref={sectionRef} className="py-12 md:py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className={`mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-3">
                All Travel Packages
              </h2>
              <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
                Explore our complete collection of curated travel experiences, from cultural immersions to luxury adventures.
              </p>
            </div>

            {/* Search Controls */}
            <SearchAndFilterControls
              searchQuery={query}
              totalPackages={totalCount}
              filteredCount={filteredCount}
              onSearchChange={handleSearchChange}
              onClearSearch={handleClearSearch}
            />
          </div>

          {/* Package Grid */}
          <div className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {loading ? (
              <div className="py-8">
                <PackageGridSkeleton count={6} />
              </div>
            ) : error ? (
              <div className="py-8">
                <EmptyState
                  title="Unable to Load Packages"
                  description="We encountered an error while loading packages. Please try refreshing the page."
                  iconType="box"
                  theme="light"
                />
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="py-8">
                <EmptyState
                  onClearSearch={handleClearSearch}
                  title="No packages found"
                  description={query ? `No packages match "${query}". Try a different search term or clear your search.` : "Check back soon for new travel experiences!"}
                  iconType="search"
                  theme="light"
                />
              </div>
            ) : (
              <div className="py-8">
                <PackageGrid packages={filteredItems} searchQuery={query} />
              </div>
            )}
          </div>
        </div>
      </section>
    </ErrorBoundary>
  );
}

export default memo(AllPackagesSection);

