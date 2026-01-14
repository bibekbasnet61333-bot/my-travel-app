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

const DestinationTabbedContent = ({
  itinerary,
  inclusions,
  exclusions,
  theme,
  onOpenModal,
  pageClass = 'from-stone-50/50 via-amber-50/30 to-slate-50/50',
  contactFormId = 'contact-form'
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
    destinationId: 'destination'
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

  const tabGradientStyle = parseGradientToStyle(t.primaryGradientClass);
  const buttonGradientStyle = parseGradientToStyle(t.primaryGradientClass);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-8">
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
                Explore Your Destination
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

      <div className="lg:col-span-4">
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

