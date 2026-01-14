import { useCallback, useRef } from 'react';
import useContactForm from '../hooks/useContactForm';
import ContactHeroSection from '../components/contact/sections/ContactHeroSection';
import ContactFormSection from '../components/contact/sections/ContactFormSection';
import WhatHappensNextSection from '../components/contact/sections/WhatHappensNextSection';
import ContactInfoSection from '../components/contact/sections/ContactInfoSection';
import ContactMapSection from '../components/contact/sections/ContactMapSection';
import ErrorBoundary from '../components/ui/ErrorBoundary';

export default function Contact() {
  const { formData, errors, isSubmitting, submitSuccess, handleChange, handleSubmit } = useContactForm();
  const formRef = useRef(null);

  const scrollToForm = useCallback(() => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white">
      <ErrorBoundary level="section" sectionName="ContactHero" fallbackMessage="Unable to load contact hero section.">
        <ContactHeroSection onScrollToForm={scrollToForm} />
      </ErrorBoundary>
      <ErrorBoundary level="section" sectionName="ContactForm" fallbackMessage="Unable to load contact form section.">
        <div ref={formRef}>
          <ContactFormSection
          formData={formData}
          errors={errors}
          isSubmitting={isSubmitting}
          submitSuccess={submitSuccess}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          />
        </div>
      </ErrorBoundary>
      <ErrorBoundary level="section" sectionName="WhatHappensNext" fallbackMessage="Unable to load next steps section.">
        <WhatHappensNextSection />
      </ErrorBoundary>
      <ErrorBoundary level="section" sectionName="ContactInfo" fallbackMessage="Unable to load contact information section.">
        <ContactInfoSection />
      </ErrorBoundary>
      <ErrorBoundary level="section" sectionName="ContactMap" fallbackMessage="Unable to load map section.">
        <ContactMapSection />
      </ErrorBoundary>
    </div>
  );
}
