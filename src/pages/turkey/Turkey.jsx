import { memo } from 'react';
import DestinationTemplate from '../DestinationTemplate';
import { turkeyData } from '../../data/destinations/turkey';

/**
 * Turkey destination page
 * Refactored to use unified DestinationTemplate
 */
const Turkey = memo(() => {
  const theme = turkeyData.theme || {};
  
  return (
    <DestinationTemplate
      destinationId="turkey"
      destinationName="Turkey"
      theme={theme}
      heroData={{
        title: "Discover Turkey",
        subtitle: theme.heroSubtitle,
        backgroundImage: theme.heroImage,
        stats: turkeyData.heroStats,
        tourTitle: "4 Nights / 5 Days",
        tourSubtitle: "The Magic of Istanbul",
        tourSubtitleColor: "#8b5cf6",
        short: true,
      }}
      aboutData={{
        title: "About Turkey",
        subtitle: "Experience the magic of Istanbul - where East meets West, and history comes alive.",
        highlights: turkeyData.highlights,
        stats: undefined,
      }}
      tabsData={{
        itinerary: turkeyData.itinerary,
        inclusions: turkeyData.inclusions,
        exclusions: turkeyData.exclusions,
        pageClass: "from-violet-50/30 via-purple-50/20 to-fuchsia-50/30",
      }}
      faqs={turkeyData.faqs}
      policies={{ importantNotes: turkeyData.policies?.[0]?.items || [] }}
      galleryPath="/gallery/turkey"
    />
  );
});

Turkey.displayName = 'Turkey';

export default Turkey;

