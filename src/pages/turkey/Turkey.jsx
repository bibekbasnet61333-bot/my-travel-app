import { useMemo, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Clock, Moon, Camera, Star } from 'lucide-react';

// Reusable scroll progress component
import ScrollProgressTurkey from '../../components/ui/ScrollProgress';

// Reusable destination components
import DestinationHero from '../../components/destination/DestinationHero';
import DestinationAbout from '../../components/destination/DestinationAbout';
import DestinationTabbedContent from '../../components/destination/DestinationTabbedContent';
import DestinationKnowBeforeYouGoModal from '../../components/destination/DestinationKnowBeforeYouGoModal';

// Gallery navigation utility
import { getGalleryPath } from '../../utils/galleryNavigation';

// Turkey data
import {
  turkeyTheme,
  turkeyHeroStats,
  turkeyHighlightsData,
  turkeyItineraryData,
  turkeyInclusionsData,
  turkeyExclusionsData,
  turkeyFAQs,
  turkeyPolicies,
  turkeyData
} from '../../data/destinations/turkey';

const Turkey = () => {
  const navigate = useNavigate();

  // Turkey-specific data
  const itinerary = useMemo(() => turkeyItineraryData, []);
  const inclusions = useMemo(() => turkeyInclusionsData, []);
  const exclusions = useMemo(() => turkeyExclusionsData, []);
  const faqs = useMemo(() => turkeyFAQs, []);
  const policies = useMemo(() => turkeyPolicies, []);

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
    link.href = '/turkey.pdf';
    link.download = 'turkey-itinerary.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // View gallery handler - navigates to gallery page using React Router
  const handleViewGallery = useCallback(() => {
    const galleryPath = getGalleryPath('turkey');
    if (galleryPath) {
      navigate(galleryPath);
    }
  }, [navigate]);

  // Ensure theme has all required properties
  const theme = {
    ...turkeyTheme,
    destinationId: turkeyTheme.destinationId || 'turkey',
    backgroundGradient: 'from-violet-50/30 via-purple-50/20 to-fuchsia-50/30',
    headingColor: turkeyTheme.headingColor || '#6d28d9',
    borderColor: turkeyTheme.borderColor || '#ddd6fe',
    accentColor: turkeyTheme.accentColor || '#7c3aed',
    titleGradient: turkeyTheme.titleGradient || 'linear-gradient(to right, #7c3aed, #a855f7)',
    primaryGradientClass: turkeyTheme.primaryGradientClass || 'from-violet-600 to-purple-600',
    secondaryGradientClass: turkeyTheme.secondaryGradientClass || 'from-violet-500 to-fuchsia-500',
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
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-br from-violet-500/5 to-purple-600/5 rounded-full blur-3xl animate-pulse delay-2000" />
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
          tourTitle="Istanbul Adventure"
          tourSubtitle="5 Days / 4 Nights - The Magic of Istanbul"
          tourSubtitleColor={theme.accentColor}
          short
        />

        {/* About Section */}
        <DestinationAbout
          title="About Turkey"
          subtitle="Experience the magic of Istanbul - where East meets West. From the majestic Hagia Sophia to the stunning Blue Mosque, cruise the Bosphorus and explore ancient palaces. A perfect blend of history, culture, and modern elegance awaits you."
          highlights={turkeyHighlightsData}
          stats={[
            { value: '5', label: 'Days', icon: Clock },
            { value: '4', label: 'Nights', icon: Moon },
            { value: '4', label: 'Tours', icon: Camera },
            { value: '4-Star', label: 'Hotels', icon: Star },
          ]}
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
        galleryImages={turkeyData.galleryImages || []}
      />

      {/* Scroll Progress Indicator */}
      <ScrollProgressTurkey />
    </motion.div>
  );
};

export default Turkey;

