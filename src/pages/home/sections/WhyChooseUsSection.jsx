import React, { memo } from 'react';
import AnimatedText from '../../../components/animations/AnimatedText';
import { whyChooseUsPoints, whyChooseUsImage } from '../../../data/about/aboutData';

const WhyChooseUsSection = memo(() => (
  <section className="relative py-10 sm:py-14 px-3 sm:px-6 bg-gradient-to-b from-slate-100 via-blue-50 to-emerald-50">

    <div className="max-w-6xl mx-auto relative z-10">
      <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 items-center">
        <div>
          <AnimatedText
            text="Why Choose SASA Travel?"
            className="text-2xl sm:text-4xl md:text-5xl font-bold mb-3 text-[#0f4c5c]"
            type="slideLeft"
            delay={200}
          />

          <div className="space-y-4 sm:space-y-5">
            {whyChooseUsPoints.map((point, index) => (
              <div
                key={point.title}
                className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-white/80 border border-[#f3f6fa] hover:bg-white/90 transition-all duration-300 group shadow-md"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-r from-[#fbeee6] to-[#e7eafc] rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-base sm:text-lg text-[#b85c38] font-bold">✓</span>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold mb-1 text-[#b85c38]">{point.title}</h3>
                  <p className="text-gray-700 leading-relaxed text-xs sm:text-sm font-medium">{point.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#fbeee6] to-[#e7eafc] rounded-2xl transform rotate-2 opacity-20 blur-lg" />
          <img
            src={whyChooseUsImage}
            alt="Why Choose SASA"
            className="relative rounded-2xl shadow-xl w-full h-auto border border-[#f3f6fa]"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </div>
  </section>
));

WhyChooseUsSection.displayName = 'WhyChooseUsSection';

export default WhyChooseUsSection;

