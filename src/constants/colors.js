// SASA Travel - Ultra Premium Color Palette
export const colors = {
  // Primary Colors (Elite Navy - Ultimate Trust & Luxury)
  primary: {
    50: '#f0f9ff',   // Pure white with blue tint
    100: '#e0f2fe',  // Very light sky blue
    200: '#bae6fd',  // Light sky blue
    300: '#7dd3fc',  // Medium light sky blue
    400: '#38bdf8',  // Bright sky blue
    500: '#0ea5e9',  // Vibrant sky blue
    600: '#0284c7',  // Deep sky blue
    700: '#0369a1',  // Rich navy blue
    800: '#075985',  // Dark navy blue
    900: '#0c4a6e',  // Deepest navy blue
  },

  // Secondary Colors (Prestige Emerald - Luxury Nature)
  secondary: {
    50: '#ecfdf5',   // Mint cream
    100: '#d1fae5',  // Very light mint
    200: '#a7f3d0',  // Light mint green
    300: '#6ee7b7',  // Medium mint green
    400: '#34d399',  // Bright emerald
    500: '#10b981',  // Rich emerald
    600: '#059669',  // Deep emerald
    700: '#047857',  // Forest emerald
    800: '#065f46',  // Dark forest
    900: '#064e3b',  // Deep forest
  },

  // Accent Colors (Platinum Gold - Supreme Prestige)
  accent: {
    50: '#fefce8',   // Pale yellow
    100: '#fef9c3',  // Light cream
    200: '#fef08a',  // Soft gold
    300: '#fde047',  // Warm gold
    400: '#facc15',  // Bright gold
    500: '#eab308',  // Rich gold
    600: '#ca8a04',  // Antique gold
    700: '#a16207',  // Bronze gold
    800: '#854d0e',  // Dark bronze
    900: '#713f12',  // Deep bronze
  },

  // Success Colors (Royal Forest - Achievement & Growth)
  success: {
    50: '#f0fdf4',   // Fresh green
    100: '#dcfce7',  // Light green
    200: '#bbf7d0',  // Soft green
    300: '#86efac',  // Medium green
    400: '#4ade80',  // Bright green
    500: '#22c55e',  // Vibrant green
    600: '#16a34a',  // Rich green
    700: '#15803d',  // Deep green
    800: '#166534',  // Dark green
    900: '#14532d',  // Forest green
  },

  // Neutral Colors (Pure Charcoal - Sophisticated Elegance)
  neutral: {
    50: '#fafafa',   // Off-white
    100: '#f4f4f5',  // Very light gray
    200: '#e4e4e7',  // Light gray
    300: '#d4d4d8',  // Medium light gray
    400: '#a1a1aa',  // Medium gray
    500: '#71717a',  // Standard gray
    600: '#52525b',  // Dark gray
    700: '#3f3f46',  // Darker gray
    800: '#27272a',  // Very dark gray
    900: '#18181b',  // Almost black
  },

  // Text Colors (Crystal Clear Readability)
  text: {
    primary: '#ffffff',    // Pure white for headings
    secondary: '#f1f5f9',  // Off-white for body text
    tertiary: '#cbd5e1',   // Light gray for captions
    muted: '#94a3b8',      // Muted gray for subtle text
    inverse: '#0f172a',    // Dark navy for light backgrounds
    accent: '#0ea5e9',     // Sky blue for links and highlights
  },

  // Surface Colors (Premium Glass & Depth)
  surface: {
    light: '#ffffff',
    dark: '#0f172a',       // Premium dark navy
    darker: '#020617',     // Ultra dark navy
    card: '#1e293b',       // Card background
    overlay: '#0f172a',    // Overlay background
    glass: 'rgba(255, 255, 255, 0.08)', // Glass effect
    glassDark: 'rgba(0, 0, 0, 0.4)',   // Dark glass effect
  },

  // Section Backgrounds (Unified Premium Color Scheme)
  sections: {
    hero: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 58, 138, 0.95) 50%, rgba(15, 23, 42, 0.98) 100%)',
    video: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(2, 6, 23, 0.95) 100%)',
    worldMap: 'linear-gradient(180deg, rgba(15, 23, 42, 0.98) 0%, rgba(2, 6, 23, 0.98) 100%)',
    destinations: 'linear-gradient(135deg, rgba(15, 23, 42, 0.97) 0%, rgba(30, 58, 138, 0.93) 100%)',
    whyChoose: 'linear-gradient(180deg, rgba(15, 23, 42, 0.98) 0%, rgba(2, 6, 23, 0.98) 100%)',
    journey: 'linear-gradient(135deg, rgba(15, 23, 42, 0.96) 0%, rgba(30, 58, 138, 0.92) 100%)',
    testimonials: 'linear-gradient(180deg, rgba(15, 23, 42, 0.97) 0%, rgba(2, 6, 23, 0.97) 100%)',
    stats: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 58, 138, 0.91) 100%)',
    packages: 'linear-gradient(180deg, rgba(15, 23, 42, 0.98) 0%, rgba(2, 6, 23, 0.98) 100%)',
    gallery: 'linear-gradient(135deg, rgba(15, 23, 42, 0.96) 0%, rgba(30, 58, 138, 0.92) 100%)',
    services: 'linear-gradient(180deg, rgba(15, 23, 42, 0.97) 0%, rgba(2, 6, 23, 0.97) 100%)',
    timeline: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 58, 138, 0.91) 100%)',
    leadership: 'linear-gradient(180deg, rgba(15, 23, 42, 0.98) 0%, rgba(2, 6, 23, 0.98) 100%)',
    newsletter: 'linear-gradient(135deg, rgba(15, 23, 42, 0.96) 0%, rgba(30, 58, 138, 0.92) 100%)',
    cta: 'linear-gradient(180deg, rgba(15, 23, 42, 0.97) 0%, rgba(2, 6, 23, 0.97) 100%)',
  },

  // Semantic Colors (Enhanced Contrast)
  success: '#10b981',      // Emerald
  warning: '#eab308',      // Gold
  error: '#ef4444',        // Red
  info: '#0ea5e9',         // Sky blue
};

// Enhanced Gradient Utilities for Trippy Effects
export const getGradient = (type = 'cosmic', direction = 'to-br') => {
  switch (type) {
    case 'cosmic':
      return `bg-gradient-${direction} from-primary-900 via-secondary-800 to-accent-900`;
    case 'nebula':
      return `bg-gradient-${direction} from-secondary-900 via-accent-800 to-trippy-900`;
    case 'aurora':
      return `bg-gradient-${direction} from-electric-cyan-500 via-electric-yellow-400 to-accent-500`;
    case 'void':
      return `bg-gradient-${direction} from-neutral-900 via-neutral-800 to-neutral-900`;
    case 'plasma':
      return `bg-gradient-${direction} from-accent-600 via-secondary-500 to-primary-600`;
    case 'quantum':
      return `bg-gradient-${direction} from-trippy-500 via-electric-cyan-400 to-secondary-500`;
    default:
      return `bg-gradient-${direction} from-primary-600 to-secondary-600`;
  }
};

// Enhanced Shadow Utilities with Glow Effects
export const getShadow = (intensity = 'trippy', color = 'primary') => {
  switch (intensity) {
    case 'subtle':
      return `shadow-sm shadow-${color}-500/20`;
    case 'medium':
      return `shadow-lg shadow-${color}-500/30`;
    case 'glow':
      return `shadow-2xl shadow-${color}-500/50`;
    case 'trippy':
      return `shadow-3xl shadow-${color}-400/60 drop-shadow-2xl`;
    case 'cosmic':
      return `shadow-4xl shadow-${color}-300/80 drop-shadow-3xl`;
    default:
      return `shadow-lg shadow-${color}-500/25`;
  }
};

// Professional Background Utilities for Travel Theme
export const getBackground = (type = 'hero') => {
  switch (type) {
    case 'hero':
      return 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 58, 138, 0.9) 50%, rgba(15, 23, 42, 0.95) 100%)';
    case 'section':
      return 'linear-gradient(180deg, rgba(15, 23, 42, 0.98) 0%, rgba(2, 6, 23, 0.98) 100%)';
    case 'section-alt':
      return 'linear-gradient(135deg, rgba(2, 6, 23, 0.95) 0%, rgba(15, 23, 42, 0.95) 100%)';
    case 'card':
      return 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.9) 100%)';
    case 'overlay':
      return 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 100%)';
    case 'glass':
      return 'rgba(255, 255, 255, 0.05)';
    case 'glass-dark':
      return 'rgba(0, 0, 0, 0.3)';
    case 'accent':
      return 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(20, 184, 166, 0.1) 100%)';
    default:
      return 'rgba(15, 23, 42, 0.95)';
  }
};

// Enhanced Animation Utilities for Trippy Effects
export const getAnimation = (type = 'trippy-fadeIn') => {
  switch (type) {
    case 'fadeIn':
      return 'animate-trippy-fadeIn';
    case 'slideUp':
      return 'animate-trippy-slideUp';
    case 'slideDown':
      return 'animate-trippy-slideDown';
    case 'slideLeft':
      return 'animate-trippy-slideLeft';
    case 'slideRight':
      return 'animate-trippy-slideRight';
    case 'scale':
      return 'animate-trippy-scale';
    case 'bounce':
      return 'animate-trippy-bounce';
    case 'pulse':
      return 'animate-trippy-pulse';
    case 'spin':
      return 'animate-trippy-spin';
    case 'float':
      return 'animate-trippy-float';
    default:
      return 'animate-trippy-fadeIn';
  }
};

// Opacity Utilities with Trippy Transparency
export const getOpacity = (level = 'cosmic') => {
  switch (level) {
    case 'cosmic':
      return 'opacity-95';
    case 'nebula':
      return 'opacity-85';
    case 'aurora':
      return 'opacity-75';
    case 'plasma':
      return 'opacity-65';
    case 'quantum':
      return 'opacity-55';
    case 'ether':
      return 'opacity-45';
    case 'void':
      return 'opacity-25';
    default:
      return 'opacity-95';
  }
};

// Border Radius Utilities with Organic Shapes
export const getBorderRadius = (size = 'cosmic') => {
  switch (size) {
    case 'none':
      return 'rounded-none';
    case 'subtle':
      return 'rounded-sm';
    case 'smooth':
      return 'rounded-md';
    case 'cosmic':
      return 'rounded-lg';
    case 'nebula':
      return 'rounded-xl';
    case 'aurora':
      return 'rounded-2xl';
    case 'plasma':
      return 'rounded-3xl';
    case 'quantum':
      return 'rounded-full';
    default:
      return 'rounded-lg';
  }
};

// Spacing Utilities with Cosmic Proportions
export const getSpacing = (size = 'cosmic') => {
  switch (size) {
    case 'micro':
      return 'p-2';
    case 'tiny':
      return 'p-4';
    case 'small':
      return 'p-6';
    case 'cosmic':
      return 'p-8';
    case 'nebula':
      return 'p-12';
    case 'aurora':
      return 'p-16';
    case 'plasma':
      return 'p-20';
    case 'quantum':
      return 'p-24';
    default:
      return 'p-8';
  }
};

// Typography Utilities with Psychedelic Effects
export const getTypography = (variant = 'cosmic') => {
  switch (variant) {
    case 'micro':
      return 'text-xs font-light tracking-wider';
    case 'tiny':
      return 'text-sm font-light tracking-wide';
    case 'small':
      return 'text-base font-normal tracking-wide';
    case 'cosmic':
      return 'text-lg font-medium tracking-wide';
    case 'nebula':
      return 'text-xl font-semibold tracking-wide';
    case 'aurora':
      return 'text-2xl font-bold tracking-wide';
    case 'plasma':
      return 'text-3xl font-bold tracking-wider';
    case 'quantum':
      return 'text-4xl font-black tracking-wider';
    default:
      return 'text-lg font-medium tracking-wide';
  }
};

// Export all utilities
export default {
  colors,
  getGradient,
  getShadow,
  getBackground,
  getAnimation,
  getOpacity,
  getBorderRadius,
  getSpacing,
  getTypography
};
