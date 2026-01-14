import { useMemo, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ScrollProgressDubai from '../../components/ui/ScrollProgress';
import DestinationHero from '../../components/destination/DestinationHero';
import DestinationAbout from '../../components/destination/DestinationAbout';
import DestinationTabbedContent from '../../components/destination/DestinationTabbedContent';
import DestinationKnowBeforeYouGoModal from '../../components/destination/DestinationKnowBeforeYouGoModal';
import { getGalleryPath } from '../../utils/galleryNavigation';

// Dubai data
import {
  dubaiTheme,
  dubaiHeroStats,
  dubaiHighlightsData,
  dubaiStats,
  dubaiItineraryData,
  dubaiInclusionsData,
  dubaiExclusionsData,
  dubaiFAQs,
  dubaiPolicies,
  dubaiDestinationData
} from '../../data/destinations/dubai';

const Dubai = () => {
  const navigate = useNavigate();

  // Dubai-specific data
  const itinerary = useMemo(() => dubaiItineraryData, []);
  const inclusions = useMemo(() => dubaiInclusionsData, []);
  const exclusions = useMemo(() => dubaiExclusionsData, []);
  const faqs = useMemo(() => dubaiFAQs, []);
  const policies = useMemo(() => dubaiPolicies, []);

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
  const handleDownloadPDF = () => {
    const link = document.createElement('a');
    link.href = '/dubai.pdf';
    link.download = 'dubai-itinerary.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // View gallery handler - navigates to gallery page using React Router
  const handleViewGallery = useCallback(() => {
    const galleryPath = getGalleryPath('dubai');
    if (galleryPath) {
      navigate(galleryPath);
    }
  }, [navigate]);

  // Ensure theme has all required properties
  const theme = {
    ...dubaiTheme,
    destinationId: dubaiTheme.destinationId || 'dubai',
    backgroundGradient: 'from-amber-50/30 via-stone-50/20 to-slate-50/30',
    headingColor: dubaiTheme.headingColor || '#b45309',
    borderColor: dubaiTheme.borderColor || '#fde68a',
    accentColor: dubaiTheme.accentColor || '#ea580c',
    primaryGradientClass: dubaiTheme.primaryGradientClass || 'from-amber-500 to-yellow-500',
    secondaryGradientClass: dubaiTheme.secondaryGradientClass || 'from-stone-600 to-stone-700',
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
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-amber-400/10 to-yellow-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-20 w-96 h-96 bg-gradient-to-br from-yellow-400/8 to-orange-500/8 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-br from-amber-500/5 to-orange-600/5 rounded-full blur-3xl animate-pulse delay-2000" />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <DestinationHero
          title="Discover Dubai"
          subtitle={theme.heroSubtitle}
          backgroundImage={theme.heroImage}
          stats={dubaiHeroStats}
          theme={theme}
          onDownloadPDF={handleDownloadPDF}
          onViewGallery={handleViewGallery}
          contactFormId="dubai-contact-form"
          tourTitle="5 Nights / 6 Days"
          tourSubtitle="Burj Khalifa - Desert Safari - Abu Dhabi - Miracle Garden"
          tourSubtitleColor="#ea580c"
          short
        />

        {/* About Section */}
        <DestinationAbout
          title="About Dubai"
          subtitle="Experience the magic of Dubai with our curated tours, luxury stays, and unforgettable adventures."
          highlights={dubaiHighlightsData}
          stats={dubaiStats}
          theme={theme}
          onOpenModal={openModal}
        />

        {/* Tabbed Content with Side-by-Side Contact Form */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <DestinationTabbedContent
              itinerary={itinerary}
              inclusions={inclusions}
              exclusions={exclusions}
              faqs={faqs}
              policies={policies}
              theme={theme}
              pageClass="from-amber-50/30 via-stone-50/20 to-slate-50/30"
              contactFormId={`${theme.destinationId}-contact-form`}
              onOpenModal={openModal}
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
        galleryImages={dubaiDestinationData.galleryImages || []}
      />

      {/* Scroll Progress Indicator */}
      <ScrollProgressDubai />
    </motion.div>
  );
};

export default Dubai;

