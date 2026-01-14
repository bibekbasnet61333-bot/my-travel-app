import { useState, useMemo, memo } from 'react';
import PropTypes from 'prop-types';
import { getIcon } from '../ui/Icons';
import AnimatedCard from '../ui/AnimatedCard';

// Memoized ServiceCard using shared AnimatedCard
const ServiceCard = memo(({ service, index }) => {
  return (
    <AnimatedCard
      index={index}
      icon={getIcon(service.icon, 'w-5 h-5 md:w-6 md:h-6')}
      title={service.title}
      description={service.description}
      iconBgColor="bg-gradient-to-br from-blue-50 to-blue-100"
      iconColor="text-blue-600"
      className="shadow-md hover:shadow-lg"
    />
  );
});

ServiceCard.displayName = 'ServiceCard';
ServiceCard.propTypes = {
  service: PropTypes.shape({
    icon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

// Optimized ServicesSection with CSS animations
const ServicesSection = memo(({ serviceCategories }) => {
  const [activeTab, setActiveTab] = useState(0);

  // Handle tab change
  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  // Memoized current services
  const currentServices = useMemo(
    () => serviceCategories[activeTab]?.services || [],
    [activeTab, serviceCategories]
  );

  // Memoized service cards
  const serviceCards = useMemo(
    () =>
      currentServices.map((service, i) => (
        <ServiceCard key={service.title} service={service} index={i} />
      )),
    [currentServices]
  );

  // Memoized category tabs
  const categoryTabs = useMemo(
    () =>
      serviceCategories.map((category, index) => (
        <button
          key={category.name}
          onClick={() => handleTabChange(index)}
          className={`px-4 py-2 md:px-5 md:py-2.5 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
            activeTab === index
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
          }`}
          aria-pressed={activeTab === index}
        >
          {getIcon(category.icon, 'w-4 h-4 md:w-5 md:h-5')}
          <span className="text-sm">{category.name}</span>
        </button>
      )),
    [serviceCategories, activeTab]
  );

  return (
    <section className="py-12 md:py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-3">
            What We <span className="text-blue-600">Offer</span>
          </h2>
          <p className="text-sm md:text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive travel services tailored to your needs - from adventure tours to wellness retreats
          </p>
        </div>

        {/* Category Tabs */}
        <div
          className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-10"
          role="tablist"
          aria-label="Service categories"
        >
          {categoryTabs}
        </div>

        {/* Service Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {serviceCards}
        </div>
      </div>
    </section>
  );
});

ServicesSection.displayName = 'ServicesSection';
ServicesSection.propTypes = {
  serviceCategories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      description: PropTypes.string,
      services: PropTypes.arrayOf(
        PropTypes.shape({
          icon: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired,
          description: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
};

export default ServicesSection;

