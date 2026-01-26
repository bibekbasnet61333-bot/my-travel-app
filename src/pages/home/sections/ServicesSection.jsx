import React, { memo } from 'react';
import AnimatedText from '../../../components/animations/AnimatedText';
import FloatingElement from '../../../components/animations/FloatingElement';
import { services } from '../../../data/home/services';
import { colors } from '../../../constants/colors';

const ServicesSection = memo(() => {
  return (
    <section
      className="relative py-10 sm:py-14 px-3 sm:px-6"
      style={{ background: colors.sections.services }}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div>
          <AnimatedText
            text="Our Services"
            className="text-2xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-3 text-center"
            style={{ color: colors.accent[700] }}
            type="slideUp"
            delay={200}
          />
        </div>

        <div>
          <AnimatedText
            text="Comprehensive travel solutions tailored to your dreams"
            className="text-base sm:text-lg md:text-xl text-center mb-6 sm:mb-8 font-medium"
            style={{ color: colors.accent[900] }}
            type="fadeIn"
            delay={400}
          />
        </div>

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
              <div
                className="backdrop-blur-lg rounded-lg sm:rounded-xl p-4 sm:p-5 hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 h-full border"
                style={{
                  background: `linear-gradient(135deg, ${colors.neutral[100]}, ${colors.neutral[50]})`,
                  borderColor: colors.neutral[200],
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-2 sm:mb-3 text-lg"
                  style={{
                    background: `linear-gradient(90deg, ${colors.accent[700]}, ${colors.accent[400]})`,
                  }}
                >
                  {service.icon}
                </div>

                <h3
                  className="text-sm sm:text-base font-bold mb-2"
                  style={{ color: colors.neutral[800] }}
                >
                  {service.name}
                </h3>

                <p
                  className="mb-2 sm:mb-3 leading-relaxed text-xs sm:text-sm"
                  style={{ color: colors.neutral[600] }}
                >
                  {service.description}
                </p>

                <ul className="space-y-1 sm:space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium"
                      style={{ color: colors.neutral[600] }}
                    >
                      <div
                        className="flex-shrink-0 rounded-full"
                        style={{
                          width: '0.375rem',
                          height: '0.375rem',
                          background: `linear-gradient(90deg, ${colors.accent[700]}, ${colors.accent[400]})`,
                        }}
                      ></div>
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

