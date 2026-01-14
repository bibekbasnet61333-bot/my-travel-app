import React, { memo } from 'react';
import AnimatedText from '../../../components/animations/AnimatedText';
import FloatingElement from '../../../components/animations/FloatingElement';
import ParticleBackground from '../../../components/animations/ParticleBackground';
import { services } from '../../../data/home/services';

const ServicesSection = memo(() => {
  return (
    <section className="relative py-12 sm:py-16 px-4 sm:px-6 bg-gradient-to-b from-gray-900/30 to-black/30">
      <ParticleBackground
        particleCount={7}
        color="rgba(0, 0, 0, 0.8)"
        size={3}
        speed={0.3}
        interactive={true}
      />
      <div className="max-w-7xl mx-auto relative z-10">
        <AnimatedText
          text="Our Services"
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4 text-white drop-shadow-lg block"
          type="slideUp"
          delay={200}
        />

        <AnimatedText
          text="Comprehensive travel solutions tailored to your dreams"
          className="text-base sm:text-lg md:text-xl text-center text-gray-200 mb-8 sm:mb-10 max-w-xl sm:max-w-2xl mx-auto font-medium block px-2 drop-shadow-md"
          type="fadeIn"
          delay={400}
        />

        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {services.map((service, index) => (
            <FloatingElement
              key={service.name}
              intensity={0.2}
              speed={0.08}
              direction="both"
              range={12}
              delay={index * 120}
            >
              <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-lg rounded-lg sm:rounded-xl p-4 sm:p-5 hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 border border-white/5 h-full">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mb-2 sm:mb-3 text-lg">
                  {service.icon}
                </div>

                <h3 className="text-sm sm:text-base font-bold mb-2 text-white">{service.name}</h3>

                <p className="text-gray-300 mb-2 sm:mb-3 leading-relaxed text-xs sm:text-sm">{service.description}</p>

                <ul className="space-y-1 sm:space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-300 font-medium">
                      <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </FloatingElement>
          ))}
        </div>
      </div>
    </section>
  );
});

ServicesSection.displayName = 'ServicesSection';

export default ServicesSection;

