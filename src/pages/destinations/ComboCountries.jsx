import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import DestinationCard from '../../components/destinations/DestinationCard';
import { comboCountriesData } from '../../data/destinations';

/**
 * ComboCountries page component
 * Displays multi-country journey packages organized by region (Europe, Asia)
 * Uses unified DestinationCard for consistent styling
 */
const ComboCountries = memo(() => {
  const { europe, asia } = comboCountriesData;

  const renderRegionSection = (title, destinations, regionId) => (
    <div className="mb-12" key={regionId}>
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-[#0f4c5c]">
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {destinations.map((item) => (
          <DestinationCard
            key={item.id}
            destination={item}
            category="combo"
            variant="combo"
            showDuration
            showPrice={false}
          />
        ))}
      </div>
    </div>
  );

  return (
    <section className="w-full">
      {renderRegionSection('Europe Combos', europe, 'europe')}
      {renderRegionSection('Asia Combos', asia, 'asia')}
    </section>
  );
});

ComboCountries.displayName = 'ComboCountries';

export default ComboCountries;

