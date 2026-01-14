// Color mapping for Tailwind colors to hex values
const TAILWIND_COLORS = {
  // Reds
  'red-50': '#fef2f2', 'red-100': '#fee2e2', 'red-200': '#fecaca', 'red-300': '#fca5a5',
  'red-400': '#f87171', 'red-500': '#ef4444', 'red-600': '#dc2626', 'red-700': '#b91c1c',
  'red-800': '#991b1b', 'red-900': '#7f1d1d',
  // Ambers
  'amber-50': '#fffbeb', 'amber-100': '#fef3c7', 'amber-200': '#fde68a', 'amber-300': '#fcd34d',
  'amber-400': '#fbbf24', 'amber-500': '#f59e0b', 'amber-600': '#d97706', 'amber-700': '#b45309',
  // Oranges
  'orange-50': '#fff7ed', 'orange-100': '#ffedd5', 'orange-200': '#fed7aa', 'orange-300': '#fdba74',
  'orange-400': '#fb923c', 'orange-500': '#f97316', 'orange-600': '#ea580c', 'orange-700': '#c2410c',
  // Stones
  'stone-50': '#fafaf9', 'stone-100': '#f5f5f4', 'stone-200': '#e7e5e4', 'stone-300': '#d6d3d1',
  'stone-400': '#a8a29e', 'stone-500': '#78716c', 'stone-600': '#57534e', 'stone-700': '#44403c',
  // Slates
  'slate-50': '#f8fafc', 'slate-100': '#f1f5f9', 'slate-200': '#e2e8f0', 'slate-300': '#cbd5e1',
  'slate-400': '#94a3b8', 'slate-500': '#64748b', 'slate-600': '#475569', 'slate-700': '#334155',
  // Emeralds
  'emerald-50': '#ecfdf5', 'emerald-100': '#d1fae5', 'emerald-200': '#a7f3d0', 'emerald-300': '#6ee7b7',
  'emerald-400': '#34d399', 'emerald-500': '#10b981', 'emerald-600': '#059669',
  // Greens
  'green-50': '#f0fdf4', 'green-100': '#dcfce7', 'green-200': '#bbf7d0', 'green-300': '#86efac',
  'green-400': '#4ade80', 'green-500': '#22c55e', 'green-600': '#16a34a',
  // Teals
  'teal-50': '#f0fdfa', 'teal-100': '#ccfbf1', 'teal-200': '#99f6e4', 'teal-300': '#5eead4',
  'teal-400': '#2dd4bf', 'teal-500': '#14b8a6', 'teal-600': '#0d9488',
  // Blues
  'blue-50': '#eff6ff', 'blue-100': '#dbeafe', 'blue-200': '#bfdbfe', 'blue-300': '#93c5fd',
  'blue-400': '#60a5fa', 'blue-500': '#3b82f6', 'blue-600': '#2563eb', 'blue-700': '#1d4ed8',
  'blue-800': '#1e40af', 'blue-900': '#1e3a8a',
  // Purples
  'purple-50': '#faf5ff', 'purple-100': '#f3e8ff', 'purple-200': '#e9d5ff', 'purple-300': '#d8b4fe',
  'purple-400': '#c084fc', 'purple-500': '#a855f7', 'purple-600': '#9333ea',
  // Pinks
  'pink-50': '#fdf2f8', 'pink-100': '#fce7f3', 'pink-200': '#fbcfe8', 'pink-300': '#f9a8d4',
  'pink-400': '#f472b6', 'pink-500': '#ec4899', 'pink-600': '#db2777',
  // Yellows
  'yellow-50': '#fefce8', 'yellow-100': '#fef9c3', 'yellow-200': '#fef08a', 'yellow-300': '#fde047',
  'yellow-400': '#facc15', 'yellow-500': '#eab308',
  // Cyan
  'cyan-50': '#ecfeff', 'cyan-100': '#cffafe', 'cyan-200': '#a5f3fc', 'cyan-300': '#67e8f9',
  'cyan-400': '#22d3ee', 'cyan-500': '#06b6d4', 'cyan-600': '#0891b2',
  // Sky
  'sky-50': '#f0f9ff', 'sky-100': '#e0f2fe', 'sky-200': '#bae6fd', 'sky-300': '#7dd3fc',
  'sky-400': '#38bdf8', 'sky-500': '#0ea5e9', 'sky-600': '#0284c7',
  // Indigo
  'indigo-50': '#eef2ff', 'indigo-100': '#e0e7ff', 'indigo-200': '#c7d2fe', 'indigo-300': '#a5b4fc',
  'indigo-400': '#818cf8', 'indigo-500': '#6366f1', 'indigo-600': '#4f46e5', 'indigo-700': '#4338ca',
  // Violet
  'violet-50': '#f5f3ff', 'violet-100': '#ede9fe', 'violet-200': '#ddd6fe', 'violet-300': '#c4b5fd',
  'violet-400': '#a78bfa', 'violet-500': '#8b5cf6', 'violet-600': '#7c3aed',
};

// Get hex color from Tailwind color class
// Handles both simple classes (blue-500) and classes with opacity (blue-500/30)
const getHexColor = (colorClass) => {
  if (!colorClass || typeof colorClass !== 'string') return '#0891b2';

  // Split on "/" to handle opacity modifier
  const parts = colorClass.split('/');
  const baseColor = parts[0].trim();

  // Look up the base color
  const hexColor = TAILWIND_COLORS[baseColor];
  if (hexColor) {
    // If there's opacity, return rgba
    if (parts.length > 1 && parts[1]) {
      const opacity = parseFloat(parts[1]) / 100;
      // Convert hex to rgba
      const r = parseInt(hexColor.slice(1, 3), 16);
      const g = parseInt(hexColor.slice(3, 5), 16);
      const b = parseInt(hexColor.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    return hexColor;
  }

  // If not found, return the original (might be a direct hex value)
  return colorClass;
};

// Convert Tailwind gradient class to CSS linear-gradient
// Handles: from-X to-Y, from-X via-Y to-Z, from-X-Y to-Z-W patterns
// Also handles colors with opacity modifiers like from-blue-500/30 to-cyan-500/30
export const parseGradientToStyle = (gradientClass) => {
  if (!gradientClass || typeof gradientClass !== 'string') {
    return { backgroundImage: 'linear-gradient(to right, #0891b2, #06b6d4)' };
  }

  // Match from-XXX to-XXX pattern (2 colors)
  const match2 = gradientClass.match(/from-([\w/-]+)\s+to-([\w/-]+)/);
  if (match2) {
    const fromColor = getHexColor(match2[1]);
    const toColor = getHexColor(match2[2]);
    return { backgroundImage: `linear-gradient(to right, ${fromColor}, ${toColor})` };
  }

  // Match from-XXX via-XXX to-XXX pattern (3 colors)
  const match3 = gradientClass.match(/from-([\w/-]+)\s+via-([\w/-]+)\s+to-([\w/-]+)/);
  if (match3) {
    const fromColor = getHexColor(match3[1]);
    const viaColor = getHexColor(match3[2]);
    const toColor = getHexColor(match3[3]);
    return { backgroundImage: `linear-gradient(to right, ${fromColor}, ${viaColor}, ${toColor})` };
  }

  // Fallback to teal (Thailand's primary color)
  return { backgroundImage: 'linear-gradient(to right, #0891b2, #06b6d4)' };
};

// Get a single color from Tailwind class
export const getColorFromClass = (className) => {
  if (!className || typeof className !== 'string') return '#d97706';
  const match = className.match(/([\w-]+)$/);
  if (match) {
    return TAILWIND_COLORS[match[0]] || match[0];
  }
  return className;
};

export default { parseGradientToStyle, getColorFromClass };

