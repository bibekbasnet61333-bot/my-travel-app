// Unified Destination Configurations
// Centralized data structure for all destinations
// Used by DestinationTemplate component

// Re-export all individual destination data
export { baliTheme, baliHeroStats, baliHighlightsData, baliStats, baliItineraryData, baliInclusionsData, baliExclusionsData, baliFAQs, baliPolicies, baliDestinationData } from './bali';
export { japanTheme, japanHeroStats, japanHighlightsData, japanStats, japanItineraryData, japanInclusionsData, japanExclusionsData, japanFAQs, japanPolicies, japanDestinationData } from './japan';
export { thailandTheme, thailandHeroStats, thailandHighlightsData, thailandStats, thailandItineraryData, thailandInclusionsData, thailandExclusionsData, thailandFAQs, thailandPolicies, thailandDestinationData } from './thailand';
export { vietnamTheme, vietnamHeroStats, vietnamHighlightsData, vietnamStats, vietnamItineraryData, vietnamInclusionsData, vietnamExclusionsData, vietnamFAQs, vietnamPolicies, vietnamDestinationData } from './vietnam';
export { dubaiTheme, dubaiHeroStats, dubaiHighlightsData, dubaiStats, dubaiItineraryData, dubaiInclusionsData, dubaiExclusionsData, dubaiFAQs, dubaiPolicies, dubaiDestinationData } from './dubai';
export { australiaTheme, australiaHeroStats, australiaHighlightsData, australiaStats, australiaItineraryData, australiaInclusionsData, australiaExclusionsData, australiaFAQs, australiaPolicies, australiaDestinationData } from './australia';
export { turkeyTheme, turkeyHeroStats, turkeyItineraryData, turkeyHighlightsData, turkeyInclusionsData, turkeyExclusionsData, turkeyFAQs, turkeyPolicies, turkeyData } from './turkey';
export { chinaTheme, chinaHeroStats, chinaHighlightsData, chinaStats, chinaItineraryData, chinaInclusionsData, chinaExclusionsData, chinaFAQs, chinaPolicies, chinaDestinationData } from './china';

// Helper function to build template config from destination data
export const buildDestinationConfig = (destinationData) => {
  const theme = destinationData.theme || {};
  const destinationId = destinationData.id || 'destination';
  const destinationName = destinationData.name || 'Destination';

  return {
    destinationId,
    destinationName,
    theme,
    heroData: {
      title: `Discover ${destinationName}`,
      subtitle: theme.heroSubtitle,
      backgroundImage: theme.heroImage,
      stats: destinationData.heroStats || destinationData.stats,
      tourTitle: destinationData.itinerary?.length 
        ? `${destinationData.itinerary.length - 1} Nights / ${destinationData.itinerary.length} Days`
        : undefined,
      tourSubtitle: undefined,
      short: true,
    },
    aboutData: {
      title: `About ${destinationName}`,
      subtitle: theme.heroSubtitle,
      highlights: destinationData.highlights,
      stats: destinationData.stats,
    },
    tabsData: {
      itinerary: destinationData.itinerary,
      inclusions: destinationData.inclusions,
      exclusions: destinationData.exclusions,
      pageClass: theme.pageClass,
    },
    modalData: {
      faqs: destinationData.faqs,
      policies: destinationData.policies,
      galleryImages: destinationData.galleryImages || [],
    },
    galleryPath: `/gallery/${destinationId}`,
  };
};

// Quick access to all destination configs
export const DESTINATION_CONFIGS = {
  bali: {
    id: 'bali',
    name: 'Bali',
    data: baliDestinationData,
    config: buildDestinationConfig(baliDestinationData),
  },
  japan: {
    id: 'japan',
    name: 'Japan',
    data: japanDestinationData,
    config: buildDestinationConfig(japanDestinationData),
  },
  thailand: {
    id: 'thailand',
    name: 'Thailand',
    data: thailandDestinationData,
    config: buildDestinationConfig(thailandDestinationData),
  },
  vietnam: {
    id: 'vietnam',
    name: 'Vietnam',
    data: vietnamDestinationData,
    config: buildDestinationConfig(vietnamDestinationData),
  },
  dubai: {
    id: 'dubai',
    name: 'Dubai',
    data: dubaiDestinationData,
    config: buildDestinationConfig(dubaiDestinationData),
  },
  australia: {
    id: 'australia',
    name: 'Australia',
    data: australiaDestinationData,
    config: buildDestinationConfig(australiaDestinationData),
  },
  turkey: {
    id: 'turkey',
    name: 'Turkey',
    data: turkeyData,
    config: buildDestinationConfig(turkeyData),
  },
  china: {
    id: 'china',
    name: 'China',
    data: chinaDestinationData,
    config: buildDestinationConfig(chinaDestinationData),
  },
};

// Get destination config by ID
export const getDestinationConfig = (id) => {
  const config = DESTINATION_CONFIGS[id];
  if (!config) {
    console.warn(`Destination "${id}" not found in configurations`);
    return null;
  }
  return config.config;
};

// Get all destination IDs
export const getDestinationIds = () => Object.keys(DESTINATION_CONFIGS);

// Get destination data by ID
export const getDestinationData = (id) => {
  const config = DESTINATION_CONFIGS[id];
  return config?.data || null;
};

