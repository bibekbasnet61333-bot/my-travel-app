import { useMemo, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Reusable scroll progress component
import ScrollProgressVietnam from '../../components/ui/ScrollProgress';

// Reusable destination components
import DestinationHero from '../../components/destination/DestinationHero';
import DestinationAbout from '../../components/destination/DestinationAbout';
import DestinationTabbedContent from '../../components/destination/DestinationTabbedContent';
import DestinationKnowBeforeYouGoModal from '../../components/destination/DestinationKnowBeforeYouGoModal';

// Gallery navigation utility
import { getGalleryPath } from '../../utils/galleryNavigation';

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
  vietnamPolicies,
  vietnamDestinationData
} from '../../data/destinations/vietnam';



const Vietnam = () => {
  const navigate = useNavigate();

  // Vietnam-specific data
  const itinerary = useMemo(() => vietnamItineraryData, []);
  const inclusions = useMemo(() => vietnamInclusionsData, []);
  const exclusions = useMemo(() => vietnamExclusionsData, []);
  const faqs = useMemo(() => vietnamFAQs, []);
  const policies = useMemo(() => vietnamPolicies, []);

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
    link.href = '/vietnam.pdf';
    link.download = 'vietnam-itinerary.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // View gallery handler - navigates to gallery page using React Router
  const handleViewGallery = useCallback(() => {
    const galleryPath = getGalleryPath('vietnam');
    if (galleryPath) {
      navigate(galleryPath);
    }
  }, [navigate]);

  // Ensure theme has all required properties
  const theme = {
    ...vietnamTheme,
    destinationId: vietnamTheme.destinationId || 'vietnam',
    backgroundGradient: 'from-teal-50/30 via-emerald-50/20 to-green-50/30',
    headingColor: vietnamTheme.headingColor || '#0f766e',
    borderColor: vietnamTheme.borderColor || '#99f6e4',
    accentColor: vietnamTheme.accentColor || '#14b8a6',
    titleGradient: vietnamTheme.titleGradient || 'linear-gradient(to right, #0d9488, #14b8a6)',
    primaryGradientClass: vietnamTheme.primaryGradientClass || 'from-teal-600 to-emerald-600',
    secondaryGradientClass: vietnamTheme.secondaryGradientClass || 'from-teal-500 to-green-500',
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
        <div className="absolute top-1/3 right-20 w-96 h-96 bg-gradient-to-br from-emerald-400/8 to-teal-500/8 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-br from-teal-500/5 to-emerald-600/5 rounded-full blur-3xl animate-pulse delay-2000" />
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
          tourSubtitle="Hanoi • Ha Long Bay • Da Nang • Hoi An • Phu Quoc"
          tourSubtitleColor="#14b8a6"
          short
        />

        {/* About Section */}
        <DestinationAbout
          title="About Vietnam"
          subtitle="Experience the enchanting beauty of Vietnam - from Ha Long Bay's limestone karsts to the golden bridge of Ba Na Hills."
          highlights={vietnamHighlightsData}
          stats={vietnamStats}
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
              pageClass="from-teal-50/30 via-emerald-50/20 to-green-50/30"
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
        galleryImages={[]}
      />

      {/* Scroll Progress Indicator */}
      <ScrollProgressVietnam />
    </motion.div>
  );
};

export default Vietnam;

