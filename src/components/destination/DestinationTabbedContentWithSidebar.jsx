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

const DestinationTabbedContentWithSidebar = ({
  itinerary,
  inclusions,
  exclusions,
  theme,
  onOpenModal,
  destinationId
}) => {
  const [activeTab, setActiveTab] = useState('itinerary');

  // Default theme if not provided (China style with lighter colors)
  const defaultTheme = {
    primaryGradientClass: 'from-orange-500 to-red-500',
    secondaryGradientClass: 'from-red-500 to-orange-600',
    titleGradient: 'linear-gradient(to right, #f97316, #ef4444)',
    backgroundGradient: 'bg-gradient-to-br from-orange-50/30 via-red-50/20 to-amber-50/30',
    headingColor: '#c2410c',
    accentColor: '#ea580c',
    destinationName: 'Your Destination'
  };

  const t = theme || defaultTheme;

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

  // Use utility for proper gradient parsing
  const tabGradientStyle = parseGradientToStyle(t.primaryGradientClass);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Side - Tab Content */}
      <div className="lg:col-span-2">
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className={`py-10 ${t.backgroundGradient || ''}`}
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
                Explore {t.destinationName || 'Your Destination'} Your Way
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
                        ? 'text-white shadow-md'
                        : 'text-gray-600 hover:bg-gray-100'
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

      {/* Right Side - Contact Form Only */}
      <div className="lg:col-span-1">
        <div className="xl:sticky xl:top-24">
          <DestinationContactForm
            destinationId={destinationId || 'china'}
            theme={t}
            contactFormId={`${destinationId || 'china'}-contact-form`}
          />
        </div>
      </div>
    </div>
  );
};

export default DestinationTabbedContentWithSidebar;
