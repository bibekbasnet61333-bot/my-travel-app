import { lazy, Suspense, memo } from 'react';
import ErrorBoundary from '../../components/ui/ErrorBoundary';

// Import data directly at the top
import {
  videos,
  whyChooseUsPoints,
  whyChooseUsImage,
  experienceStats,
  timelineData,
  leadershipData,
  serviceCategoriesData,
} from '../../data/about/aboutData';

// Lazy load section components for better performance (code splitting)
const VideoCarousel = lazy(() => import('../../components/sections/VideoCarousel'));
const WhyChooseUs = lazy(() => import('../../components/sections/WhyChooseUs'));
const ExperienceStats = lazy(() => import('../../components/sections/ExperienceStats'));
const Timeline = lazy(() => import('../../components/sections/Timeline'));
const LeadershipTeam = lazy(() => import('../../components/sections/LeadershipTeam'));
const ServicesSection = lazy(() => import('../../components/sections/ServicesSection'));

// Reusable loading fallback - defined at module scope to prevent recreation
function SectionLoader() {
  return (
    <div className="flex items-center justify-center py-16 md:py-20">
      <div className="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-b-2 border-blue-600" />
    </div>
  );
}

// LazySection wrapper with error boundary - defined at module scope
function LazySection({ component: Component, sectionName, ...props }) {
  return (
    <ErrorBoundary level="section" sectionName={sectionName}>
      <Suspense fallback={<SectionLoader />}>
        <Component {...props} />
      </Suspense>
    </ErrorBoundary>
  );
}

// CTA Section - Memoized to prevent unnecessary re-renders
const CallToAction = memo(function CallToAction() {
  return (
    <section className="relative py-14 md:py-16 px-4 text-white overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-600/90" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
          Ready to Start Your Journey?
        </h2>
        <p className="text-base md:text-lg mb-6 md:mb-8 opacity-90 max-w-2xl mx-auto">
          Let us craft the perfect travel experience tailored just for you
        </p>
        <a
          href="/contact"
          className="inline-block bg-white text-blue-600 px-6 py-3 rounded-full text-base md:text-lg font-medium hover:bg-gray-100 transition-colors"
        >
          Contact Us Today
        </a>
      </div>
    </section>
  );
});

function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <LazySection component={VideoCarousel} videos={videos} sectionName="VideoCarousel" />
      <LazySection component={WhyChooseUs} points={whyChooseUsPoints} image={whyChooseUsImage} sectionName="WhyChooseUs" />
      <LazySection component={ExperienceStats} stats={experienceStats} sectionName="ExperienceStats" />
      <LazySection component={Timeline} data={timelineData} sectionName="Timeline" />
      <LazySection component={LeadershipTeam} leaders={leadershipData} sectionName="LeadershipTeam" />
      <LazySection component={ServicesSection} serviceCategories={serviceCategoriesData} sectionName="ServicesSection" />
      <CallToAction />
    </div>
  );
}

export default About;

