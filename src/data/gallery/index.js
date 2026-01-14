// Combined Gallery Data
// Central access point for all gallery data

import { nationalGalleryData, nationalDestinations, nationalTheme } from './national';
import { internationalGalleryData, internationalDestinations, internationalTheme } from './international';
import { GALLERY_CATEGORIES, GALLERY_TABS, GALLERY_HERO_IMAGES } from './galleryConfig';

// Get all destinations across both categories
export const allDestinations = [
  ...nationalDestinations,
  ...internationalDestinations
];

// Get destinations by category
export const getDestinationsByCategory = (category) => {
  if (category === 'national') {
    return nationalDestinations;
  }
  if (category === 'international') {
    return internationalDestinations;
  }
  return allDestinations;
};

// Get destination by slug
export const getDestinationBySlug = (slug) => {
  return allDestinations.find(dest => dest.slug === slug);
};

// Get theme by category
export const getThemeByCategory = (category) => {
  if (category === 'national') {
    return nationalTheme;
  }
  return internationalTheme;
};

// Export all
export {
  nationalGalleryData,
  nationalDestinations,
  nationalTheme,
  internationalGalleryData,
  internationalDestinations,
  internationalTheme,
  GALLERY_CATEGORIES,
  GALLERY_TABS,
  GALLERY_HERO_IMAGES
};

export default {
  nationalGalleryData,
  internationalGalleryData,
  allDestinations,
  getDestinationsByCategory,
  getDestinationBySlug,
  getThemeByCategory
};

