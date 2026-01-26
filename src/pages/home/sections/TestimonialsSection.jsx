import { memo, useState, useEffect, useCallback } from 'react';
import AnimatedText from '../../../components/animations/AnimatedText';
import FloatingElement from '../../../components/animations/FloatingElement';
import { testimonials } from '../../../data/home/testimonials';
import { colors } from '../../../constants/colors';

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
    <section
      className="relative py-10 sm:py-14 px-3 sm:px-6"
      style={{ background: colors.sections.testimonials }}
    >
      <div className="max-w-5xl mx-auto relative z-10">
        <div>
          <AnimatedText
            text="What Our Travelers Say"
            className="text-2xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-3 text-center"
            style={{ color: colors.accent[700] }}
            type="slideUp"
            delay={200}
          />
        </div>
        <div>
          <AnimatedText
            text="Real stories from real adventures"
            className="text-base sm:text-lg md:text-xl text-center mb-6 sm:mb-8 font-medium"
            style={{ color: colors.accent[900] }}
            type="fadeIn"
            delay={400}
          />
        </div>

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
                    <div
                      className="backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 max-w-3xl mx-auto border"
                      style={{
                        background: `linear-gradient(135deg, ${colors.neutral[100]}, ${colors.neutral[50]})`,
                        borderColor: colors.neutral[200],
                      }}
                    >
                      <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-6">
                        <div className="flex-shrink-0">
                          <img
                            src={imageErrors[testimonial.name] ? 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop&fm=webp' : testimonial.image}
                            alt={testimonial.name}
                            className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full object-cover border-2 sm:border-3"
                            style={{
                              borderImage: `linear-gradient(90deg, ${colors.accent[700]}, ${colors.accent[200]}) 1`,
                            }}
                            loading="lazy"
                            decoding="async"
                            onError={() => setImageErrors(prev => ({ ...prev, [testimonial.name]: true }))}
                          />
                        </div>

                        <div className="flex-1 text-center md:text-left">
                          <div className="flex justify-center md:justify-start mb-2 sm:mb-3">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <span key={i} style={{ color: colors.accent[400] }} className="text-sm sm:text-lg">★</span>
                            ))}
                          </div>

                          <blockquote
                            className="text-xs sm:text-sm md:text-base mb-3 sm:mb-4 italic leading-relaxed font-medium drop-shadow-sm"
                            style={{ color: colors.neutral[700] }}
                          >
                            "{testimonial.text}"
                          </blockquote>

                          <div>
                            <div className="font-bold text-sm sm:text-base" style={{ color: colors.neutral[900] }}>{testimonial.name}</div>
                            <div className="text-xs sm:text-sm font-medium" style={{ color: colors.neutral[500] }}>{testimonial.location}</div>
                            <div className="text-[10px] sm:text-xs mt-0.5 sm:mt-1 font-medium" style={{ color: colors.accent[700] }}>{testimonial.trip}</div>
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
                className={`w-2 h-2 rounded-full transition-all duration-300`}
                style={
                  index === currentTestimonial
                    ? { background: `linear-gradient(90deg, ${colors.accent[700]}, ${colors.accent[200]})`, transform: 'scale(1.25)' }
                    : { background: colors.neutral[400] }
                }
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

