import { memo } from 'react';
import { motion } from 'framer-motion';

// Reusable destination components
import DestinationHero from '../../components/destination/DestinationHero';
import DestinationAbout from '../../components/destination/DestinationAbout';
import DestinationTabbedContent from '../../components/destination/DestinationTabbedContent';
import DestinationKnowBeforeYouGoModal from '../../components/destination/DestinationKnowBeforeYouGoModal';

// Hook for shared destination page logic
import { useDestinationPage } from '../../hooks/useDestinationPage';

// Scroll progress with theme color
import ScrollProgress from '../../components/ui/ScrollProgress';

// Thailand data
import {
  thailandTheme,
  thailandHeroStats,
  thailandHighlightsData,
  thailandStats,
  thailandItineraryData,
  thailandInclusionsData,
  thailandExclusionsData,
  thailandFAQs,
  thailandPolicies
} from '../../data/destinations/thailand';

/**
 * Thailand destination page
 * Uses useDestinationPage hook for consolidated logic
 */
const Thailand = memo(() => {
  // Use shared hook for modal state and handlers
  const {
    modalState,
    openModal,
    closeModal,
    handleDownloadPDF,
    handleViewGallery
  } = useDestinationPage({
    destinationId: 'thailand',
    theme: thailandTheme,
    faqs: thailandFAQs,
    policies: thailandPolicies,
    galleryPath: '/gallery/thailand'
  });

  // Ensure theme has all required properties
  const theme = {
    ...thailandTheme,
    destinationId: thailandTheme.destinationId || 'thailand',
    backgroundGradient: 'from-blue-50/30 via-cyan-50/20 to-teal-50/30',
    headingColor: thailandTheme.headingColor || '#0c4a6e',
    borderColor: thailandTheme.borderColor || '#a5f3fc',
    accentColor: thailandTheme.accentColor || '#0891b2',
    primaryGradientClass: thailandTheme.primaryGradientClass || 'from-blue-600 to-cyan-600',
    secondaryGradientClass: thailandTheme.secondaryGradientClass || 'from-blue-500 to-teal-500',
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen bg-gradient-to-br ${theme.pageClass} relative overflow-x-hidden`}
    >
      {/* Animated Background Elements */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
      >
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-400/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-20 w-96 h-96 bg-gradient-to-br from-cyan-400/8 to-blue-500/8 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-br from-blue-500/5 to-cyan-600/5 rounded-full blur-3xl animate-pulse delay-2000" />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <DestinationHero
          title="Discover Thailand"
          subtitle={theme.heroSubtitle}
          backgroundImage={theme.heroImage}
          stats={thailandHeroStats}
          theme={theme}
          onDownloadPDF={handleDownloadPDF}
          onViewGallery={handleViewGallery}
          contactFormId="thailand-contact-form"
          tourTitle="7 Nights / 8 Days"
          tourSubtitle="Bangkok - Phuket - Chiang Mai"
          tourSubtitleColor="#0ea5e9"
          short
        />

        {/* About Section */}
        <DestinationAbout
          title="About Thailand"
          subtitle="Experience the Land of Smiles - from Bangkok's grand palaces to Phi Phi Islands' pristine beaches."
          highlights={thailandHighlightsData}
          stats={thailandStats}
          theme={theme}
          onOpenModal={openModal}
        />

        {/* Tabbed Content */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <DestinationTabbedContent
              itinerary={thailandItineraryData}
              inclusions={thailandInclusionsData}
              exclusions={thailandExclusionsData}
              theme={theme}
              onOpenModal={openModal}
              pageClass="from-blue-50/30 via-cyan-50/20 to-teal-50/30"
              contactFormId={`${theme.destinationId}-contact-form`}
            />
          </div>
        </section>
      </div>

      {/* Know Before You Go Modal */}
      <DestinationKnowBeforeYouGoModal
        key={theme.destinationId}
        isOpen={modalState.isOpen}
        onClose={closeModal}
        initialTab={modalState.tab}
        faqs={thailandFAQs}
        policies={thailandPolicies}
        theme={theme}
        destinationName={theme.destinationName}
        destinationId={theme.destinationId}
      />

      {/* Scroll Progress Indicator */}
      <ScrollProgress color={theme.scrollProgress || "from-blue-600 via-cyan-500 to-teal-600"} height={3} />
    </motion.div>
  );
});

Thailand.displayName = 'Thailand';

export default Thailand;

