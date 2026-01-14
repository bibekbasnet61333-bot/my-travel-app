import { useState, useMemo, memo } from 'react';
import PropTypes from 'prop-types';
import { packageCategories, packages } from '../../../data/packages';
import { PackageGrid } from '../index';

const CategoryFilterSection = memo(function CategoryFilterSection({ selectedCategory, onCategoryChange }) {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  // Filter packages based on selected category
  const filteredPackages = useMemo(() => {
    if (selectedCategory === 'all') {
      return packages;
    }
    return packages.filter(pkg => pkg.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section className="py-8 bg-black" aria-label="Category filters">
      <div className="max-w-6xl mx-auto px-4">
        {/* Category Filter Buttons */}
        <div className="flex overflow-x-auto gap-3 pb-2 -mx-2 px-2 mb-8 scrollbar-hide" role="tablist" aria-label="Package categories">
          {packageCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
              role="tab"
              aria-selected={selectedCategory === category.id}
              aria-label={`${category.name} (${category.count} packages)`}
              className={`relative flex-shrink-0 px-5 py-3 rounded-full font-semibold text-sm transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-amber-700 to-orange-800 text-white shadow-xl'
                  : 'bg-gray-800 text-gray-300 border border-gray-600 hover:border-amber-500 hover:shadow-lg hover:text-white'
              }`}
            >
              <span className="relative z-10">
                {category.name}
                <span className="ml-1 text-xs opacity-75">
                  ({category.count})
                </span>
              </span>

              {/* Hover effect background */}
              {hoveredCategory === category.id && selectedCategory !== category.id && (
                <div className="absolute inset-0 bg-gradient-to-r from-amber-900/50 to-orange-900/50 rounded-full opacity-50" />
              )}
            </button>
          ))}
        </div>

        {/* Package Cards Grid */}
        <PackageGrid packages={filteredPackages} />
      </div>
    </section>
  );
});

CategoryFilterSection.displayName = 'CategoryFilterSection';

CategoryFilterSection.propTypes = {
  selectedCategory: PropTypes.oneOf(['all', 'cultural', 'luxury', 'wellness', 'adventure']).isRequired,
  onCategoryChange: PropTypes.func.isRequired,
};

export default CategoryFilterSection;
