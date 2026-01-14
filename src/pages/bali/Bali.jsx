import { useMemo, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Reusable scroll progress component
import ScrollProgressBali from '../../components/ui/ScrollProgress';

// Reusable destination components
import DestinationHero from '../../components/destination/DestinationHero';
import DestinationAbout from '../../components/destination/DestinationAbout';
import DestinationTabbedContent from '../../components/destination/DestinationTabbedContent';
import DestinationKnowBeforeYouGoModal from '../../components/destination/DestinationKnowBeforeYouGoModal';

// Gallery navigation utility
import { getGalleryPath } from '../../utils/galleryNavigation';

// Bali data
import {
  baliTheme,
  baliHeroStats,
  baliHighlightsData,
  baliStats,
  baliItineraryData,
  baliInclusionsData,
  baliExclusionsData,
  baliFAQs,
  baliPolicies,
  baliDestinationData
} from '../../data/destinations/bali';



const Bali = () => {
  const navigate = useNavigate();

  // Bali-specific data
  const itinerary = useMemo(() => baliItineraryData, []);
  const inclusions = useMemo(() => baliInclusionsData, []);
  const exclusions = useMemo(() => baliExclusionsData, []);
  const faqs = useMemo(() => baliFAQs, []);
  const policies = useMemo(() => baliPolicies, []);

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
    link.href = '/bali.pdf';
    link.download = 'bali-itinerary.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // View gallery handler - navigates to gallery page using React Router
  const handleViewGallery = useCallback(() => {
    const galleryPath = getGalleryPath('bali');
    if (galleryPath) {
      navigate(galleryPath);
    }
  }, [navigate]);

  // Ensure theme has all required properties
  const theme = {
    ...baliTheme,
    destinationId: baliTheme.destinationId || 'bali',
    backgroundGradient: 'from-emerald-50/30 via-teal-50/20 to-cyan-50/30',
    headingColor: baliTheme.headingColor || '#0f766e',
    borderColor: baliTheme.borderColor || '#99f6e4',
    accentColor: baliTheme.accentColor || '#14b8a6',
    primaryGradientClass: baliTheme.primaryGradientClass || 'from-emerald-600 to-teal-600',
    secondaryGradientClass: baliTheme.secondaryGradientClass || 'from-teal-500 to-cyan-500',
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
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-emerald-400/10 to-teal-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-20 w-96 h-96 bg-gradient-to-br from-teal-400/8 to-cyan-500/8 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-br from-emerald-500/5 to-cyan-600/5 rounded-full blur-3xl animate-pulse delay-2000" />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <DestinationHero
          title="Discover Bali"
          subtitle={theme.heroSubtitle}
          backgroundImage={theme.heroImage}
          stats={baliHeroStats}
          theme={theme}
          onDownloadPDF={handleDownloadPDF}
          onViewGallery={handleViewGallery}
          contactFormId="bali-contact-form"
          tourTitle="5 Nights / 6 Days"
          tourSubtitle="Handara Gate - Ubud - Tanah Lot - Uluwatu - Kintamani"
          tourSubtitleColor="#14b8a6"
          short
        />

        {/* About Section */}
        <DestinationAbout
          title="About Bali"
          subtitle="Experience the enchanting beauty of Bali - from sacred temples and volcanic landscapes to pristine beaches and vibrant cultural experiences."
          highlights={baliHighlightsData}
          stats={baliStats}
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
              pageClass="from-emerald-50/30 via-teal-50/20 to-cyan-50/30"
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
        galleryImages={baliDestinationData.galleryImages || []}
      />

      {/* Scroll Progress Indicator */}
      <ScrollProgressBali />
    </motion.div>
  );
};

export default Bali;

