
import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import AnimatedText from '../../../components/animations/AnimatedText';
import FloatingElement from '../../../components/animations/FloatingElement';
import { internationalDestinations } from '../../../data/gallery/international';

// Get first image from each of 6 international destinations
const galleryItems = internationalDestinations.slice(0, 6).map(dest => ({
  src: dest.thumbnail,
  location: dest.name,
  country: dest.country,
  slug: dest.slug
}));

const GalleryPreviewSection = memo(() => {
  return (
    <section className="relative py-12 sm:py-16 px-4 sm:px-6 bg-gradient-to-b from-slate-200 via-blue-100 to-slate-200">
      <div className="max-w-6xl mx-auto">
        <AnimatedText
          text="Destination Gallery"
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-3 sm:mb-4 text-[#7C3AED] block"
          type="slideUp"
          delay={200}
        />

        <AnimatedText
          text="A glimpse of the world's most breathtaking destinations"
          className="text-sm sm:text-base md:text-lg text-center text-[#000000] mb-8 sm:mb-10 max-w-xl sm:max-w-2xl mx-auto font-medium block px-2 drop-shadow-[0_2px_2px_rgba(0,0,0,0.15)]"
          type="fadeIn"
          delay={400}
        />

        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {galleryItems.map((item, index) => (
            <FloatingElement
              key={item.slug}
              intensity={0.2}
              speed={0.1}
              direction="both"
              range={12}
              delay={index * 120}
            >
              <Link
                to={`/gallery/${item.slug}`}
                className="group relative overflow-hidden rounded-lg sm:rounded-xl cursor-pointer transform transition-all duration-300 hover:scale-105 hover:-translate-y-1 block"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.location}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                </div>

                <div className="absolute inset-0 p-3 sm:p-4 flex flex-col justify-end text-white">
                  <h3 className="text-sm sm:text-base md:text-lg font-bold mb-1">{item.location}</h3>
                  <p className="text-gray-200 text-xs sm:text-sm mb-2 sm:mb-3">{item.country}</p>
                  <span className="inline-block px-2.5 sm:px-3 py-1.5 sm:py-2 bg-[#1e3a8a] rounded-full text-[10px] sm:text-xs font-semibold w-fit">
                    View Details
                  </span>
                </div>
              </Link>
            </FloatingElement>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-10">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-full text-xs sm:text-sm md:text-base font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            View Full Gallery
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
});

GalleryPreviewSection.displayName = 'GalleryPreviewSection';

export default GalleryPreviewSection;

