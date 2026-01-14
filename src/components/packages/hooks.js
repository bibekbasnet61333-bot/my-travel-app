import { useMemo } from 'react';
import { packageService } from './services/packageService';

/**
 * Shared helper function to calculate category counts
 * DRY principle - used by multiple hooks
 * @param {Array} packages - Array of package objects
 * @returns {Object} Category counts with 'all' key
 */
export const calculateCategoryCounts = (packages) => {
  const counts = { all: packages.length };
  packages.forEach(pkg => {
    counts[pkg.category] = (counts[pkg.category] || 0) + 1;
  });
  return counts;
};

/**
 * Custom hook for fetching all packages
 * Data is static, no loading or async needed
 */
export const usePackages = () => {
  const packages = useMemo(() => packageService.getAllPackages(), []);
  return { packages, loading: false, error: null };
};

/**
 * Custom hook for filtering packages by category
 */
export const usePackageFilters = (selectedCategory = 'all') => {
  const { packages, loading, error } = usePackages();

  const filteredPackages = useMemo(() => {
    if (loading || error) return [];
    if (selectedCategory === 'all') return packages;
    return packages.filter(pkg => pkg.category === selectedCategory);
  }, [packages, loading, error, selectedCategory]);

  // Use shared helper for category counts
  const categoryCounts = useMemo(() => {
    return calculateCategoryCounts(packages);
  }, [packages]);

  return {
    filteredPackages,
    totalCount: packages.length,
    filteredCount: filteredPackages.length,
    categoryCounts,
    loading,
    error
  };
};

/**
 * Sort options for packages
 */
export const SORT_OPTIONS = {
  DURATION_SHORT: 'duration-short',
  DURATION_LONG: 'duration-long',
  NAME_A_Z: 'name-a-z',
  NAME_Z_A: 'name-z-a'
};

/**
 * Extract numeric duration value for sorting
 * @param {string} duration - Duration string like "8 Days / 7 Nights"
 * @returns {number} Number of days
 */
const extractDurationValue = (duration) => {
  if (!duration) return 0;
  const match = duration.match(/(\d+)\s*Days?/i);
  return match ? parseInt(match[1], 10) : 0;
};

/**
 * Centralized sorting function for packages
 * @param {Array} packages - Array of package objects
 * @param {string} sortBy - Sort option key
 * @returns {Array} Sorted packages
 */
const sortPackages = (packages, sortBy) => {
  if (!sortBy || !packages) return packages;

  const sorted = [...packages];

  switch (sortBy) {
    case SORT_OPTIONS.DURATION_SHORT:
      return sorted.sort((a, b) => extractDurationValue(a.duration) - extractDurationValue(b.duration));
    case SORT_OPTIONS.DURATION_LONG:
      return sorted.sort((a, b) => extractDurationValue(b.duration) - extractDurationValue(a.duration));
    case SORT_OPTIONS.NAME_A_Z:
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case SORT_OPTIONS.NAME_Z_A:
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    default:
      return packages;
  }
};

/**
 * Extended hook with sorting functionality
 * Combines filtering and sorting in one hook
 */
export const usePackagesWithSorting = (selectedCategory = 'all', sortBy = null) => {
  const { packages, loading, error } = usePackages();

  const filteredPackages = useMemo(() => {
    if (loading || error) return [];
    if (selectedCategory === 'all') return packages;
    return packages.filter(pkg => pkg.category === selectedCategory);
  }, [packages, loading, error, selectedCategory]);

  const sortedPackages = useMemo(() => {
    return sortPackages(filteredPackages, sortBy);
  }, [filteredPackages, sortBy]);

  // Use shared helper for category counts
  const categoryCounts = useMemo(() => {
    return calculateCategoryCounts(packages);
  }, [packages]);

  return {
    packages: sortedPackages,
    totalCount: packages.length,
    filteredCount: sortedPackages.length,
    categoryCounts,
    loading,
    error
  };
};
