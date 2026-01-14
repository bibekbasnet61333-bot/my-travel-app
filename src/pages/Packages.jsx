import { useState, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

import Hero from '../components/packages/ui/Hero';
import CategoryFilterSection from '../components/packages/features/CategoryFilterSection';
import WhyChooseUsPackages from '../components/packages/features/WhyChooseUsPackages';
import AllPackagesSection from '../components/packages/features/AllPackagesSection';
import { PackageGridSkeleton } from '../components/packages';
import { usePackagesWithSorting } from '../components/packages/hooks';

function PackagesContent() {
  const [category, setCategory] = useState('all');

  const handleCategoryChange = useCallback((newCategory) => {
    setCategory(newCategory);
  }, []);

  return (
    <div className="packages-page">
      <Helmet>
        <title>Travel Packages | Sasa Travel</title>
        <meta
          name="description"
          content="Explore our curated travel packages including cultural tours, luxury experiences, wellness retreats, and adventure tours to destinations worldwide."
        />
        <meta property="og:title" content="Travel Packages | Sasa Travel" />
        <meta
          property="og:description"
          content="Discover our curated travel experiences. From cultural immersions to luxury adventures."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://sasatravel.com/packages" />
        <link rel="alternate" href="android-app://com.sasatravel/https/sasatravel.com/packages" />
      </Helmet>

      <Hero category={category} />

      <CategoryFilterSection
        selectedCategory={category}
        onCategoryChange={handleCategoryChange}
      />

     
      <WhyChooseUsPackages />
       <AllPackagesSection />
    </div>
  );
}

function PackagesSkeleton() {
  return (
    <div className="packages-page">
      <Helmet>
        <title>Loading Packages... | Sasa Travel</title>
      </Helmet>

      <Hero category="all" />

      <div className="py-12 px-8 bg-black">
        <PackageGridSkeleton count={6} />
      </div>
    </div>
  );
}

function Packages() {
  const { loading } = usePackagesWithSorting();

  if (loading) {
    return <PackagesSkeleton />;
  }

  return <PackagesContent />;
}

Packages.displayName = 'Packages';

Packages.propTypes = {
  // No props expected from router
};

export default memo(Packages);
export { PackagesContent, PackagesSkeleton };
