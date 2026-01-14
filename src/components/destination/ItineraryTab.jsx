
import { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import ItineraryItem from './ItineraryItem';

const ItineraryTab = ({ itinerary, theme }) => {
  // Default theme (China style with red colors for better contrast)
  const defaultTheme = {
    primaryGradientClass: 'from-red-500 to-rose-600',
    secondaryGradientClass: 'from-rose-500 to-red-600',
    headingColor: '#b91c1c',
    iconColor: '#dc2626',
    cardBorder: 'border-red-100'
  };

  const t = theme || defaultTheme;

  // Initialize expanded state based on itinerary length
  const [expandedItems, setExpandedItems] = useState(() => {
    const initial = {};
    if (itinerary && itinerary.length > 0) {
      itinerary.forEach(item => {
        initial[item.day] = false;
      });
    }
    return initial;
  });

  const toggleItem = useCallback((day) => {
    setExpandedItems(prev => ({
      ...prev,
      [day]: !prev[day]
    }));
  }, []);

  const expandAll = useCallback(() => {
    if (!itinerary) return;
    const allExpanded = {};
    itinerary.forEach(item => {
      allExpanded[item.day] = true;
    });
    setExpandedItems(allExpanded);
  }, [itinerary]);

  const collapseAll = useCallback(() => {
    if (!itinerary) return;
    const initial = {};
    itinerary.forEach(item => {
      initial[item.day] = false;
    });
    setExpandedItems(initial);
  }, [itinerary]);

  // Memoized values for better performance
  const { allExpanded, noneExpanded } = useMemo(() => {
    if (!itinerary || itinerary.length === 0) {
      return { allExpanded: false, noneExpanded: true };
    }
    const values = Object.values(expandedItems);
    return {
      allExpanded: values.length === itinerary.length && values.every(Boolean),
      noneExpanded: values.every(v => !v)
    };
  }, [itinerary, expandedItems]);

  // Don't render if no itinerary
  if (!itinerary || itinerary.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="max-w-4xl mx-auto"
    >
      <div className={`bg-white/90 rounded-3xl shadow-xl p-6 md:p-8 border ${t.cardBorder}`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <h3 className="text-2xl font-bold flex items-center gap-3" style={{ color: t.headingColor }}>
            <Calendar className="w-6 h-6" style={{ color: t.iconColor }} />
            Day-wise Itinerary
          </h3>
          <div className="flex gap-2">
            <motion.button
              onClick={expandAll}
              disabled={allExpanded}
              whileHover={!allExpanded ? { scale: 1.02 } : {}}
              whileTap={!allExpanded ? { scale: 0.98 } : {}}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 ${
                allExpanded
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : `bg-gradient-to-r ${t.primaryGradientClass} text-white shadow-lg hover:shadow-xl`
              }`}
            >
              <ChevronDown className="w-4 h-4" />
              Expand All
            </motion.button>
            <motion.button
              onClick={collapseAll}
              disabled={noneExpanded}
              whileHover={!noneExpanded ? { scale: 1.02 } : {}}
              whileTap={!noneExpanded ? { scale: 0.98 } : {}}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 ${
                noneExpanded
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : `bg-gradient-to-r ${t.secondaryGradientClass} text-white shadow-lg hover:shadow-xl`
              }`}
            >
              <ChevronUp className="w-4 h-4" />
              Collapse All
            </motion.button>
          </div>
        </div>

        <div className="space-y-4">
          {itinerary.map((item) => (
            <ItineraryItem
              key={item.day}
              day={item.day}
              title={item.title}
              content={item.content}
              isExpanded={!!expandedItems[item.day]}
              onToggle={() => toggleItem(item.day)}
              theme={t}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ItineraryTab;

