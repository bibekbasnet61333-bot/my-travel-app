import React, { memo } from 'react';
import AnimatedText from '../../../components/animations/AnimatedText';
import FloatingElement from '../../../components/animations/FloatingElement';
import { timelineData } from '../../../data/about/aboutData';
import { getBackground } from '../../../constants/colors';

const TimelineSection = memo(() => (
  <section className="relative py-20 px-6" style={{ background: getBackground('section') }}>
    <div className="max-w-5xl mx-auto">
      <AnimatedText
        text="Our Journey"
        className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent block"
        type="slideUp"
        delay={200}
      />

      <div className="relative">
        <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />

        <div className="space-y-12">
          {timelineData.slice(0, 4).map((item, index) => (
            <FloatingElement
              key={item.year}
              intensity={0.2}
              speed={0.08}
              direction="x"
              range={12}
              delay={index * 150}
            >
              <div className={`flex items-center gap-6 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className="flex-1">
                  <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-md rounded-xl p-6 hover:from-blue-900/20 hover:to-purple-900/20 transition-all duration-300 border border-white/5">
                    <div className="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text mb-3">
                      {item.year}
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-white">{item.title}</h3>
                    <p className="text-gray-300 leading-relaxed text-sm">{item.description}</p>
                  </div>
                </div>
                <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-3 border-gray-900 flex-shrink-0 shadow-lg" />
                <div className="flex-1">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-32 object-cover rounded-xl shadow-lg"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </FloatingElement>
          ))}
        </div>
      </div>
    </div>
  </section>
));

TimelineSection.displayName = 'TimelineSection';

export default TimelineSection;
