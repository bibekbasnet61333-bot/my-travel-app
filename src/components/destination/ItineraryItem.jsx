import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Calendar, Clock } from 'lucide-react';

// Tailwind color mapping for inline gradient styles
const TAILWIND_COLORS = {
  'red-50': '#fef2f2', 'red-100': '#fee2e2', 'red-200': '#fecaca', 'red-300': '#fca5a5',
  'red-400': '#f87171', 'red-500': '#ef4444', 'red-600': '#dc2626', 'red-700': '#b91c1c',
  'rose-400': '#fb7185', 'rose-500': '#f43f5e', 'rose-600': '#e11d48',
  'orange-500': '#f97316', 'orange-600': '#ea580c',
  'amber-500': '#f59e0b', 'amber-600': '#d97706',
  'yellow-500': '#eab308', 'yellow-600': '#ca8a04',
  'green-500': '#22c55e', 'green-600': '#16a34a',
  'emerald-500': '#10b981', 'emerald-600': '#059669',
  'teal-500': '#14b8a6', 'teal-600': '#0d9488',
  'cyan-500': '#06b6d4', 'cyan-600': '#0891b2',
  'sky-500': '#0ea5e9', 'sky-600': '#0284c7',
  'blue-500': '#3b82f6', 'blue-600': '#2563eb', 'blue-700': '#1d4ed8',
  'indigo-500': '#6366f1', 'indigo-600': '#4f46e5', 'indigo-700': '#4338ca',
  'violet-500': '#8b5cf6', 'violet-600': '#7c3aed',
  'purple-500': '#a855f7', 'purple-600': '#9333ea',
  'fuchsia-500': '#d946ef', 'fuchsia-600': '#c026d3',
  'pink-500': '#ec4899', 'pink-600': '#db2777',
};

// Helper to render multiline content properly
const renderContent = (content) => {
  if (!content) return null;

  // Split by newlines and filter empty lines
  const paragraphs = content.split('\n').filter(p => p.trim());

  if (paragraphs.length === 0) return null;

  return (
    <div className="space-y-3">
      {paragraphs.map((paragraph, idx) => (
        <p key={idx} className="text-stone-700 leading-relaxed">
          {paragraph.trim()}
        </p>
      ))}
    </div>
  );
};

// Convert Tailwind color class to hex
const getColorFromClass = (colorClass) => {
  return TAILWIND_COLORS[colorClass] || colorClass;
};

const ItineraryItem = ({ day, title, content, isExpanded, onToggle, theme }) => {
  // Default theme colors - use red gradient for China theme
  const defaultPrimaryGradient = 'from-red-500 to-rose-600';
  const primaryGradient = theme?.primaryGradientClass || defaultPrimaryGradient;

  // Parse gradient for consistent styling and convert to hex
  const gradientMatch = primaryGradient.match(/from-([\w-]+)\s+to-([\w-]+)/);
  const fromColor = gradientMatch ? getColorFromClass(gradientMatch[1]) : '#ef4444';
  const toColor = gradientMatch ? getColorFromClass(gradientMatch[2]) : '#e11d48';

  // Generate gradient style for circles
  const circleGradientStyle = {
    background: `linear-gradient(to bottom right, ${fromColor}, ${toColor})`
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100/50 overflow-hidden"
    >
      <motion.button
        onClick={onToggle}
        className="w-full text-left p-6 bg-gradient-to-r from-stone-50/50 to-stone-100/50 hover:from-stone-100/50 hover:to-stone-200/50 transition-all duration-300 group"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Day Circle - styled with theme gradient */}
            <div className="relative">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                style={circleGradientStyle}
              >
                <span className="text-white font-bold text-lg">{day}</span>
              </div>
              <div
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center"
                style={circleGradientStyle}
              >
                <Calendar className="w-2 h-2 text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-bold text-stone-900 group-hover:text-stone-700 transition-colors duration-300">
                {title}
              </h3>
              <div className="flex items-center gap-4 text-sm text-stone-600 mt-1">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>Day {day}</span>
                </div>
              </div>
            </div>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="w-8 h-8 bg-white/80 rounded-full flex items-center justify-center shadow-md flex-shrink-0"
          >
            <ChevronDown className="w-5 h-5 text-stone-600" />
          </motion.div>
        </div>
      </motion.button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden px-6 pb-6"
          >
            <div className="pt-2 border-t border-stone-100">
              {renderContent(content)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ItineraryItem;

