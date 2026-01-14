/**
 * Gallery Navigation Utilities
 *
 * Provides utilities for navigating to gallery pages from destination pages.
 * Uses DESTINATION_GALLERY_MAP to determine if a destination has gallery support.
 */

// Gallery slug mapping - maps destination IDs to their corresponding gallery slugs
export const DESTINATION_GALLERY_MAP = {
  // International destinations
  australia: 'australia',
  bali: 'bali',
  china: 'china',
  dubai: 'dubai',
  turkey: 'turkey',
  vietnam: 'vietnam',

  // National destinations
  kathmandu: 'kathmandu',
  pokhara: 'pokhara',
  chitwan: 'chitwan',
  lumbini: 'lumbini',
};

// All destinations that have gallery support
export const DESTINATIONS_WITH_GALLERY = Object.keys(DESTINATION_GALLERY_MAP);

/**
 * Check if a destination has gallery support
 * @param {string} destinationId - The destination ID (e.g., 'dubai', 'bali')
 * @returns {boolean} - True if gallery exists
 */
export const hasGallery = (destinationId) => {
  if (!destinationId) return false;
  return DESTINATION_GALLERY_MAP.hasOwnProperty(destinationId.toLowerCase());
};

/**
 * Get the gallery slug for a destination
 * @param {string} destinationId - The destination ID
 * @returns {string|null} - The gallery slug or null if not found
 */
export const getGallerySlug = (destinationId) => {
  if (!destinationId) return null;
  return DESTINATION_GALLERY_MAP[destinationId.toLowerCase()] || null;
};

/**
 * Get the full gallery path for a destination
 * @param {string} destinationId - The destination ID
 * @returns {string|null} - Full path like '/gallery/dubai' or null if not supported
 */
export const getGalleryPath = (destinationId) => {
  const slug = getGallerySlug(destinationId);
  if (!slug) return null;
  return `/gallery/${slug}`;
};

/**
 * Navigate to gallery page for a destination
 * Uses React Router's navigate function for client-side routing
 *
 * @param {Function} navigate - React Router's navigate function
 * @param {string} destinationId - The destination ID (e.g., 'dubai', 'bali')
 * @param {boolean} fallbackToModal - If true and no gallery exists, open a modal instead (optional)
 * @returns {boolean} - True if navigation occurred, false if skipped
 */
export const navigateToGallery = (navigate, destinationId, fallbackToModal = false) => {
  const galleryPath = getGalleryPath(destinationId);

  if (galleryPath) {
    navigate(galleryPath);
    return true;
  }

  return false;
};

export default {
  DESTINATION_GALLERY_MAP,
  DESTINATIONS_WITH_GALLERY,
  hasGallery,
  getGallerySlug,
  getGalleryPath,
  navigateToGallery,
};

