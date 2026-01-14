import { useMemo, memo, useRef } from 'react';
import PropTypes from 'prop-types';
import { Quote } from 'lucide-react';
import useIntersectionObserver from '../../hooks/about/useIntersectionObserver';

// Memoized LeaderCard with CSS animations
const LeaderCard = memo(({ leader, index }) => {
  const { elementRef, isVisible } = useIntersectionObserver({
    threshold: 0.15,
    unobserveOnIntersect: false,
  });

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ transitionDelay: `${index * 0.15}s` }}
    >
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        {/* Image Container with Aspect Ratio */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={leader.image}
            alt={`${leader.name} - ${leader.title}`}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h3 className="text-lg md:text-xl font-bold">{leader.name}</h3>
            <p className="text-blue-300 text-sm">{leader.title}</p>
          </div>
        </div>

        <div className="p-4 md:p-5">
          <Quote className="w-6 h-6 md:w-8 md:h-8 text-blue-200 mb-2" />
          <p className="text-sm md:text-base text-gray-600 leading-relaxed">"{leader.message}"</p>
        </div>
      </div>
    </div>
  );
});

LeaderCard.displayName = 'LeaderCard';
LeaderCard.propTypes = {
  leader: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

// Optimized LeadershipTeam with CSS animations
const LeadershipTeam = memo(({ leaders }) => {
  const { elementRef: headerElementRef, isVisible: headerVisible } = useIntersectionObserver({
    threshold: 0.2,
    unobserveOnIntersect: false,
  });

  // Memoized leader cards
  const leaderCards = useMemo(
    () => leaders.map((leader, index) => (
      <LeaderCard key={leader.name} leader={leader} index={index} />
    )),
    [leaders]
  );

  return (
    <section className="py-12 md:py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div
          ref={headerElementRef}
          className={`text-center mb-10 md:mb-12 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          } transition-all duration-700`}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 md:mb-3">
            Leadership <span className="text-blue-600">Team</span>
          </h2>
          <p className="text-sm md:text-lg text-gray-600">Meet the visionaries behind our success</p>
        </div>

        <div className="text-center mb-6">
          <h3 className="text-lg md:text-xl font-semibold text-gray-800">
            What Our Leaders Has to Say
          </h3>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {leaderCards}
        </div>
      </div>
    </section>
  );
});

LeadershipTeam.displayName = 'LeadershipTeam';
LeadershipTeam.propTypes = {
  leaders: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default LeadershipTeam;

