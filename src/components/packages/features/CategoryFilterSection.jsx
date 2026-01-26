import { useState, useMemo, memo } from 'react';
import PropTypes from 'prop-types';
import { packageCategories, packages } from '../../../data/packages';
import { PackageGrid } from '../index';
import { colors } from '../../../constants/colors';

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
    <section className="py-8 px-4 sm:px-6" aria-label="Category filters">
      <div className="max-w-7xl mx-auto">
        {/* Category Filter Buttons */}
        <div
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8"
          role="tablist"
          aria-label="Package categories"
        >
          {packageCategories.map((category) => {
            const isActive = selectedCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                onMouseEnter={() => setHoveredCategory(category.id)}
                onMouseLeave={() => setHoveredCategory(null)}
                role="tab"
                aria-selected={isActive}
                aria-label={`${category.name} (${category.count} packages)`}
                className={`relative flex-shrink-0 px-4 sm:px-5 py-2.5 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 border ${
                  isActive
                    ? 'text-white shadow-sm'
                    : 'text-slate-600 border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300'
                }`}
                style={
                  isActive
                    ? {
                        background: `linear-gradient(135deg, ${colors.primary[600]}, ${colors.primary[700]})`,
                        borderColor: colors.primary[700],
                      }
                    : {}
                }
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  {category.name}
                  <span className="text-[10px] sm:text-xs opacity-80">
                    ({category.count})
                  </span>
                </span>
              </button>
            );
          })}
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

