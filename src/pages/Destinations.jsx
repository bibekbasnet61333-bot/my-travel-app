import { useState, useMemo, useCallback } from 'react';
import { destinations } from '../data/destinations';
import DestinationsHero from '../components/destinations/DestinationsHero';
import DestinationGrid from '../components/destinations/DestinationGrid';
import { SkeletonGrid } from '../components/ui/Skeleton';

export default function Destinations() {
  const [category, setCategory] = useState('local');
  const [isLoading, setIsLoading] = useState(false);

  const filteredDestinations = useMemo(() => {
    return destinations.filter(d => d.category === category);
  }, [category]);

  const handleCategoryChange = useCallback((newCategory) => {
    setIsLoading(true);
    setTimeout(() => {
      setCategory(newCategory);
      setIsLoading(false);
    }, 300);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <DestinationsHero
        category={category}
        onCategoryChange={handleCategoryChange}
      />

      <section className="container mx-auto px-6 py-16">
        {isLoading ? (
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
