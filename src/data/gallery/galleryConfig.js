// Gallery Configuration
// Centralized configuration for gallery feature

export const GALLERY_CATEGORIES = {
  national: {
    id: 'national',
    label: 'National',
    description: 'Discover the beauty of Nepal'
  },
  international: {
    id: 'international',
    label: 'International',
    description: 'Explore destinations worldwide'
  }
};

export const GALLERY_TABS = [
  { id: 'national', label: 'National' },
  { id: 'international', label: 'International' }
];

export const GALLERY_TRANSITION_DURATION = 500;
export const GALLERY_SLIDE_INTERVAL = 5000;

export const IMAGE_VIEWER_CONFIG = {
  maxZoom: 3,
  minZoom: 0.5,
  zoomStep: 0.25,
  transitionDuration: 300,
  enableKeyboard: true,
  enableTouchSwipe: true,
  enablePinchZoom: true,
  pinchZoomThreshold: 10,
  thumbnailConfig: {
    width: 64,
    height: 48,
    gap: 8,
    showCount: 8
  }
};

export const GALLERY_HERO_IMAGES = {
  national: {
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2000&auto=format&fit=crop',
    alt: 'Nepal mountains landscape'
  },
  international: {
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2000&auto=format&fit=crop',
    alt: 'World travel destinations'
  }
};

export default GALLERY_CATEGORIES;

