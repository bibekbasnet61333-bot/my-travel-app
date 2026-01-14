import { useMemo, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Reusable scroll progress component
import ScrollProgressJapan from '../../components/ui/ScrollProgress';

// Reusable destination components
import DestinationHero from '../../components/destination/DestinationHero';
import DestinationAbout from '../../components/destination/DestinationAbout';
import DestinationTabbedContent from '../../components/destination/DestinationTabbedContent';
import DestinationKnowBeforeYouGoModal from '../../components/destination/DestinationKnowBeforeYouGoModal';

// Gallery navigation utility
import { getGalleryPath } from '../../utils/galleryNavigation';

// Japan data
import {
  japanTheme,
  japanHeroStats,
  japanHighlightsData,
  japanStats,
  japanItineraryData,
  japanInclusionsData,
  japanExclusionsData,
  japanFAQs,
  japanPolicies,
  japanDestinationData
} from '../../data/destinations/japan';



const Japan = () => {
  const navigate = useNavigate();

  // Japan-specific data
  const itinerary = useMemo(() => japanItineraryData, []);
  const inclusions = useMemo(() => japanInclusionsData, []);
  const exclusions = useMemo(() => japanExclusionsData, []);
  const faqs = useMemo(() => japanFAQs, []);
  const policies = useMemo(() => japanPolicies, []);

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
    link.href = '/japan.pdf';
    link.download = 'japan-itinerary.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // View gallery handler - navigates to gallery page using React Router
  const handleViewGallery = useCallback(() => {
    const galleryPath = getGalleryPath('japan');
    if (galleryPath) {
      navigate(galleryPath);
    }
  }, [navigate]);

  // Ensure theme has all required properties
  const theme = {
    ...japanTheme,
    destinationId: japanTheme.destinationId || 'japan',
    backgroundGradient: 'from-pink-50/30 via-rose-50/20 to-pink-50/30',
    headingColor: japanTheme.headingColor || '#9f1239',
    borderColor: japanTheme.borderColor || '#fecdd3',
    accentColor: japanTheme.accentColor || '#db2777',
    titleGradient: japanTheme.titleGradient || 'linear-gradient(to right, #db2777, #fb7185, #f43f5e)',
    primaryGradientClass: japanTheme.primaryGradientClass || 'from-pink-600 to-rose-600',
    secondaryGradientClass: japanTheme.secondaryGradientClass || 'from-pink-500 to-rose-500',
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
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-pink-400/10 to-rose-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-20 w-96 h-96 bg-gradient-to-br from-rose-400/8 to-pink-500/8 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-br from-pink-500/5 to-rose-600/5 rounded-full blur-3xl animate-pulse delay-2000" />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <DestinationHero
          title="Discover Japan"
          subtitle={theme.heroSubtitle}
          backgroundImage={theme.heroImage}
          stats={japanHeroStats}
          theme={theme}
          onDownloadPDF={handleDownloadPDF}
          onViewGallery={handleViewGallery}
          contactFormId="japan-contact-form"
          tourTitle="7 Nights / 8 Days"
          tourSubtitle="Tokyo • Hakone • Fuji • Osaka"
          tourSubtitleColor="#db2777"
          short
        />

        {/* About Section */}
        <DestinationAbout
          title="About Japan"
          subtitle="Experience the Land of the Rising Sun - from Tokyo's neon lights to Kyoto's ancient temples and Mount Fuji's majestic peaks."
          highlights={japanHighlightsData}
          stats={japanStats}
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
              pageClass="from-pink-50/30 via-rose-50/20 to-pink-50/30"
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
        galleryImages={japanDestinationData.galleryImages || []}
      />

      {/* Scroll Progress Indicator */}
      <ScrollProgressJapan />
    </motion.div>
  );
};

export default Japan;

