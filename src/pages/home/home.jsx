import React from 'react';
import { Helmet } from 'react-helmet-async';
import ScrollProgress from '../../components/ui/ScrollProgress';
import ErrorBoundary from '../../components/ui/ErrorBoundary';

// Import all sections directly
import HeroSection from './sections/HeroSection';
import VideoShowcaseSection from './sections/VideoShowcaseSection';
import InteractiveWorldMapSection from './sections/InteractiveWorldMapSection';
import DestinationsSection from './sections/DestinationsSection';
import WhyChooseUsSection from './sections/WhyChooseUsSection';
import JourneyStoriesSection from './sections/JourneyStoriesSection';
import TestimonialsSection from './sections/TestimonialsSection';
import ExperienceStatsSection from './sections/ExperienceStatsSection';
import FeaturedPackagesSection from './sections/FeaturedPackagesSection';
import GalleryPreviewSection from './sections/GalleryPreviewSection';
import ServicesSection from './sections/ServicesSection';
import TimelineSection from './sections/TimelineSection';
import LeadershipSection from './sections/LeadershipSection';
import CallToActionSection from './sections/CallToActionSection';

// Main Home Component
export default function Home() {
  return (
    <div className="relative min-h-screen bg-surface-dark text-white overflow-hidden">
      <Helmet>
        <title>Sasa Travel & Tours - Premium Travel Packages Worldwide</title>
        <meta name="description" content="Discover unforgettable travel experiences with Sasa Travel & Tours. We offer curated travel packages to Dubai, Bali, Thailand, Vietnam, China, Turkey, and Australia. Book your dream vacation today!" />
        <meta property="og:title" content="Sasa Travel & Tours - Premium Travel Packages Worldwide" />
        <meta property="og:description" content="Discover unforgettable travel experiences with Sasa Travel & Tours. Curated packages to Dubai, Bali, Thailand, Vietnam, China, Turkey & Australia." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://sasatravel.com" />
      </Helmet>

      <ScrollProgress />

      {/* Critical sections */}
      <HeroSection />
      <VideoShowcaseSection />

      {/* Non-critical sections with ErrorBoundary */}
      <ErrorBoundary level="section" sectionName="Interactive World Map">
        <InteractiveWorldMapSection />
      </ErrorBoundary>

      <ErrorBoundary level="section" sectionName="Destinations">
        <DestinationsSection />
      </ErrorBoundary>

      <ErrorBoundary level="section" sectionName="Why Choose Us">
        <WhyChooseUsSection />
      </ErrorBoundary>

      <ErrorBoundary level="section" sectionName="Journey Stories">
        <JourneyStoriesSection />
      </ErrorBoundary>

      <ErrorBoundary level="section" sectionName="Testimonials">
        <TestimonialsSection />
      </ErrorBoundary>

      <ErrorBoundary level="section" sectionName="Experience Stats">
        <ExperienceStatsSection />
      </ErrorBoundary>

      <ErrorBoundary level="section" sectionName="Featured Packages">
        <FeaturedPackagesSection />
      </ErrorBoundary>

      <ErrorBoundary level="section" sectionName="Gallery Preview">
        <GalleryPreviewSection />
      </ErrorBoundary>

      <ErrorBoundary level="section" sectionName="Services">
        <ServicesSection />
      </ErrorBoundary>

      <ErrorBoundary level="section" sectionName="Timeline">
        <TimelineSection />
      </ErrorBoundary>

      <ErrorBoundary level="section" sectionName="Leadership">
        <LeadershipSection />
      </ErrorBoundary>

      {/* Call to Action */}
      <ErrorBoundary level="section" sectionName="Call to Action">
        <CallToActionSection />
      </ErrorBoundary>
    </div>
  );
}
