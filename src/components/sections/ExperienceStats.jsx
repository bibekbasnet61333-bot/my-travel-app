import { useMemo, memo } from 'react';
import PropTypes from 'prop-types';
import useIntersectionObserver from '../../hooks/about/useIntersectionObserver';
import useAnimatedCounter from '../../hooks/about/useAnimatedCounter';

// Helper function to parse numeric value from stat value string
function parseStatValue(value) {
  const match = value.match(/^(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

// Animated counter component using the shared hook
function AnimatedCounter({ targetValue, isVisible, suffix = '' }) {
  const count = useAnimatedCounter(targetValue, isVisible, 2000);
  const formattedCount = count >= 1000 ? count.toLocaleString() : count;
  return <>{formattedCount}{suffix}</>;
}

// Stat Card component - uses the reusable hook
const StatCard = memo(({ stat, index }) => {
  const { elementRef, isVisible } = useIntersectionObserver({
    threshold: 0.3,
    unobserveOnIntersect: false,
  });
  const targetValue = useMemo(() => parseStatValue(stat.value), [stat.value]);
  const hasPlus = stat.value.includes('+');
  const hasPercent = stat.value.includes('%');

  return (
    <div
      ref={elementRef}
      className={`text-center p-4 md:p-6 bg-white/10 backdrop-blur-sm rounded-xl transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <div className="text-2xl md:text-3xl lg:text-4xl font-bold mb-1 md:mb-2">
        <AnimatedCounter targetValue={targetValue} isVisible={isVisible} />
        {hasPlus ? '+' : ''}
        {hasPercent ? '%' : ''}
      </div>
      <div className="text-xs md:text-sm opacity-90 leading-tight">{stat.label}</div>
    </div>
  );
});

StatCard.displayName = 'StatCard';
StatCard.propTypes = {
  stat: PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

// ExperienceStats component - uses shared hooks
const ExperienceStats = memo(({ stats }) => {
  const { elementRef: headerElementRef, isVisible: headerVisible } = useIntersectionObserver({
    threshold: 0.2,
    unobserveOnIntersect: false,
  });

  const statCards = useMemo(
    () => stats.map((stat, index) => (
      <StatCard key={stat.label} stat={stat} index={index} />
    )),
    [stats]
  );

  return (
    <section
      className="py-12 md:py-16 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white"
    >
      <div className="max-w-7xl mx-auto">
        <div
          ref={headerElementRef}
          className={`text-center mb-8 md:mb-10 transition-all duration-700 ${
            headerVisible ? 'opacity-100 animate-card-scale' : 'opacity-0 translate-y-4'
          }`}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">Our Experience</h2>
          <p className="text-sm md:text-base opacity-80">Numbers that speak for themselves</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
          {statCards}
        </div>
      </div>
    </section>
  );
});

ExperienceStats.displayName = 'ExperienceStats';
ExperienceStats.propTypes = {
  stats: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ExperienceStats;

