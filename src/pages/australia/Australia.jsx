import { useMemo, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Reusable scroll progress component
import ScrollProgressAustralia from '../../components/ui/ScrollProgress';

// Reusable destination components
import DestinationHero from '../../components/destination/DestinationHero';
import DestinationAbout from '../../components/destination/DestinationAbout';
import DestinationTabbedContent from '../../components/destination/DestinationTabbedContent';
import DestinationKnowBeforeYouGoModal from '../../components/destination/DestinationKnowBeforeYouGoModal';

// Gallery navigation utility
import { getGalleryPath } from '../../utils/galleryNavigation';

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
  australiaPolicies,
  australiaDestinationData
} from '../../data/destinations/australia';



const Australia = () => {
  const navigate = useNavigate();

  // Australia-specific data
  const itinerary = useMemo(() => australiaItineraryData, []);
  const inclusions = useMemo(() => australiaInclusionsData, []);
  const exclusions = useMemo(() => australiaExclusionsData, []);
  const faqs = useMemo(() => australiaFAQs, []);
  const policies = useMemo(() => australiaPolicies, []);

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
    link.href = '/australia.pdf';
    link.download = 'australia-itinerary.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // View gallery handler - navigates to gallery page using React Router
  const handleViewGallery = useCallback(() => {
    const galleryPath = getGalleryPath('australia');
    if (galleryPath) {
      navigate(galleryPath);
    }
  }, [navigate]);

  // Ensure theme has all required properties
  const theme = {
    ...australiaTheme,
    destinationId: australiaTheme.destinationId || 'australia',
    backgroundGradient: 'from-indigo-50/30 via-blue-50/20 to-cyan-50/30',
    headingColor: australiaTheme.headingColor || '#1e3a8a',
    borderColor: australiaTheme.borderColor || '#a5b4fc',
    accentColor: australiaTheme.accentColor || '#0ea5e9',
    primaryGradientClass: australiaTheme.primaryGradientClass || 'from-indigo-600 to-blue-600',
    secondaryGradientClass: australiaTheme.secondaryGradientClass || 'from-blue-500 to-cyan-500',
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
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-indigo-400/10 to-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-20 w-96 h-96 bg-gradient-to-br from-blue-400/8 to-cyan-500/8 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-br from-indigo-500/5 to-cyan-600/5 rounded-full blur-3xl animate-pulse delay-2000" />
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
          tourSubtitle="10 Days / 9 Nights - Melbourne, Gold Coast & Sydney"
          tourSubtitleColor={theme.accentColor}
          short
        />

        {/* About Section */}
        <DestinationAbout
          title="About Australia"
          subtitle="Experience the magic of Australia as you journey through Melbourne, Gold Coast, and Sydney. From the Great Ocean Road to the Sydney Opera House, discover a land of stunning beauty and unforgettable adventures."
          highlights={australiaHighlightsData}
          stats={australiaStats}
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
              pageClass={theme.backgroundGradient}
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
        galleryImages={australiaDestinationData.galleryImages || []}
      />

      {/* Scroll Progress Indicator */}
      <ScrollProgressAustralia />
    </motion.div>
  );
};

export default Australia;

