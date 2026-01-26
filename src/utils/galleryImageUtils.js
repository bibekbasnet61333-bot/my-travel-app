// Gallery Image Utilities
// Shared utilities for handling gallery images consistently

// Fallback image for failed loads
export const GALLERY_FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop';

// Responsive image sizes for gallery thumbnails
export const GALLERY_IMAGE_SIZES = [400, 800, 1200];

// Get image source from various image formats
// Supports: string URLs, responsive image objects with src/srcset, import references
export const getImageSrc = (image) => {
  if (typeof image === 'string') {
    return image;
  }
  if (image && typeof image === 'object') {
    return image.src || image.default || GALLERY_FALLBACK_IMAGE;
  }
  return GALLERY_FALLBACK_IMAGE;
};

// Get srcset from image object
export const getImageSrcset = (image) => {
  if (typeof image === 'string') {
    return undefined;
  }
  if (image && typeof image === 'object') {
    return image.srcSet || image.srcset;
  }
  return undefined;
};

// Create responsive image object for Unsplash URLs
// Returns optimized src and srcset for different viewport sizes
// This is the SINGLE source of truth for responsive image creation
export const createResponsiveImage = (url, sizes = GALLERY_IMAGE_SIZES) => {
  if (!url || typeof url !== 'string') {
    return { src: GALLERY_FALLBACK_IMAGE, srcSet: undefined };
  }

  // Remove existing query params to get base URL
  const baseUrl = url.split('?')[0];

  // Build srcset string
  const srcSetParts = sizes.map(size => {
    return `${baseUrl}?w=${size}&auto=format&fit=crop ${size}w`;
  });

  return {
    src: `${baseUrl}?w=800&auto=format&fit=crop`,
    srcSet: srcSetParts.join(', ')
  };
};

// Generate sizes attribute for responsive images
export const getResponsiveSizes = (breakpoints = {
  mobile: '50vw',
  tablet: '33vw',
  desktop: '25vw',
  large: '20vw'
}) => {
  return `(max-width: 640px) ${breakpoints.mobile}, ` +
         `(max-width: 768px) ${breakpoints.tablet}, ` +
         `(max-width: 1024px) ${breakpoints.desktop}, ` +
         `${breakpoints.large}`;
};

// Preload critical images for LCP optimization
export const preloadImage = (src) => {
  if (typeof window === 'undefined' || !src) return;

  const img = new Image();
  img.src = src;
};

// Check if image is a remote URL (needs error handling)
export const isRemoteImage = (src) => {
  if (!src || typeof src !== 'string') return false;
  return src.startsWith('http://') || src.startsWith('https://');
};

// Validate image URL format
export const isValidImageUrl = (url) => {
  if (!url || typeof url !== 'string') return false;

  // Basic URL validation
  try {
    const urlObj = new URL(url);
    const validProtocols = ['http:', 'https:'];
    const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif', '.svg'];

    if (!validProtocols.includes(urlObj.protocol)) return false;

    const pathname = urlObj.pathname.toLowerCase();
    return validExtensions.some(ext => pathname.endsWith(ext));
  } catch {
    return false;
  }
};

export default {
  GALLERY_FALLBACK_IMAGE,
  GALLERY_IMAGE_SIZES,
  getImageSrc,
  getImageSrcset,
  createResponsiveImage,
  getResponsiveSizes,
  preloadImage,
  isRemoteImage,
  isValidImageUrl
};

