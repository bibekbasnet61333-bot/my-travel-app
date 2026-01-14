import React, { memo, useState, useEffect, useCallback } from 'react';
import AnimatedText from '../../../components/animations/AnimatedText';
import FloatingElement from '../../../components/animations/FloatingElement';
import ParticleBackground from '../../../components/animations/ParticleBackground';
import { testimonials } from '../../../data/home/testimonials';

const TestimonialsSection = memo(() => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handleTestimonialChange = useCallback((index) => {
    setCurrentTestimonial(index);
  }, []);

  return (
    <section className="relative py-12 sm:py-16 px-4 sm:px-6 bg-gradient-to-b from-gray-900/30 to-black/30">
      <ParticleBackground
        particleCount={7}
        color="rgba(0, 0, 0, 0.8)"
        size={3}
        speed={0.3}
        interactive={true}
      />
      <div className="max-w-5xl mx-auto relative z-10">
        <AnimatedText
          text="What Our Travelers Say"
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4 text-white drop-shadow-lg block"
          type="slideUp"
          delay={200}
        />

        <AnimatedText
          text="Real stories from real adventures"
          className="text-base sm:text-lg md:text-xl text-center text-gray-200 mb-8 sm:mb-10 font-medium block drop-shadow-md"
          type="fadeIn"
          delay={400}
        />

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <FloatingElement
                    intensity={0.15}
                    speed={0.08}
                    direction="y"
                    range={8}
                    delay={200}
                  >
                    <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 max-w-3xl mx-auto border border-white/5">
                      <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-6">
                        <div className="flex-shrink-0">
                          <img
                            src={imageErrors[testimonial.name] ? 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop&fm=webp' : testimonial.image}
                            alt={testimonial.name}
                            className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full object-cover border-2 sm:border-3 border-gradient-to-r from-blue-500 to-purple-500"
                            loading="lazy"
                            decoding="async"
                            onError={() => setImageErrors(prev => ({ ...prev, [testimonial.name]: true }))}
                          />
                        </div>

                        <div className="flex-1 text-center md:text-left">
                          <div className="flex justify-center md:justify-start mb-2 sm:mb-3">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <span key={i} className="text-yellow-400 text-sm sm:text-lg">★</span>
                            ))}
                          </div>

                          <blockquote className="text-xs sm:text-sm md:text-base text-gray-100 mb-3 sm:mb-4 italic leading-relaxed font-medium drop-shadow-sm">
                            "{testimonial.text}"
                          </blockquote>

                          <div>
                            <div className="font-bold text-white text-sm sm:text-base">{testimonial.name}</div>
                            <div className="text-gray-300 text-xs sm:text-sm font-medium">{testimonial.location}</div>
                            <div className="text-blue-400 text-[10px] sm:text-xs mt-0.5 sm:mt-1 font-medium">{testimonial.trip}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </FloatingElement>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-4 sm:mt-6 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleTestimonialChange(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentTestimonial
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 scale-125'
                    : 'bg-gray-400 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

TestimonialsSection.displayName = 'TestimonialsSection';

export default TestimonialsSection;

