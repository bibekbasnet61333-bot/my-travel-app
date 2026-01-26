import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import AnimatedText from '../../../components/animations/AnimatedText';

const CallToActionSection = memo(() => (
  <section className="relative py-12 sm:py-16 px-4 sm:px-6 bg-gradient-to-br from-slate-200 via-blue-100 to-slate-200">
    <div className="max-w-4xl mx-auto text-center">
      <AnimatedText
        text="Ready to Start Your Journey?"
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 text-[#7C3AED] block"
        type="slideUp"
        delay={200}
      />

      <AnimatedText
        text="Let us craft the perfect travel experience tailored just for you. From Nepal's majestic peaks to the world's most exotic destinations."
        className="text-sm sm:text-base md:text-lg text-[#000000] mb-8 sm:mb-10 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed font-medium block drop-shadow-[0_2px_2px_rgba(0,0,0,0.15)]"
        type="fadeIn"
        delay={400}
      />

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
        <Link
          to="/contact"
          className="inline-block px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 bg-[#1E293B] text-white rounded-full text-sm sm:text-base font-semibold hover:scale-105 transition-transform duration-300 shadow-lg"
          aria-label="Contact Us Today"
        >
          Contact Us Today
        </Link>
        <Link
          to="/packages"
          className="inline-block px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 border border-gray-300 text-[#1E293B] bg-white rounded-full text-sm sm:text-base font-semibold hover:bg-gray-50 transition-all duration-300 shadow-md"
          aria-label="View All Packages"
        >
          View All Packages
        </Link>
      </div>
    </div>
  </section>
));

CallToActionSection.displayName = 'CallToActionSection';

export default CallToActionSection;

