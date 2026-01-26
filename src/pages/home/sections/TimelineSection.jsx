import React, { memo } from 'react';
import AnimatedText from '../../../components/animations/AnimatedText';
import { timelineData } from '../../../data/about/aboutData';

const TimelineSection = memo(() => (
  <section className="relative py-10 sm:py-14 px-4 sm:px-6 bg-gradient-to-b from-slate-100 via-blue-50 to-emerald-50">
    <div className="max-w-5xl mx-auto">
      <AnimatedText
        text="Our Journey"
        className="text-2xl sm:text-4xl md:text-5xl font-bold text-center mb-2 text-[#0f4c5c]"
        type="slideUp"
        delay={200}
      />
      <p className="text-center text-[#334e68] text-base sm:text-lg md:text-xl font-medium max-w-2xl mx-auto mb-8">
        Discover the milestones and growth of SASA Travel over the years.
      </p>

      <div className="relative">
        <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#0f4c5c] to-[#1a6b7f] rounded-full" />

        <div className="space-y-8">
          {timelineData.slice(0, 4).map((item, index) => (
            <div key={item.year} className={`flex items-center gap-4 sm:gap-6 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
              <div className="flex-1">
                <div className="bg-white/80 backdrop-blur-md rounded-xl p-4 sm:p-6 hover:shadow-lg transition-all duration-300 border border-slate-200">
                  <div className="text-lg sm:text-xl font-bold text-[#0f4c5c] mb-2">
                    {item.year}
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold mb-2 text-[#334e68]">{item.title}</h3>
                  <p className="text-[#627d98] leading-relaxed text-xs sm:text-sm">{item.description}</p>
                </div>
              </div>
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-[#0f4c5c] to-[#1a6b7f] rounded-full border-2 border-white flex-shrink-0 shadow-lg" />
              <div className="flex-1">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-24 sm:h-32 object-cover rounded-lg sm:rounded-xl shadow-md"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
));

TimelineSection.displayName = 'TimelineSection';

export default TimelineSection;
