import { memo } from 'react';
import DestinationTemplate from '../DestinationTemplate';
import { dubaiDestinationData } from '../../data/destinations/dubai';

/**
 * Dubai destination page
 * Refactored to use unified DestinationTemplate
 */
const Dubai = memo(() => {
  return (
    <DestinationTemplate
      destinationId="dubai"
      destinationName="Dubai"
      theme={dubaiDestinationData.theme}
      heroData={{
        title: "Discover Dubai",
        subtitle: dubaiDestinationData.theme.heroSubtitle,
        backgroundImage: dubaiDestinationData.theme.heroImage,
        stats: dubaiDestinationData.heroStats,
        tourTitle: "5 Nights / 6 Days",
        tourSubtitle: "Burj Khalifa - Desert Safari - Abu Dhabi - Miracle Garden",
        tourSubtitleColor: "#ea580c",
        short: true,
      }}
      aboutData={{
        title: "About Dubai",
        subtitle: "Experience the magic of Dubai with our curated tours, luxury stays, and unforgettable adventures.",
        highlights: dubaiDestinationData.highlights,
        stats: dubaiDestinationData.stats,
      }}
      tabsData={{
        itinerary: dubaiDestinationData.itinerary,
        inclusions: dubaiDestinationData.inclusions,
        exclusions: dubaiDestinationData.exclusions,
        pageClass: "from-amber-50/30 via-stone-50/20 to-slate-50/30",
      }}
      faqs={dubaiDestinationData.faqs}
      policies={dubaiDestinationData.policies}
      galleryPath="/gallery/dubai"
    />
  );
});

Dubai.displayName = 'Dubai';

export default Dubai;

