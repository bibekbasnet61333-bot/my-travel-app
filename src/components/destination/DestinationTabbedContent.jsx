import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ItineraryTab from './ItineraryTab';
import InclusionsTab from './InclusionsTab';
import DestinationContactForm from './DestinationContactForm';
import { parseGradientToStyle } from '../../utils/gradientUtils';

const TABS = [
  { id: 'itinerary', label: 'Itinerary' },
  { id: 'inclusions', label: 'Inclusions' }
];

/**
 * Unified DestinationTabbedContent component
 * Supports different sidebar ratios via 'sidebarSize' prop
 * 
 * @param {Object} props
 * @param {Array} props.itinerary - Itinerary data
 * @param {Array} props.inclusions - Inclusions data
 * @param {Array} props.exclusions - Exclusions data
 * @param {Object} props.theme - Theme configuration
 * @param {Function} props.onOpenModal - Modal open handler
 * @param {string} props.pageClass - Background gradient class (default: 'from-stone-50/50 via-amber-50/30 to-slate-50/50')
 * @param {string} props.contactFormId - Contact form ID
 * @param {string} props.sidebarSize - Sidebar size: 'small' (1/4), 'medium' (1/3), 'large' (1/2) - default: 'small'
 */
const DestinationTabbedContent = ({
  itinerary,
  inclusions,
  exclusions,
  theme,
  onOpenModal,
  pageClass = 'from-stone-50/50 via-amber-50/30 to-slate-50/50',
  contactFormId = 'contact-form',
  sidebarSize = 'small'
}) => {
  const [activeTab, setActiveTab] = useState('itinerary');

  const defaultTheme = {
    primaryGradientClass: 'from-orange-500 to-red-500',
    secondaryGradientClass: 'from-red-500 to-orange-600',
    titleGradient: 'linear-gradient(to right, #f97316, #ef4444)',
    headingColor: '#c2410c',
    iconColor: '#ea580c',
    cardBorder: 'border-orange-100',
    tabActiveClass: 'bg-orange-500 text-white',
    tabInactiveClass: 'text-stone-600 hover:bg-orange-50',
    destinationId: 'destination',
    destinationName: 'Your Destination'
  };

  const t = theme || defaultTheme;

  // Determine grid columns based on sidebarSize
  const getGridConfig = () => {
    switch (sidebarSize) {
      case 'large':
        return { gridCols: 'lg:grid-cols-2', contentSpan: 'lg:col-span-1', sidebarSpan: 'lg:col-span-1' };
      case 'medium':
        return { gridCols: 'lg:grid-cols-3', contentSpan: 'lg:col-span-2', sidebarSpan: 'lg:col-span-1' };
      case 'small':
      default:
        return { gridCols: 'lg:grid-cols-12', contentSpan: 'lg:col-span-8', sidebarSpan: 'lg:col-span-4' };
    }
  };

  const { gridCols, contentSpan, sidebarSpan } = getGridConfig();

  const renderTabContent = () => {
    switch (activeTab) {
      case 'itinerary':
        return <ItineraryTab itinerary={itinerary} theme={t} />;
      case 'inclusions':
        return <InclusionsTab inclusions={inclusions} exclusions={exclusions} theme={t} />;
      default:
        return <ItineraryTab itinerary={itinerary} theme={t} />;
    }
  };

  const tabGradientStyle = parseGradientToStyle(t.primaryGradientClass);

  return (
    <div className={`grid grid-cols-1 ${gridCols} gap-8 items-start`}>
      {/* Left Side - Tab Content */}
      <div className={contentSpan}>
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className={`py-10 bg-gradient-to-br ${pageClass}`}
        >
          <div>
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <h2
                className="text-3xl md:text-4xl font-bold mb-2 font-poppins bg-clip-text text-transparent"
                style={{
                  backgroundImage: t.titleGradient || 'linear-gradient(to right, #b45309, #eab308)'
                }}
              >
                Explore {t.destinationName !== 'Your Destination' ? `${t.destinationName} ` : ''}Your Destination
              </h2>
            </motion.div>

            <div className="flex justify-center mb-8">
              <div className="inline-flex bg-white/80 backdrop-blur-lg rounded-2xl p-1 shadow-lg border border-white/50">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      activeTab === tab.id
                        ? t.tabActiveClass + ' shadow-md'
                        : t.tabInactiveClass
                    }`}
                    style={activeTab === tab.id ? tabGradientStyle : {}}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderTabContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.section>
      </div>

      {/* Right Side - Contact Form */}
      <div className={sidebarSpan}>
        <div className="lg:sticky lg:top-24">
          <DestinationContactForm
            destinationId={t.destinationId}
            theme={t}
            contactFormId={contactFormId}
          />
        </div>
      </div>
    </div>
  );
};

export default DestinationTabbedContent;

