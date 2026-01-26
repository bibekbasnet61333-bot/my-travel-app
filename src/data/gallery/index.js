// Combined Gallery Data
// Central access point for all gallery data

import { nationalDestinations } from './national';
import { internationalDestinations } from './international';
import { GALLERY_CATEGORIES, GALLERY_TABS, GALLERY_HERO_IMAGES } from './galleryConfig';

// Theme configurations by category
export const GALLERY_THEMES = {
  national: {
    primaryGradientClass: 'from-amber-500 to-orange-500',
    secondaryGradientClass: 'from-orange-500 to-amber-600',
    overlayGradient: 'from-amber-900/80 via-orange-900/70 to-red-900/75',
    titleGradient: 'linear-gradient(to right, #f59e0b, #ea580c)',
    accentColor: '#d97706',
    tabActiveClass: 'bg-amber-500 text-white',
    tabInactiveClass: 'text-stone-600 hover:bg-amber-50'
  },
  international: {
    primaryGradientClass: 'from-blue-500 to-cyan-500',
    secondaryGradientClass: 'from-cyan-500 to-blue-600',
    overlayGradient: 'from-blue-900/80 via-cyan-900/70 to-indigo-900/75',
    titleGradient: 'linear-gradient(to right, #3b82f6, #06b6d4)',
    accentColor: '#0ea5e9',
    tabActiveClass: 'bg-blue-500 text-white',
    tabInactiveClass: 'text-stone-600 hover:bg-blue-50'
  }
};

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
  return GALLERY_THEMES[category] || GALLERY_THEMES.international;
};

// Export all
export {
  nationalDestinations,
  internationalDestinations,
  GALLERY_CATEGORIES,
  GALLERY_TABS,
  GALLERY_HERO_IMAGES
};

export default {
  allDestinations,
  getDestinationsByCategory,
  getDestinationBySlug,
  getThemeByCategory
};

