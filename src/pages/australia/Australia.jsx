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

// Australia data
import {
  australiaTheme,
  australiaHeroStats,
  australiaHighlightsData,
  australiaStats,
  australiaItineraryData,
  australiaInclusionsData,
  australiaExclusionsData,
  australiaFAQs,
  australiaPolicies
} from '../../data/destinations/australia';

/**
 * Australia destination page
 * Uses useDestinationPage hook for consolidated logic
 */
const Australia = memo(() => {
  // Use shared hook for modal state and handlers
  const {
    modalState,
    openModal,
    closeModal,
    handleDownloadPDF,
    handleViewGallery
  } = useDestinationPage({
    destinationId: 'australia',
    theme: australiaTheme,
    faqs: australiaFAQs,
    policies: australiaPolicies,
    galleryPath: '/gallery/australia'
  });

  // Ensure theme has all required properties
  const theme = {
    ...australiaTheme,
    destinationId: australiaTheme.destinationId || 'australia',
    backgroundGradient: 'from-amber-50/30 via-orange-50/20 to-red-50/30',
    headingColor: australiaTheme.headingColor || '#c2410c',
    borderColor: australiaTheme.borderColor || '#fed7aa',
    accentColor: australiaTheme.accentColor || '#ea580c',
    primaryGradientClass: australiaTheme.primaryGradientClass || 'from-amber-600 to-orange-600',
    secondaryGradientClass: australiaTheme.secondaryGradientClass || 'from-orange-500 to-red-500',
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
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-amber-400/10 to-orange-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-20 w-96 h-96 bg-gradient-to-br from-orange-400/8 to-red-500/8 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-br from-amber-500/5 to-red-600/5 rounded-full blur-3xl animate-pulse delay-2000" />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <DestinationHero
          title="Discover Australia"
          subtitle={theme.heroSubtitle}
          backgroundImage={theme.heroImage}
          stats={australiaHeroStats}
          theme={theme}
          onDownloadPDF={handleDownloadPDF}
          onViewGallery={handleViewGallery}
          contactFormId="australia-contact-form"
          tourTitle="10 Days / 9 Nights"
          tourSubtitle="Melbourne, Gold Coast & Sydney"
          tourSubtitleColor="#ea580c"
          short
        />

        {/* About Section */}
        <DestinationAbout
          title="About Australia"
          subtitle="Experience the magic of Melbourne, Gold Coast & Sydney on an unforgettable Australian adventure."
          highlights={australiaHighlightsData}
          stats={australiaStats}
          theme={theme}
          onOpenModal={openModal}
        />

        {/* Tabbed Content */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <DestinationTabbedContent
              itinerary={australiaItineraryData}
              inclusions={australiaInclusionsData}
              exclusions={australiaExclusionsData}
              theme={theme}
              onOpenModal={openModal}
              pageClass="from-amber-50/30 via-orange-50/20 to-red-50/30"
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
        faqs={australiaFAQs}
        policies={australiaPolicies}
        theme={theme}
        destinationName={theme.destinationName}
        destinationId={theme.destinationId}
      />

      {/* Scroll Progress Indicator */}
      <ScrollProgress color={theme.scrollProgress || "from-amber-600 via-orange-500 to-red-600"} height={3} />
    </motion.div>
  );
});

Australia.displayName = 'Australia';

export default Australia;

