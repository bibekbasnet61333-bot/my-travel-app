import { memo } from 'react';
import DestinationTemplate from '../DestinationTemplate';
import { japanDestinationData } from '../../data/destinations/japan';

/**
 * Japan destination page
 * Refactored to use unified DestinationTemplate
 */
const Japan = memo(() => {
  return (
    <DestinationTemplate
      destinationId="japan"
      destinationName="Japan"
      theme={japanDestinationData.theme}
      heroData={{
        title: "Discover Japan",
        subtitle: japanDestinationData.theme.heroSubtitle,
        backgroundImage: japanDestinationData.theme.heroImage,
        stats: japanDestinationData.heroStats,
        tourTitle: "7 Nights / 8 Days",
        tourSubtitle: "Tokyo - Hakone - Fuji - Osaka",
        tourSubtitleColor: "#db2777",
        short: true,
      }}
      aboutData={{
        title: "About Japan",
        subtitle: "Experience the Land of the Rising Sun - from Tokyo's neon lights to Kyoto's ancient temples and Mount Fuji's majestic peaks.",
        highlights: japanDestinationData.highlights,
        stats: japanDestinationData.stats,
      }}
      tabsData={{
        itinerary: japanDestinationData.itinerary,
        inclusions: japanDestinationData.inclusions,
        exclusions: japanDestinationData.exclusions,
        pageClass: "from-pink-50/30 via-rose-50/20 to-pink-50/30",
      }}
      faqs={japanDestinationData.faqs}
      policies={japanDestinationData.policies}
      galleryPath="/gallery/japan"
    />
  );
});

Japan.displayName = 'Japan';

export default Japan;

