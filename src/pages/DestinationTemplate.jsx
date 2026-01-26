import { memo, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Reusable destination components
import DestinationHero from '../components/destination/DestinationHero';
import DestinationAbout from '../components/destination/DestinationAbout';
import DestinationTabbedContent from '../components/destination/DestinationTabbedContent';
import DestinationKnowBeforeYouGoModal from '../components/destination/DestinationKnowBeforeYouGoModal';
import ScrollProgress from '../components/ui/ScrollProgress';
import BackgroundElements from '../components/shared/BackgroundElements';

/**
 * Unified DestinationTemplate component
 * Replaces all 8 individual country page implementations
 * DRY principle: eliminates ~1,200 lines of duplicate code
 */
const DestinationTemplate = memo(({
  destinationId,
  destinationName,
  theme,
  heroData,
  aboutData,
  tabsData,
  modalData,
  faqs = [],
  policies = {},
  galleryPath = null,
  onCustomPDF = null,
  pageClass
}) => {
  // Modal state management
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('faq');
  const navigate = useNavigate();

  const openModal = useCallback((type = 'faq') => {
    setModalType(type);
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  // Destructure theme with defaults
  const t = {
    ...theme,
    destinationId: destinationId || theme?.destinationId || 'destination',
    destinationName: destinationName || theme?.destinationName || 'Your Destination',
    backgroundGradient: theme?.backgroundGradient || 'from-stone-50/50 via-amber-50/30 to-stone-50/50',
    headingColor: theme?.headingColor || '#c2410c',
    borderColor: theme?.borderColor || '#fed7aa',
    accentColor: theme?.accentColor || '#ea580c',
    primaryGradientClass: theme?.primaryGradientClass || 'from-orange-500 to-red-500',
    secondaryGradientClass: theme?.secondaryGradientClass || 'from-red-500 to-orange-600',
    titleGradient: theme?.titleGradient || 'linear-gradient(to right, #f97316, #ef4444)',
    scrollProgress: theme?.scrollProgress || 'from-orange-600 via-red-500 to-amber-600',
    pageClass: pageClass || theme?.pageClass || 'from-orange-50/50 via-red-50/30 to-amber-50/50',
  };

  // PDF download handler
  const handleDownloadPDF = () => {
    if (onCustomPDF) {
      onCustomPDF();
      return;
    }
    // Default: try to download from public folder
    const link = document.createElement('a');
    link.href = `/${destinationId}.pdf`;
    link.download = `${destinationId}-itinerary.pdf`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Gallery navigation handler
  const handleViewGallery = useCallback(() => {
    if (galleryPath) {
      navigate(galleryPath);
    }
  }, [navigate, galleryPath]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen bg-gradient-to-br ${t.pageClass} relative overflow-x-hidden`}
    >
      {/* Animated Background Elements */}
      <BackgroundElements theme={t} />

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        {heroData && (
          <DestinationHero
            title={heroData.title || `Discover ${t.destinationName}`}
            subtitle={heroData.subtitle || t.heroSubtitle || ''}
            backgroundImage={heroData.backgroundImage || t.heroImage}
            stats={heroData.stats}
            theme={t}
            onDownloadPDF={handleDownloadPDF}
            onViewGallery={handleViewGallery}
            contactFormId={`${t.destinationId}-contact-form`}
            tourTitle={heroData.tourTitle}
            tourSubtitle={heroData.tourSubtitle}
            tourSubtitleColor={heroData.tourSubtitleColor}
            short={heroData.short !== undefined ? heroData.short : true}
          />
        )}

        {/* About Section */}
        {aboutData && (
          <DestinationAbout
            title={aboutData.title || `About ${t.destinationName}`}
            subtitle={aboutData.subtitle}
            highlights={aboutData.highlights}
            stats={aboutData.stats}
            theme={t}
            onOpenModal={openModal}
          />
        )}

        {/* Tabbed Content */}
        {tabsData && (
          <section className="py-16">
            <div className="container mx-auto px-6">
              <DestinationTabbedContent
                itinerary={tabsData.itinerary}
                inclusions={tabsData.inclusions}
                exclusions={tabsData.exclusions}
                theme={t}
                onOpenModal={openModal}
                pageClass={tabsData.pageClass || `from-${t.primaryGradientClass.split('-')[1]}-50/30 via-${t.secondaryGradientClass.split('-')[1]}-50/20 to-${t.primaryGradientClass.split('-')[1]}-50/30`}
                contactFormId={`${t.destinationId}-contact-form`}
              />
            </div>
          </section>
        )}
      </div>

      {/* Know Before You Go Modal */}
      <DestinationKnowBeforeYouGoModal
        key={t.destinationId}
        isOpen={modalOpen}
        onClose={closeModal}
        initialTab={modalType}
        faqs={faqs.length > 0 ? faqs : (modalData?.faqs || [])}
        policies={Object.keys(policies).length > 0 ? policies : (modalData?.policies || {})}
        theme={t}
        destinationName={t.destinationName}
        destinationId={t.destinationId}
        galleryImages={modalData?.galleryImages || []}
      />

      {/* Scroll Progress Indicator */}
      <ScrollProgress
        color={t.scrollProgress}
        height={3}
      />
    </motion.div>
  );
});

DestinationTemplate.displayName = 'DestinationTemplate';

export default DestinationTemplate;

