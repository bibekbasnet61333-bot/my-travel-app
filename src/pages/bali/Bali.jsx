import { memo } from 'react';
import DestinationTemplate from '../DestinationTemplate';
import { baliDestinationData } from '../../data/destinations/bali';

/**
 * Bali destination page
 * Refactored to use unified DestinationTemplate
 * Eliminates ~150 lines of duplicate code
 */
const Bali = memo(() => {
  return (
    <DestinationTemplate
      destinationId="bali"
      destinationName="Bali"
      theme={baliDestinationData.theme}
      heroData={{
        title: "Discover Bali",
        subtitle: baliDestinationData.theme.heroSubtitle,
        backgroundImage: baliDestinationData.theme.heroImage,
        stats: baliDestinationData.heroStats,
        tourTitle: "5 Nights / 6 Days",
        tourSubtitle: "Handara Gate - Ubud - Tanah Lot - Uluwatu - Kintamani",
        tourSubtitleColor: "#14b8a6",
        short: true,
      }}
      aboutData={{
        title: "About Bali",
        subtitle: "Experience the enchanting beauty of Bali - from sacred temples and volcanic landscapes to pristine beaches and vibrant cultural experiences.",
        highlights: baliDestinationData.highlights,
        stats: baliDestinationData.stats,
      }}
      tabsData={{
        itinerary: baliDestinationData.itinerary,
        inclusions: baliDestinationData.inclusions,
        exclusions: baliDestinationData.exclusions,
        pageClass: "from-emerald-50/30 via-teal-50/20 to-cyan-50/30",
      }}
      faqs={baliDestinationData.faqs}
      policies={baliDestinationData.policies}
      galleryPath="/gallery/bali"
    />
  );
});

Bali.displayName = 'Bali';

export default Bali;

