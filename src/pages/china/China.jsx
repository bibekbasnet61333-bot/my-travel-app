import { memo } from 'react';
import DestinationTemplate from '../DestinationTemplate';
import { chinaDestinationData } from '../../data/destinations/china';

/**
 * China destination page
 * Refactored to use unified DestinationTemplate
 */
const China = memo(() => {
  return (
    <DestinationTemplate
      destinationId="china"
      destinationName="China"
      theme={chinaDestinationData.theme}
      heroData={{
        title: "Discover China",
        subtitle: chinaDestinationData.theme.heroSubtitle,
        backgroundImage: chinaDestinationData.theme.heroImage,
        stats: chinaDestinationData.heroStats,
        tourTitle: "7 Nights / 8 Days",
        tourSubtitle: "Kunming - Shanghai - Beijing",
        tourSubtitleColor: "#ef4444",
        short: true,
      }}
      aboutData={{
        title: "About China",
        subtitle: "Discover the world's oldest continuous civilization, from ancient dynasties to modern marvels. China offers a perfect blend of historical treasures and contemporary wonders.",
        highlights: chinaDestinationData.highlights,
        stats: chinaDestinationData.stats,
      }}
      tabsData={{
        itinerary: chinaDestinationData.itinerary,
        inclusions: chinaDestinationData.inclusions,
        exclusions: chinaDestinationData.exclusions,
        pageClass: "from-orange-50/50 via-red-50/30 to-amber-50/50",
      }}
      faqs={chinaDestinationData.faqs}
      policies={chinaDestinationData.policies}
      galleryPath="/gallery/china"
    />
  );
});

China.displayName = 'China';

export default China;

