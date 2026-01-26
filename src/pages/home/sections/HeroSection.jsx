
import { memo } from 'react';
import { Link } from 'react-router-dom';
import AnimatedText from '../../../components/animations/AnimatedText';
import FloatingElement from '../../../components/animations/FloatingElement';
import { CONTACT_PHONES, SOCIAL_LINKS } from '../../../constants';

// Social Icons SVG Components
const SocialIcon = ({ type, href, className }) => {
  const icons = {
    Twitter: (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
    TikTok: (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
      </svg>
    ),
    Facebook: (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
    YouTube: (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
    Instagram: (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-slate-400 hover:text-sky-400 transition-colors duration-300 text-2xl hover:scale-110 transform"
    >
      {icons[type]}
    </a>
  );
};

const HeroSection = memo(() => (
  <section className="relative h-[50vh] sm:h-[65vh] lg:h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 min-h-0">
    <div
      className="absolute inset-0"
      style={{ background: 'linear-gradient(90deg, #f0f9ff 0%, #f0fdf4 100%)' }}
    />

    <FloatingElement intensity={0.3} speed={0.2} direction="both" range={20}>
      <div className="absolute top-16 sm:top-20 left-4 sm:left-20 w-12 sm:w-16 h-12 sm:h-16 border border-sky-400/30 rounded-full backdrop-blur-sm" />
    </FloatingElement>
    <FloatingElement intensity={0.4} speed={0.3} direction="rotate" range={30} delay={800}>
      <div className="absolute top-28 sm:top-40 right-8 sm:right-32 w-10 sm:w-12 h-10 sm:h-12 bg-emerald-500/20 rotate-45 backdrop-blur-sm" />
    </FloatingElement>
    <FloatingElement intensity={0.3} speed={0.2} direction="y" range={15} delay={400}>
      <div className="absolute bottom-24 sm:bottom-32 left-8 sm:left-40 w-8 sm:w-10 h-8 sm:h-10 bg-amber-500/20 rounded-lg backdrop-blur-sm" />
    </FloatingElement>

    <div className="relative z-10 text-center px-3 sm:px-6 max-w-4xl mx-auto -mt-8">
      <div className="mb-2">
        <AnimatedText
          text="SASA TRAVELS"
          className="text-2xl sm:text-4xl lg:text-5xl font-bold text-[#b85c38] text-center"
          type="slideUp"
          delay={200}
        />
      </div>
      <div className="mb-6 sm:mb-8">
        <AnimatedText
          text="Discover Nepal & Beyond"
          className="text-sm sm:text-lg lg:text-xl font-medium text-[#7c6f57] text-center"
          type="fadeIn"
          delay={400}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8">
        <Link to="/contact">
          <AnimatedText
            text="Start Your Journey"
            className="inline-block px-5 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4 bg-gradient-to-r from-[#0f4c5c] to-[#1a6b7f] hover:from-[#1a6b7f] hover:to-[#0f4c5c] rounded-full text-white text-sm sm:text-base font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
            type="scale"
            delay={1200}
          />
        </Link>
        <Link to="/destinations?category=international">
          <AnimatedText
            text="Explore Destinations"
            className="inline-block px-5 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4 border-2 border-[#0f4c5c] hover:border-[#1a6b7f] rounded-full text-[#0f4c5c] hover:text-[#1a6b7f] text-sm sm:text-base font-semibold transition-all duration-300 cursor-pointer"
            type="scale"
            delay={1300}
          />
        </Link>
      </div>

      <div className="mt-2 sm:mt-4">
        <AnimatedText
          text="Ready to Start Your Journey?"
          className="text-sm sm:text-base lg:text-xl font-semibold text-[#334e68] mb-3 sm:mb-4 block"
          type="fadeIn"
          delay={1400}
        />
        <div className="flex flex-col items-center gap-3 sm:gap-4">
          <a
            href={CONTACT_PHONES.WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-[#25D366] hover:bg-[#20BD5A] rounded-full text-sm sm:text-base font-medium hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
            <span>Chat on WhatsApp</span>
          </a>

          <div className="flex justify-center gap-3 sm:gap-4 flex-wrap px-2">
            <SocialIcon type="Twitter" href={SOCIAL_LINKS.TWITTER} className="w-5 h-5 sm:w-6 sm:h-6 text-[#1DA1F2]" />
            <SocialIcon type="TikTok" href={SOCIAL_LINKS.TIKTOK} className="w-5 h-5 sm:w-6 sm:h-6" />
            <SocialIcon type="Facebook" href={SOCIAL_LINKS.FACEBOOK} className="w-5 h-5 sm:w-6 sm:h-6 text-[#1877F2]" />
            <SocialIcon type="YouTube" href={SOCIAL_LINKS.YOUTUBE} className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF0000]" />
            <SocialIcon type="Instagram" href={SOCIAL_LINKS.INSTAGRAM} className="w-5 h-5 sm:w-6 sm:h-6 text-[#E4405F]" />
          </div>
        </div>
      </div>
    </div>

    <AnimatedText
      text="↓"
      className="absolute bottom-3 sm:bottom-6 left-1/2 transform -translate-x-1/2 text-2xl sm:text-3xl text-[#0f4c5c] hover:text-[#1a6b7f] animate-bounce cursor-pointer transition-colors duration-300"
      type="fadeIn"
      delay={1800}
      onClick={() => {
        const element = document.getElementById('destinations');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }}
    />
  </section>
));

HeroSection.displayName = 'HeroSection';

export default HeroSection;

