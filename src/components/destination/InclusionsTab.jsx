import { motion } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';

const InclusionsTab = ({ inclusions, exclusions, theme }) => {
  // Default theme (Dubai style)
  const defaultTheme = {
    headingColor: '#78350f',
    iconColor: '#d97706',
    cardBorder: 'border-amber-100'
  };

  const t = theme || defaultTheme;

  // Handle both array of strings and array of objects
  const processInclusions = (items) => {
    if (!items) return [];
    return items.map(item => {
      if (typeof item === 'string') {
        return { title: item, description: '' };
      }
      return item;
    });
  };

  const processExclusions = (items) => {
    if (!items) return [];
    return items.map(item => (typeof item === 'string' ? item : item.title || item));
  };

  const processedInclusions = processInclusions(inclusions);
  const processedExclusions = processExclusions(exclusions);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-3xl mx-auto"
    >
      <div className={`bg-white/90 rounded-3xl shadow-xl p-8 border ${t.cardBorder}`}>
        <h3 className={`text-2xl font-bold mb-8 flex items-center gap-3`} style={{ color: t.headingColor }}>
          Inclusions & Exclusions
        </h3>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Inclusions - Dubai Style Simple List */}
          <div>
            <h4 className={`font-semibold mb-4 flex items-center gap-2`} style={{ color: t.headingColor }}>
              <CheckCircle className="w-5 h-5 text-green-500" />
              Included
            </h4>
            <ul className="space-y-3">
              {processedInclusions.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <span className="block">{item.title}</span>
                    {item.description && (
                      <span className="text-sm text-gray-500 block mt-0.5">{item.description}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Exclusions - Dubai Style Simple List */}
          <div>
            <h4 className={`font-semibold mb-4 flex items-center gap-2`} style={{ color: t.headingColor }}>
              <XCircle className="w-5 h-5 text-red-400" />
              Not Included
            </h4>
            <ul className="space-y-3">
              {processedExclusions.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-700">
                  <XCircle className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default InclusionsTab;

