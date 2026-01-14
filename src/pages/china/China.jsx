
import { useMemo, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Reusable scroll progress component
import ScrollProgressChina from '../../components/ui/ScrollProgress';

// Reusable destination components
import DestinationHero from '../../components/destination/DestinationHero';
import DestinationAbout from '../../components/destination/DestinationAbout';
import DestinationTabbedContentWithSidebar from '../../components/destination/DestinationTabbedContentWithSidebar';
import DestinationKnowBeforeYouGoModal from '../../components/destination/DestinationKnowBeforeYouGoModal';

// Gallery navigation utility
import { getGalleryPath } from '../../utils/galleryNavigation';

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
  chinaPolicies,
  chinaDestinationData
} from '../../data/destinations/china';



const China = () => {
  const navigate = useNavigate();

  // China-specific data
  const itinerary = useMemo(() => chinaItineraryData, []);
  const inclusions = useMemo(() => chinaInclusionsData, []);
  const exclusions = useMemo(() => chinaExclusionsData, []);
  const faqs = useMemo(() => chinaFAQs, []);
  const policies = useMemo(() => chinaPolicies, []);

  // Modal state
  const [modalState, setModalState] = useState({ isOpen: false, type: null, tab: 'faq' });

  // Modal handlers
  const openModal = useCallback((type) => {
    let initialTab = 'faq';
    if (type === 'policies') {
      initialTab = 'policies';
    }
    setModalState({ isOpen: true, type, tab: initialTab });
  }, []);

  const closeModal = useCallback(() => {
    setModalState({ isOpen: false, type: null, tab: 'faq' });
  }, []);

  // PDF download handler
  const handleDownloadPDF = useCallback(() => {
    const link = document.createElement('a');
    link.href = '/china.pdf';
    link.download = 'china-itinerary.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  // View Gallery handler - navigates to gallery page using React Router
  const handleViewGallery = useCallback(() => {
    const galleryPath = getGalleryPath('china');
    if (galleryPath) {
      navigate(galleryPath);
    }
  }, [navigate]);

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
          tourSubtitle="Kunming • Shanghai • Beijing"
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

        {/* Tabbed Content with Sidebar - 2 Column Layout */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <DestinationTabbedContentWithSidebar
              itinerary={itinerary}
              inclusions={inclusions}
              exclusions={exclusions}
              faqs={faqs}
              policies={policies}
              theme={theme}
              onOpenModal={openModal}
              destinationId="china"
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
        faqs={faqs}
        policies={policies}
        theme={theme}
        destinationName={theme.destinationName}
        destinationId={theme.destinationId}
        galleryImages={chinaDestinationData.galleryImages || []}
      />

      {/* Scroll Progress Indicator */}
      <ScrollProgressChina />
    </motion.div>
  );
};

export default China;

