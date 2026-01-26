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

// China data
import {
  chinaTheme,
  chinaHeroStats,
  chinaHighlightsData,
  chinaStats,
  chinaItineraryData,
  chinaInclusionsData,
  chinaExclusionsData,
  chinaFAQs,
  chinaPolicies
} from '../../data/destinations/china';

/**
 * China destination page
 * Uses useDestinationPage hook for consolidated logic
 */
const China = memo(() => {
  // Use shared hook for modal state and handlers
  const {
    modalState,
    activeTab,
    openModal,
    closeModal,
    handleDownloadPDF,
    handleViewGallery
  } = useDestinationPage({
    destinationId: 'china',
    theme: chinaTheme,
    faqs: chinaFAQs,
    policies: chinaPolicies,
    galleryPath: '/gallery/china'
  });

  // Ensure theme has all required properties
  const theme = {
    ...chinaTheme,
    destinationId: chinaTheme.destinationId || 'china',
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
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-orange-400/10 to-red-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-20 w-96 h-96 bg-gradient-to-br from-red-400/8 to-orange-500/8 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-br from-orange-500/5 to-red-600/5 rounded-full blur-3xl animate-pulse delay-2000" />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <DestinationHero
          title="Discover China"
          subtitle={theme.heroSubtitle}
          backgroundImage={theme.heroImage}
          stats={chinaHeroStats}
          theme={theme}
          onDownloadPDF={handleDownloadPDF}
          onViewGallery={handleViewGallery}
          contactFormId="china-contact-form"
          tourTitle="7 Nights / 8 Days"
          tourSubtitle="Kunming - Shanghai - Beijing"
          tourSubtitleColor="#ef4444"
          short
        />

        {/* About Section */}
        <DestinationAbout
          title="About China"
          subtitle="Discover the world's oldest continuous civilization, from ancient dynasties to modern marvels. China offers a perfect blend of historical treasures and contemporary wonders."
          highlights={chinaHighlightsData}
          stats={chinaStats}
          theme={theme}
          onOpenModal={openModal}
        />

        {/* Tabbed Content */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <DestinationTabbedContent
              itinerary={chinaItineraryData}
              inclusions={chinaInclusionsData}
              exclusions={chinaExclusionsData}
              theme={theme}
              onOpenModal={openModal}
              pageClass="from-orange-50/50 via-red-50/30 to-amber-50/50"
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
        faqs={chinaFAQs}
        policies={chinaPolicies}
        theme={theme}
        destinationName={theme.destinationName}
        destinationId={theme.destinationId}
      />

      {/* Scroll Progress Indicator */}
      <ScrollProgress color={theme.scrollProgress || "from-orange-600 via-red-500 to-amber-600"} height={3} />
    </motion.div>
  );
});

China.displayName = 'China';

export default China;

