import React from 'react';
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
