
import React, { memo } from 'react';
import AnimatedText from '../../../components/animations/AnimatedText';
import FloatingElement from '../../../components/animations/FloatingElement';
import ParticleBackground from '../../../components/animations/ParticleBackground';
import { whyChooseUsPoints, whyChooseUsImage } from '../../../data/about/aboutData';

const WhyChooseUsSection = memo(() => (
  <section className="relative py-20 px-6 bg-gradient-to-b from-gray-900/30 to-black/30">
    <ParticleBackground
      particleCount={7}
      color="rgba(0, 0, 0, 0.8)"
      size={3}
      speed={0.3}
      interactive={true}
    />

    <div className="max-w-6xl mx-auto relative z-10">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <AnimatedText
            text="Why Choose SASA Travel?"
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-white drop-shadow-lg tracking-tight"
            type="slideLeft"
            delay={200}
          />

          <div className="space-y-5">
            {whyChooseUsPoints.map((point, index) => (
              <FloatingElement
                key={point.title}
                intensity={0.15}
                speed={0.08}
                direction="x"
                range={8}
                delay={index * 120}
              >
                <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-800/60 backdrop-blur-[12px] border border-white/10 hover:bg-gray-800/80 transition-all duration-300 group shadow-lg">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-lg text-white font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2 text-white">{point.title}</h3>
                    <p className="text-gray-300 leading-relaxed text-sm font-medium">{point.description}</p>
                  </div>
                </div>
              </FloatingElement>
            ))}
          </div>
        </div>

        <FloatingElement intensity={0.2} speed={0.15} direction="both" range={15} delay={400}>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl transform rotate-2 opacity-20 blur-lg" />
            <img
              src={whyChooseUsImage}
              alt="Why Choose SASA"
              className="relative rounded-2xl shadow-xl w-full h-auto border border-white/10"
              loading="lazy"
              decoding="async"
            />
          </div>
        </FloatingElement>
      </div>
    </div>
  </section>
));

WhyChooseUsSection.displayName = 'WhyChooseUsSection';

export default WhyChooseUsSection;

