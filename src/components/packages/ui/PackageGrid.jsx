import { memo } from 'react';
import PropTypes from 'prop-types';
import { PackageCard, EmptyState } from '../index';

function PackageGrid({ packages = [], searchQuery = '' }) {
  if (!packages || packages.length === 0) {
    return (
      <EmptyState
        title="No packages found"
        description="Check back soon for new travel experiences!"
        iconType="search"
      />
    );
  }

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-8 bg-black"
      role="grid"
      aria-label="Package grid"
    >
      {packages.map((pkg) => (
        <PackageCard
          key={pkg.id}
          packageData={pkg}
          searchQuery={searchQuery}
        />
      ))}
    </div>
  );
}

PackageGrid.propTypes = {
  packages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      shortDescription: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      duration: PropTypes.string.isRequired,
      groupSize: PropTypes.string.isRequired,
      difficulty: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
    })
  ),
  searchQuery: PropTypes.string,
};

PackageGrid.displayName = 'PackageGrid';

export default memo(PackageGrid);
