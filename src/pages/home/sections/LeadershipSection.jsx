import React, { memo } from 'react';
import AnimatedText from '../../../components/animations/AnimatedText';
import FloatingElement from '../../../components/animations/FloatingElement';
import { leadershipData } from '../../../data/about/aboutData';

const LeadershipSection = memo(() => (
  <section className="relative py-10 sm:py-14 px-3 sm:px-6 bg-gradient-to-b from-slate-100 via-blue-50 to-emerald-50">
    <div className="max-w-6xl mx-auto relative z-10">
      <AnimatedText
        text="Meet Our Team"
        className="text-2xl sm:text-4xl md:text-5xl font-bold text-center block w-full mb-3 text-[#0f4c5c]"
        type="slideUp"
        delay={200}
      />

      <div className="grid md:grid-cols-3 gap-6">
        {leadershipData.map((leader, index) => (
          <FloatingElement
            key={leader.name}
            intensity={0.25}
            speed={0.12}
            direction="y"
            range={10}
            delay={index * 150}
          >
            <div className="bg-gradient-to-br from-[#f3f6fa] to-[#f8fafc] backdrop-blur-lg rounded-xl overflow-hidden hover:from-[#e0e7ef] hover:to-[#d9e2ec] transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 border border-[#d1d9e6]">
              <div className="aspect-square overflow-hidden">
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold mb-1 text-[#334e68]">{leader.name}</h3>
                <p className="text-[#627d98] mb-3 font-medium text-sm">
                  {leader.title}
                </p>
                <p className="text-[#486581] text-sm leading-relaxed line-clamp-3">{leader.message}</p>
              </div>
            </div>
          </FloatingElement>
        ))}
      </div>
    </div>
  </section>
));

LeadershipSection.displayName = 'LeadershipSection';

export default LeadershipSection;

