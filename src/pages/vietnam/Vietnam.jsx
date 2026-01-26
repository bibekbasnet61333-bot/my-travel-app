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

// Vietnam data
import {
  vietnamTheme,
  vietnamHeroStats,
  vietnamHighlightsData,
  vietnamStats,
  vietnamItineraryData,
  vietnamInclusionsData,
  vietnamExclusionsData,
  vietnamFAQs,
  vietnamPolicies
} from '../../data/destinations/vietnam';

/**
 * Vietnam destination page
 * Uses useDestinationPage hook for consolidated logic
 */
const Vietnam = memo(() => {
  // Use shared hook for modal state and handlers
  const {
    modalState,
    openModal,
    closeModal,
    handleDownloadPDF,
    handleViewGallery
  } = useDestinationPage({
    destinationId: 'vietnam',
    theme: vietnamTheme,
    faqs: vietnamFAQs,
    policies: vietnamPolicies,
    galleryPath: '/gallery/vietnam'
  });

  // Ensure theme has all required properties
  const theme = {
    ...vietnamTheme,
    destinationId: vietnamTheme.destinationId || 'vietnam',
    backgroundGradient: 'from-teal-50/30 via-emerald-50/20 to-green-50/30',
    headingColor: vietnamTheme.headingColor || '#0f766e',
    borderColor: vietnamTheme.borderColor || '#a7f3d0',
    accentColor: vietnamTheme.accentColor || '#10b981',
    primaryGradientClass: vietnamTheme.primaryGradientClass || 'from-teal-600 to-emerald-600',
    secondaryGradientClass: vietnamTheme.secondaryGradientClass || 'from-emerald-500 to-green-500',
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
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-teal-400/10 to-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-20 w-96 h-96 bg-gradient-to-br from-emerald-400/8 to-green-500/8 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-br from-teal-500/5 to-green-600/5 rounded-full blur-3xl animate-pulse delay-2000" />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <DestinationHero
          title="Discover Vietnam"
          subtitle={theme.heroSubtitle}
          backgroundImage={theme.heroImage}
          stats={vietnamHeroStats}
          theme={theme}
          onDownloadPDF={handleDownloadPDF}
          onViewGallery={handleViewGallery}
          contactFormId="vietnam-contact-form"
          tourTitle="9 Nights / 10 Days"
          tourSubtitle="Hanoi - Ha Long Bay - Da Nang - Hoi An - Phu Quoc"
          tourSubtitleColor="#10b981"
          short
        />

        {/* About Section */}
        <DestinationAbout
          title="About Vietnam"
          subtitle="Experience the enchanting beauty of Vietnam - from Ha Long Bay's limestone karsts to Hoi An's ancient streets."
          highlights={vietnamHighlightsData}
          stats={vietnamStats}
          theme={theme}
          onOpenModal={openModal}
        />

        {/* Tabbed Content */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <DestinationTabbedContent
              itinerary={vietnamItineraryData}
              inclusions={vietnamInclusionsData}
              exclusions={vietnamExclusionsData}
              theme={theme}
              onOpenModal={openModal}
              pageClass="from-teal-50/30 via-emerald-50/20 to-green-50/30"
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
        faqs={vietnamFAQs}
        policies={vietnamPolicies}
        theme={theme}
        destinationName={theme.destinationName}
        destinationId={theme.destinationId}
      />

      {/* Scroll Progress Indicator */}
      <ScrollProgress color={theme.scrollProgress || "from-teal-600 via-emerald-500 to-green-600"} height={3} />
    </motion.div>
  );
});

Vietnam.displayName = 'Vietnam';

export default Vietnam;

