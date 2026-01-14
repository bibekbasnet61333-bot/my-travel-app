import React, { memo } from 'react';
import AnimatedText from '../../../components/animations/AnimatedText';
import FloatingElement from '../../../components/animations/FloatingElement';
import ParticleBackground from '../../../components/animations/ParticleBackground';
import { leadershipData } from '../../../data/about/aboutData';

const LeadershipSection = memo(() => (
  <section className="relative py-20 px-6 bg-gradient-to-b from-gray-900/30 to-black/30">
    <ParticleBackground
      particleCount={7}
      color="rgba(0, 0, 0, 0.8)"
      size={3}
      speed={0.3}
      interactive={true}
    />
    <div className="max-w-6xl mx-auto relative z-10">
      <AnimatedText
        text="Meet Our Team"
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-emerald-400 via-sky-400 to-amber-400 bg-clip-text text-transparent drop-shadow-lg block"
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
            <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-lg rounded-xl overflow-hidden hover:from-blue-900/20 hover:to-purple-900/20 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 border border-white/5">
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
                <h3 className="text-lg font-bold mb-1 text-white">{leader.name}</h3>
                <p className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text mb-3 font-medium text-sm">
                  {leader.title}
                </p>
                <p className="text-gray-200 text-sm leading-relaxed line-clamp-3">{leader.message}</p>
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

