import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import AnimatedText from '../../../components/animations/AnimatedText';
import FloatingElement from '../../../components/animations/FloatingElement';
import ParticleBackground from '../../../components/animations/ParticleBackground';
import { packages, packageCategories } from '../../../data/packages';
import useFilter from '../../../hooks/useFilter';

const FeaturedPackagesSection = memo(() => {
  const { activeCategory: activePackageCategory, filteredData: filteredPackages, handleCategoryChange } = useFilter(
    packages,
    'all',
    'category'
  );

  return (
    <section className="relative py-12 sm:py-16 px-4 sm:px-6 bg-gradient-to-b from-gray-900/30 to-black/30">
      <ParticleBackground
        particleCount={7}
        color="rgba(0, 0, 0, 0.8)"
        size={3}
        speed={0.3}
        interactive={true}
      />
      <div className="max-w-6xl mx-auto relative z-10">
        <AnimatedText
          text="Featured Packages"
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4 text-white drop-shadow-lg block"
          type="slideUp"
          delay={200}
        />
        <AnimatedText
          text="Discover our handcrafted travel experiences"
          className="text-base sm:text-lg md:text-xl text-center text-gray-200 mb-8 sm:mb-10 max-w-xl sm:max-w-2xl mx-auto font-medium block px-2 drop-shadow-md"
          type="fadeIn"
          delay={400}
        />

        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 px-2">
          {packageCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-semibold transition-all duration-300 text-xs sm:text-sm ${
                activePackageCategory === category.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-800/60 text-white hover:bg-gray-700 border border-white/10'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {filteredPackages.slice(0, 6).map((pkg, index) => (
            <FloatingElement
              key={pkg.id}
              intensity={0.2}
              speed={0.08}
              direction="both"
              range={12}
              delay={index * 120}
            >
              <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-lg rounded-lg sm:rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 border border-white/5">
                <div className="aspect-video overflow-hidden relative">
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold">
                    {pkg.category}
                  </div>
                </div>
                <div className="p-3 sm:p-4">
                  <h3 className="text-sm sm:text-base md:text-lg font-bold mb-1.5 sm:mb-2 text-white">{pkg.name}</h3>
                  <p className="text-gray-300 text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2">{pkg.shortDescription}</p>
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <span className="text-base sm:text-lg md:text-xl font-bold text-white">
                      {pkg.price}
                    </span>
                    <span className="text-xs sm:text-sm text-gray-400 font-medium">{pkg.duration}</span>
                  </div>
                  <Link
                    to={`/packages/${pkg.id}`}
                    className="block w-full py-1.5 sm:py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-xs sm:text-sm text-center text-white"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </FloatingElement>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-10">
          <Link
            to="/packages"
            className="inline-flex items-center gap-2 px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-full text-xs sm:text-sm md:text-base font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            View All Packages
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
});

FeaturedPackagesSection.displayName = 'FeaturedPackagesSection';

export default FeaturedPackagesSection;

