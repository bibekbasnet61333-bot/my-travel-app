import { useState, useMemo, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { destinations } from '../data/destinations';
import DestinationsHero from '../components/destinations/DestinationsHero';
import DestinationGrid from '../components/destinations/DestinationGrid';
import { SkeletonGrid } from '../components/ui/Skeleton';
import ComboCountries from './destinations/ComboCountries';

export default function Destinations() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [category, setCategory] = useState(searchParams.get('category') || 'local');
  const [isLoading, setIsLoading] = useState(false);

  // Update category when URL changes
  useEffect(() => {
    const urlCategory = searchParams.get('category');
    if (urlCategory && urlCategory !== category) {
      setCategory(urlCategory);
    }
  }, [searchParams]);

  const filteredDestinations = useMemo(() => {
    return destinations.filter(d => d.category === category);
  }, [category]);

  const handleCategoryChange = useCallback((newCategory) => {
    setIsLoading(true);
    setSearchParams({ category: newCategory });
    setTimeout(() => {
      setCategory(newCategory);
      setIsLoading(false);
    }, 300);
  }, [setSearchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f7fafc] via-[#f3f6fa] to-[#f7fafc]">
      <DestinationsHero
        category={category}
        onCategoryChange={handleCategoryChange}
      />
      <section className="container mx-auto px-4 sm:px-6 py-8 sm:py-14">
        {category === 'combo' ? (
          <div className="w-full max-w-6xl mx-auto">
            <ComboCountries />
          </div>
        ) : isLoading ? (
          <SkeletonGrid count={6} />
        ) : (
          <DestinationGrid
            destinations={filteredDestinations}
            category={category}
          />
        )}
      </section>
    </div>
  );
}

