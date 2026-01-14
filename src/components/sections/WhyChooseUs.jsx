import { useMemo, memo } from 'react';
import PropTypes from 'prop-types';
import { Globe } from 'lucide-react';
import { getIcon } from '../ui/Icons';
import AnimatedCard from '../ui/AnimatedCard';

// Optimized WhyChooseUs with CSS animations
const WhyChooseUs = memo(({ points, image }) => {
  // Memoized point cards using shared AnimatedCard
  const pointCards = useMemo(
    () =>
      points.map((point, index) => (
        <AnimatedCard
          key={point.title}
          index={index}
          icon={getIcon(point.icon, 'w-5 h-5')}
          title={point.title}
          description={point.description}
          iconBgColor="bg-blue-50"
          iconColor="text-blue-600"
        />
      )),
    [points]
  );

  return (
    <section className="py-12 md:py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 md:mb-3">
            Why Choose SASA Tourism?
          </h2>
          <p className="text-sm md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Founded in 2018 and headquartered in Kathmandu, SASA Tourism is your premier travel partner
            dedicated to delivering world-class travel experiences.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 md:gap-8 items-center">
          {/* Points Column */}
          <div className="space-y-3 md:space-y-4">{pointCards}</div>

          {/* Image Column */}
          <div className="relative mt-6 md:mt-0">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl transform rotate-1 md:rotate-2" />
            <img
              src={image}
              alt="Why Choose SASA - Global Travel Expert"
              className="relative rounded-2xl shadow-lg w-full h-auto object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute -bottom-3 -right-3 md:-bottom-4 md:-right-4 bg-white p-3 md:p-4 rounded-xl shadow-lg">
              <div className="flex items-center gap-2 md:gap-3">
                <Globe className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                <div>
                  <p className="text-lg md:text-xl font-bold text-blue-600">Global Reach</p>
                  <p className="text-xs md:text-sm text-gray-600">14+ Countries</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

WhyChooseUs.displayName = 'WhyChooseUs';
WhyChooseUs.propTypes = {
  points: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
  image: PropTypes.string.isRequired,
};

export default WhyChooseUs;

