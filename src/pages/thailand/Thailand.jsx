import { memo } from 'react';
import DestinationTemplate from '../DestinationTemplate';
import { thailandDestinationData } from '../../data/destinations/thailand';

/**
 * Thailand destination page
 * Refactored to use unified DestinationTemplate
 */
const Thailand = memo(() => {
  return (
    <DestinationTemplate
      destinationId="thailand"
      destinationName="Thailand"
      theme={thailandDestinationData.theme}
      heroData={{
        title: "Discover Thailand",
        subtitle: thailandDestinationData.theme.heroSubtitle,
        backgroundImage: thailandDestinationData.theme.heroImage,
        stats: thailandDestinationData.heroStats,
        tourTitle: "7 Nights / 8 Days",
        tourSubtitle: "Bangkok - Phuket - Chiang Mai",
        tourSubtitleColor: "#0ea5e9",
        short: true,
      }}
      aboutData={{
        title: "About Thailand",
        subtitle: "Experience the Land of Smiles - from Bangkok's grand palaces to Phi Phi Islands' pristine beaches.",
        highlights: thailandDestinationData.highlights,
        stats: thailandDestinationData.stats,
      }}
      tabsData={{
        itinerary: thailandDestinationData.itinerary,
        inclusions: thailandDestinationData.inclusions,
        exclusions: thailandDestinationData.exclusions,
        pageClass: "from-blue-50/30 via-cyan-50/20 to-teal-50/30",
      }}
      faqs={thailandDestinationData.faqs}
      policies={thailandDestinationData.policies}
      galleryPath="/gallery/thailand"
    />
  );
});

Thailand.displayName = 'Thailand';

export default Thailand;

