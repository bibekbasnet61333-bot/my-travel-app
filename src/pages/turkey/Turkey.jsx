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

// Turkey data
import {
  turkeyTheme,
  turkeyHeroStats,
  turkeyHighlightsData,
  turkeyItineraryData,
  turkeyInclusionsData,
  turkeyExclusionsData,
  turkeyFAQs,
  turkeyPolicies
} from '../../data/destinations/turkey';

/**
 * Turkey destination page
 * Uses useDestinationPage hook for consolidated logic
 */
const Turkey = memo(() => {
  // Use shared hook for modal state and handlers
  const {
    modalState,
    openModal,
    closeModal,
    handleDownloadPDF,
    handleViewGallery
  } = useDestinationPage({
    destinationId: 'turkey',
    theme: turkeyTheme,
    faqs: turkeyFAQs,
    policies: turkeyPolicies,
    galleryPath: '/gallery/turkey'
  });

  // Ensure theme has all required properties
  const theme = {
    ...turkeyTheme,
    destinationId: turkeyTheme.destinationId || 'turkey',
    backgroundGradient: 'from-violet-50/30 via-purple-50/20 to-fuchsia-50/30',
    headingColor: turkeyTheme.headingColor || '#7c3aed',
    borderColor: turkeyTheme.borderColor || '#e9d5ff',
    accentColor: turkeyTheme.accentColor || '#8b5cf6',
    primaryGradientClass: turkeyTheme.primaryGradientClass || 'from-violet-600 to-purple-600',
    secondaryGradientClass: turkeyTheme.secondaryGradientClass || 'from-purple-500 to-fuchsia-500',
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
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-violet-400/10 to-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-20 w-96 h-96 bg-gradient-to-br from-purple-400/8 to-fuchsia-500/8 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-br from-violet-500/5 to-fuchsia-600/5 rounded-full blur-3xl animate-pulse delay-2000" />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <DestinationHero
          title="Discover Turkey"
          subtitle={theme.heroSubtitle}
          backgroundImage={theme.heroImage}
          stats={turkeyHeroStats}
          theme={theme}
          onDownloadPDF={handleDownloadPDF}
          onViewGallery={handleViewGallery}
          contactFormId="turkey-contact-form"
          tourTitle="4 Nights / 5 Days"
          tourSubtitle="The Magic of Istanbul"
          tourSubtitleColor="#8b5cf6"
          short
        />

        {/* About Section */}
        <DestinationAbout
          title="About Turkey"
          subtitle="Experience the magic of Istanbul - where East meets West, and history comes alive."
          highlights={turkeyHighlightsData}
          theme={theme}
          onOpenModal={openModal}
        />

        {/* Tabbed Content */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <DestinationTabbedContent
              itinerary={turkeyItineraryData}
              inclusions={turkeyInclusionsData}
              exclusions={turkeyExclusionsData}
              theme={theme}
              onOpenModal={openModal}
              pageClass="from-violet-50/30 via-purple-50/20 to-fuchsia-50/30"
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
        faqs={turkeyFAQs}
        policies={turkeyPolicies}
        theme={theme}
        destinationName={theme.destinationName}
        destinationId={theme.destinationId}
      />

      {/* Scroll Progress Indicator */}
      <ScrollProgress color={theme.scrollProgress || "from-violet-600 via-purple-500 to-fuchsia-600"} height={3} />
    </motion.div>
  );
});

Turkey.displayName = 'Turkey';

export default Turkey;

