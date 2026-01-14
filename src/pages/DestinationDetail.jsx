import { useMemo, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
// Reusable scroll progress component
import ScrollProgress from '../components/ui/ScrollProgress';
// Generic destination components
import DestinationHero from '../components/destination/DestinationHero';
import DestinationAbout from '../components/destination/DestinationAbout';
import DestinationTabbedContent from '../components/destination/DestinationTabbedContent';
import DestinationKnowBeforeYouGoModal from '../components/destination/DestinationKnowBeforeYouGoModal';

// China destination data
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
} from '../data/destinations/china';

// Thailand destination data
import {
  thailandTheme,
  thailandHeroStats,
  thailandHighlightsData,
  thailandStats,
  thailandItineraryData,
  thailandInclusionsData,
  thailandExclusionsData,
  thailandFAQs,
  thailandPolicies
} from '../data/destinations/thailand';

// Vietnam destination data
import {
  vietnamTheme,
  vietnamHeroStats,
  vietnamHighlightsData,
  vietnamStats,
  vietnamItineraryData,
  vietnamInclusionsData,
  vietnamExclusionsData,
  vietnamFAQs,
  vietnamPolicies
} from '../data/destinations/vietnam';

// Dubai destination data
import {
  dubaiTheme,
  dubaiHeroStats,
  dubaiHighlightsData,
  dubaiStats,
  dubaiItineraryData,
  dubaiInclusionsData,
  dubaiExclusionsData,
  dubaiFAQs,
  dubaiPolicies
} from '../data/destinations/dubai';

// Bali destination data
import {
  baliTheme,
  baliHeroStats,
  baliHighlightsData,
  baliStats,
  baliItineraryData,
  baliInclusionsData,
  baliExclusionsData,
  baliFAQs,
  baliPolicies
} from '../data/destinations/bali';

// Australia destination data
import {
  australiaTheme,
  australiaHeroStats,
  australiaHighlightsData,
  australiaStats,
  australiaItineraryData,
  australiaInclusionsData,
  australiaExclusionsData,
  australiaFAQs,
  australiaPolicies
} from '../data/destinations/australia';

// Turkey destination data
import {
  turkeyTheme,
  turkeyHeroStats,
  turkeyHighlightsData,
  turkeyItineraryData,
  turkeyInclusionsData,
  turkeyExclusionsData,
  turkeyFAQs,
  turkeyPolicies
} from '../data/destinations/turkey';

// Tour duration config
const TOUR_DURATIONS = {
  vietnam: { nights: 9, days: 10 },
  china: { nights: 7, days: 8 },
  thailand: { nights: 7, days: 8 },
  dubai: { nights: 5, days: 6 },
  bali: { nights: 5, days: 6 },
  australia: { nights: 9, days: 10 },
  turkey: { nights: 4, days: 5 }
};

// Tour subtitle config
const TOUR_SUBTITLES = {
  vietnam: 'Hanoi – Ha Long Bay – Da Nang – Hoi An – Phu Quoc',
  china: 'Kunming – Shanghai – Beijing',
  thailand: 'Bangkok – Phuket – Chiang Mai',
  dubai: 'Dubai Tour Package',
  bali: 'Experience the enchanting beauty of Bali',
  australia: 'Melbourne, Gold Coast & Sydney',
  turkey: 'The Magic of Istanbul'
};

// Destination data map
const DESTINATION_DATA_MAP = {
  china: {
    theme: chinaTheme,
    heroStats: chinaHeroStats,
    highlights: chinaHighlightsData,
    stats: chinaStats,
    itinerary: chinaItineraryData,
    inclusions: chinaInclusionsData,
    exclusions: chinaExclusionsData,
    faqs: chinaFAQs,
    policies: chinaPolicies,
    title: 'Discover China',
    subtitle: 'Experience 5,000 years of history, from the Great Wall to modern Shanghai.',
    aboutTitle: 'About China',
    aboutSubtitle: 'Discover the world\'s oldest continuous civilization.',
    pageClass: 'from-red-50/50 via-amber-50/30 to-orange-50/50',
    destinationId: 'china'
  },
  thailand: {
    theme: thailandTheme,
    heroStats: thailandHeroStats,
    highlights: thailandHighlightsData,
    stats: thailandStats,
    itinerary: thailandItineraryData,
    inclusions: thailandInclusionsData,
    exclusions: thailandExclusionsData,
    faqs: thailandFAQs,
    policies: thailandPolicies,
    title: 'Discover Thailand',
    subtitle: 'Experience the Land of Smiles - from Bangkok\'s grand palaces.',
    aboutTitle: 'About Thailand',
    aboutSubtitle: 'Discover the Land of Smiles, where ancient temples meet tropical paradise.',
    pageClass: 'from-blue-50/50 via-cyan-50/30 to-teal-50/50',
    destinationId: 'thailand'
  },
  vietnam: {
    theme: vietnamTheme,
    heroStats: vietnamHeroStats,
    highlights: vietnamHighlightsData,
    stats: vietnamStats,
    itinerary: vietnamItineraryData,
    inclusions: vietnamInclusionsData,
    exclusions: vietnamExclusionsData,
    faqs: vietnamFAQs,
    policies: vietnamPolicies,
    title: 'Discover Vietnam',
    subtitle: 'Experience the enchanting beauty of Vietnam - from Ha Long Bay\'s limestone karsts.',
    aboutTitle: 'About Vietnam',
    aboutSubtitle: 'Discover a land of breathtaking natural beauty, rich history, and vibrant culture.',
    pageClass: 'from-teal-50/50 via-emerald-50/30 to-green-50/50',
    destinationId: 'vietnam'
  },
  dubai: {
    theme: dubaiTheme,
    heroStats: dubaiHeroStats,
    highlights: dubaiHighlightsData,
    stats: dubaiStats,
    itinerary: dubaiItineraryData,
    inclusions: dubaiInclusionsData,
    exclusions: dubaiExclusionsData,
    faqs: dubaiFAQs,
    policies: dubaiPolicies,
    title: 'Discover Dubai',
    subtitle: 'Experience the magic of Dubai with our curated tours, luxury stays, and unforgettable adventures.',
    aboutTitle: 'About Dubai',
    aboutSubtitle: 'A futuristic destination blending iconic architecture, luxury lifestyle, and cultural diversity.',
    pageClass: 'from-amber-50/50 via-stone-50/30 to-slate-50/50',
    destinationId: 'dubai'
  },
  bali: {
    theme: baliTheme,
    heroStats: baliHeroStats,
    highlights: baliHighlightsData,
    stats: baliStats,
    itinerary: baliItineraryData,
    inclusions: baliInclusionsData,
    exclusions: baliExclusionsData,
    faqs: baliFAQs,
    policies: baliPolicies,
    title: 'Discover Bali',
    subtitle: 'Experience the enchanting beauty of Bali - from sacred temples and volcanic landscapes to pristine beaches.',
    aboutTitle: 'About Bali',
    aboutSubtitle: 'Discover the Island of the Gods, where ancient traditions meet tropical paradise.',
    pageClass: 'from-emerald-50/50 via-teal-50/30 to-cyan-50/50',
    destinationId: 'bali'
  },
  australia: {
    theme: australiaTheme,
    heroStats: australiaHeroStats,
    highlights: australiaHighlightsData,
    stats: australiaStats,
    itinerary: australiaItineraryData,
    inclusions: australiaInclusionsData,
    exclusions: australiaExclusionsData,
    faqs: australiaFAQs,
    policies: australiaPolicies,
    title: 'Discover Australia',
    subtitle: 'Experience the magic of Melbourne, Gold Coast & Sydney on an unforgettable Australian adventure.',
    aboutTitle: 'About Australia',
    aboutSubtitle: 'Discover the Land Down Under - from stunning beaches to vibrant cities.',
    pageClass: 'from-amber-50/50 via-orange-50/30 to-red-50/50',
    destinationId: 'australia'
  },
  turkey: {
    theme: turkeyTheme,
    heroStats: turkeyHeroStats,
    highlights: turkeyHighlightsData,
    itinerary: turkeyItineraryData,
    inclusions: turkeyInclusionsData,
    exclusions: turkeyExclusionsData,
    faqs: turkeyFAQs,
    policies: turkeyPolicies,
    title: 'Discover Turkey',
    subtitle: 'Experience the magic of Istanbul - where East meets West.',
    aboutTitle: 'About Turkey',
    aboutSubtitle: 'A perfect blend of history, culture, and modern elegance awaits you.',
    pageClass: 'from-violet-50/50 via-purple-50/30 to-fuchsia-50/50',
    destinationId: 'turkey'
  }
};

// Helper functions
const getTourTitle = (destinationId) => {
  const duration = TOUR_DURATIONS[destinationId];
  if (!destinationId || !duration) return '';
  return `${duration.nights} Nights / ${duration.days} Days – ${destinationId.charAt(0).toUpperCase() + destinationId.slice(1)}`;
};

const getTourSubtitle = (destinationId) => TOUR_SUBTITLES[destinationId] || '';

const DestinationDetail = () => {
  const { slug } = useParams();

  // Memoize tour info
  const tourInfo = useMemo(() => ({
    tourTitle: getTourTitle(slug),
    tourSubtitle: getTourSubtitle(slug)
  }), [slug]);

  // Modal state
  const [modalState, setModalState] = useState({ isOpen: false, type: null, tab: 'faq' });

// Modal handlers
  const openModal = useCallback((type) => {
    setModalState({
      isOpen: true,
      type,
      tab: type === 'policies' ? 'policies' : 'faq'
    });
  }, []);

  const closeModal = useCallback(() => {
    setModalState(prev => ({ ...prev, isOpen: false, type: null, tab: 'faq' }));
  }, []);

  // Memoize destination data lookup
  const destData = useMemo(() => {
    if (slug && DESTINATION_DATA_MAP[slug]) {
      return DESTINATION_DATA_MAP[slug];
    }
    return DESTINATION_DATA_MAP.china;
  }, [slug]);

  // PDF download handler
  const handleDownloadPDF = useCallback((e) => {
    e?.preventDefault();
    const link = document.createElement('a');
    link.href = `/${destData.destinationId}.pdf`;
    link.download = `${destData.destinationId}-itinerary.pdf`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [destData.destinationId]);

// View Gallery handler - navigates to gallery page if supported

  // Generate animated background classes once
  const backgroundElements = useMemo(() => {
    const t = destData.theme;
    return {
      element1: `${t.primaryGradientClass.replace('from-', '').replace(' to-', '/10 to-')}`,
      element2: `${t.secondaryGradientClass.replace('from-', '').replace(' to-', '/8 to-')}`,
      element3: `${t.primaryGradientClass.split(' ')[0]}-500/5 to-${t.primaryGradientClass.split(' ')[2]}-600/5`
    };
  }, [destData.theme]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen bg-gradient-to-br ${destData.pageClass} relative overflow-x-hidden`}
    >
      {/* Animated Background */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
      >
        <div className={`absolute top-20 left-10 w-72 h-72 bg-gradient-to-br ${backgroundElements.element1} rounded-full blur-3xl animate-pulse`} />
        <div className={`absolute top-1/3 right-20 w-96 h-96 bg-gradient-to-br ${backgroundElements.element2} rounded-full blur-3xl animate-pulse delay-1000`} />
        <div className={`absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-br ${backgroundElements.element3} rounded-full blur-3xl animate-pulse delay-2000`} />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10">
        <DestinationHero
          title={destData.title}
          subtitle={destData.subtitle}
          backgroundImage={destData.theme.heroImage}
          stats={destData.heroStats}
          theme={destData.theme}
          contactFormId={`${destData.destinationId}-contact-form`}
          tourTitle={tourInfo.tourTitle}
          tourSubtitle={tourInfo.tourSubtitle}
          onDownloadPDF={handleDownloadPDF}
          onViewGallery={handleViewGallery}
          short
        />

        <DestinationAbout
          title={destData.aboutTitle}
          subtitle={destData.aboutSubtitle}
          highlights={destData.highlights}
          stats={destData.stats}
          theme={destData.theme}
          onOpenModal={openModal}
        />

        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 xl:gap-8">
              <div className="xl:col-span-12">
                <DestinationTabbedContent
                  itinerary={destData.itinerary}
                  inclusions={destData.inclusions}
                  exclusions={destData.exclusions}
                  theme={destData.theme}
                  onOpenModal={openModal}
                  pageClass={destData.pageClass}
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Generic Destination Modal */}
      <DestinationKnowBeforeYouGoModal
        key={destData.destinationId}
        isOpen={modalState.isOpen}
        onClose={closeModal}
        initialTab={modalState.tab}
        faqs={destData.faqs}
        policies={destData.policies}
        theme={destData.theme}
        destinationName={destData.title.replace('Discover ', '')}
        destinationId={destData.destinationId}
      />

      {/* Scroll Progress Indicator */}
      <ScrollProgress color={destData.theme.scrollProgress || "from-blue-600 to-stone-600"} height={3} />
    </motion.div>
  );
};

export default DestinationDetail;

