import { memo } from 'react';
import DestinationTemplate from '../DestinationTemplate';
import { vietnamDestinationData } from '../../data/destinations/vietnam';

/**
 * Vietnam destination page
 * Refactored to use unified DestinationTemplate
 */
const Vietnam = memo(() => {
  return (
    <DestinationTemplate
      destinationId="vietnam"
      destinationName="Vietnam"
      theme={vietnamDestinationData.theme}
      heroData={{
        title: "Discover Vietnam",
        subtitle: vietnamDestinationData.theme.heroSubtitle,
        backgroundImage: vietnamDestinationData.theme.heroImage,
        stats: vietnamDestinationData.heroStats,
        tourTitle: "9 Nights / 10 Days",
        tourSubtitle: "Hanoi - Ha Long Bay - Da Nang - Hoi An - Phu Quoc",
        tourSubtitleColor: "#10b981",
        short: true,
      }}
      aboutData={{
        title: "About Vietnam",
        subtitle: "Experience the enchanting beauty of Vietnam - from Ha Long Bay's limestone karsts to Hoi An's ancient streets.",
        highlights: vietnamDestinationData.highlights,
        stats: vietnamDestinationData.stats,
      }}
      tabsData={{
        itinerary: vietnamDestinationData.itinerary,
        inclusions: vietnamDestinationData.inclusions,
        exclusions: vietnamDestinationData.exclusions,
        pageClass: "from-teal-50/30 via-emerald-50/20 to-green-50/30",
      }}
      faqs={vietnamDestinationData.faqs}
      policies={vietnamDestinationData.policies}
      galleryPath="/gallery/vietnam"
    />
  );
});

Vietnam.displayName = 'Vietnam';

export default Vietnam;

