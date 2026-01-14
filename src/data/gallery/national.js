// National Gallery Data - Nepal Destinations
// Nepal's stunning destinations from Himalayas to ancient temples

// Theme configuration for national destinations (Nepal)
export const nationalTheme = {
  primaryGradientClass: 'from-amber-500 to-orange-500',
  secondaryGradientClass: 'from-orange-500 to-amber-600',
  overlayGradient: 'from-amber-900/80 via-orange-900/70 to-red-900/75',
  titleGradient: 'linear-gradient(to right, #f59e0b, #ea580c)',
  accentColor: '#d97706',
  tabActiveClass: 'bg-amber-500 text-white',
  tabInactiveClass: 'text-stone-600 hover:bg-amber-50'
};

// Helper to create srcset object for Unsplash URLs
// Returns { src: originalUrl, srcSet: "url?w=400 400w, url?w=800 800w" }
const createResponsiveImage = (url) => {
  // Remove existing query params to get base URL
  const baseUrl = url.split('?')[0];
  return {
    src: `${baseUrl}?w=800&auto=format&fit=crop`,
    srcSet: `${baseUrl}?w=400&auto=format&fit=crop 400w, ${baseUrl}?w=800&auto=format&fit=crop 800w`
  };
};

// National destinations gallery data (Nepal)
export const nationalDestinations = [
  {
    id: 'kathmandu',
    name: 'Kathmandu',
    slug: 'kathmandu',
    country: 'Nepal',
    category: 'national',
    description: 'The ancient capital with temples, palaces, and vibrant culture',
    thumbnail: createResponsiveImage('https://images.unsplash.com/photo-1553856622-d1b2c4074696?q=80&w=800&auto=format&fit=crop'),
    heroImage: 'https://images.unsplash.com/photo-1553856622-d1b2c4074696?q=80&w=2000&auto=format&fit=crop',
    imageCount: 6,
    images: [
      'https://images.unsplash.com/photo-1553856622-d1b2c4074696?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1561357645-e53680b2300c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551868668-80a28b3681a3?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1565422954163-0f2f5c3c6a2c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1531563833643-d12c6e957a1c?q=80&w=1200&auto=format&fit=crop'
    ].map(createResponsiveImage)
  },
  {
    id: 'pokhara',
    name: 'Pokhara',
    slug: 'pokhara',
    country: 'Nepal',
    category: 'national',
    description: 'Lake city with stunning mountain views and adventure activities',
    thumbnail: createResponsiveImage('https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=800&auto=format&fit=crop'),
    heroImage: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2000&auto=format&fit=crop',
    imageCount: 6,
    images: [
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1578022761797-b8636ac1773c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1516490701-5c89e8b4cf8e?q=80&w=1200&auto=format&fit=crop'
    ].map(createResponsiveImage)
  },
  {
    id: 'chitwan',
    name: 'Chitwan',
    slug: 'chitwan',
    country: 'Nepal',
    category: 'national',
    description: 'Wildlife sanctuary with rhinos, tigers, and elephant rides',
    thumbnail: createResponsiveImage('https://images.unsplash.com/photo-1568283096533-268720515361?q=80&w=800&auto=format&fit=crop'),
    heroImage: 'https://images.unsplash.com/photo-1568283096533-268720515361?q=80&w=2000&auto=format&fit=crop',
    imageCount: 6,
    images: [
      'https://images.unsplash.com/photo-1568283096533-268720515361?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1546182990-dffeafbe841d?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1535591273668-578e31182c4f?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1484406566174-9da000fda645?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1456926631375-92c8ce872def?q=80&w=1200&auto=format&fit=crop'
    ].map(createResponsiveImage)
  },
  {
    id: 'lumbini',
    name: 'Lumbini',
    slug: 'lumbini',
    country: 'Nepal',
    category: 'national',
    description: 'Birthplace of Buddha - sacred pilgrimage site with ancient ruins',
    thumbnail: createResponsiveImage('https://images.unsplash.com/photo-1559641451-21c8e2bf7c2d?q=80&w=800&auto=format&fit=crop'),
    heroImage: 'https://images.unsplash.com/photo-1559641451-21c8e2bf7c2d?q=80&w=2000&auto=format&fit=crop',
    imageCount: 6,
    images: [
      'https://images.unsplash.com/photo-1559641451-21c8e2bf7c2d?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1504198458649-3128b932f49e?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1590055531615-f16d36ffe8ec?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1504198458649-3128b932f49e?q=80&w=1200&auto=format&fit=crop'
    ].map(createResponsiveImage)
  }
];

// Export for use in gallery data
export const nationalGalleryData = {
  destinations: nationalDestinations,
  theme: nationalTheme
};

export default nationalGalleryData;

