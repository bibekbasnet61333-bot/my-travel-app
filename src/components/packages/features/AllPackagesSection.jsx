import { memo, useCallback } from 'react';
import { SearchAndFilterControls, PackageGrid, EmptyState, PackageGridSkeleton } from '../index';
import ErrorBoundary from '../../ui/ErrorBoundary';
import { useIntersectionObserver } from '../../../hooks/useIntersectionObserver';
import { usePackagesWithSorting, SORT_OPTIONS } from '../hooks';
import { useSearch } from '../../../utils/searchUtils';
import { SEARCH_FIELDS } from '../../../constants';

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
      <section ref={sectionRef} className="py-16 bg-gradient-to-br from-slate-900 via-gray-900 to-gray-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-indigo-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className={`text-center mb-2 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-xl md:text-3xl font-bold text-white mb-1 tracking-tight">All Travel Packages</h2>
            <p className="text-sm text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Explore our complete collection of curated travel experiences, from cultural immersions to luxury adventures
            </p>
          </div>

          <div className={`transition-all duration-1000 delay-300 mb-8 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <SearchAndFilterControls
              searchQuery={query}
              totalPackages={totalCount}
              filteredCount={filteredCount}
              onSearchChange={handleSearchChange}
              onClearSearch={handleClearSearch}
            />
          </div>
        </div>

        <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {loading ? (
            <div className="w-full bg-black py-12">
              <PackageGridSkeleton count={6} />
            </div>
          ) : error ? (
            <div className="bg-black py-12">
              <EmptyState
                title="Unable to Load Packages"
                description="We encountered an error while loading packages. Please try refreshing the page."
                iconType="box"
              />
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="bg-black py-12">
              <EmptyState
                onClearSearch={handleClearSearch}
                title="No packages found"
                description={query ? `No packages match "${query}". Try a different search term or clear your search.` : "Check back soon for new travel experiences!"}
                iconType="search"
              />
            </div>
          ) : (
            <div className="w-full bg-black py-12">
              <PackageGrid packages={filteredItems} searchQuery={query} />
            </div>
          )}
        </div>
      </section>
    </ErrorBoundary>
  );
}

export default memo(AllPackagesSection);

