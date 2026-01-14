
import React, { memo } from 'react';
import AnimatedText from '../../../components/animations/AnimatedText';

import { experienceStats } from '../../../data/about/aboutData';
import { getBackground } from '../../../constants/colors';

const ExperienceStatsSection = memo(() => (
  <section className="relative py-20 px-6" style={{ background: getBackground('section') }}>
    <div className="max-w-6xl mx-auto">
      <AnimatedText
        text="Our Experience Speaks"
        className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent block"
        type="slideUp"
        delay={200}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {experienceStats.map((stat) => (
          <div key={stat.id} className="text-center p-6 rounded-xl bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-md border border-white/5 hover:from-blue-900/20 hover:to-purple-900/20 transition-all duration-300 group">
              <div className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                {stat.value}
              </div>
              <div className="text-gray-300 text-base font-medium">{stat.label}</div>
            </div>
           
        ))}
      </div>
    </div>
  </section>
));

ExperienceStatsSection.displayName = 'ExperienceStatsSection';

export default ExperienceStatsSection;

