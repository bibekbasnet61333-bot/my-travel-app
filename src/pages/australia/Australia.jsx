import { memo } from 'react';
import DestinationTemplate from '../DestinationTemplate';
import { australiaDestinationData } from '../../data/destinations/australia';

/**
 * Australia destination page
 * Refactored to use unified DestinationTemplate
 */
const Australia = memo(() => {
  return (
    <DestinationTemplate
      destinationId="australia"
      destinationName="Australia"
      theme={australiaDestinationData.theme}
      heroData={{
        title: "Discover Australia",
        subtitle: australiaDestinationData.theme.heroSubtitle,
        backgroundImage: australiaDestinationData.theme.heroImage,
        stats: australiaDestinationData.heroStats,
        tourTitle: "10 Days / 9 Nights",
        tourSubtitle: "Melbourne, Gold Coast & Sydney",
        tourSubtitleColor: "#ea580c",
        short: true,
      }}
      aboutData={{
        title: "About Australia",
        subtitle: "Experience the magic of Melbourne, Gold Coast & Sydney on an unforgettable Australian adventure.",
        highlights: australiaDestinationData.highlights,
        stats: australiaDestinationData.stats,
      }}
      tabsData={{
        itinerary: australiaDestinationData.itinerary,
        inclusions: australiaDestinationData.inclusions,
        exclusions: australiaDestinationData.exclusions,
        pageClass: "from-amber-50/30 via-orange-50/20 to-red-50/30",
      }}
      faqs={australiaDestinationData.faqs}
      policies={australiaDestinationData.policies}
      galleryPath="/gallery/australia"
    />
  );
});

Australia.displayName = 'Australia';

export default Australia;

