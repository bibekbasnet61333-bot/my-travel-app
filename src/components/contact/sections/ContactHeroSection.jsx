import { memo } from 'react';
import PropTypes from 'prop-types';

const ContactHeroSection = memo(function ContactHeroSection({ onScrollToForm }) {
  return (
    <section className="relative text-white py-24 overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2000&auto=format&fit=crop)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/90 via-blue-600/85 to-purple-700/90"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Let&apos;s Plan Your Adventure
        </h1>
        <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
          Ready to explore the world? Get in touch with our travel experts.
        </p>
        <button
          onClick={onScrollToForm}
          className="bg-white text-indigo-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-2xl inline-flex items-center gap-2"
        >
          <span>Start Your Journey</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </section>
  );
});

ContactHeroSection.propTypes = {
  onScrollToForm: PropTypes.func.isRequired,
};

export default ContactHeroSection;
