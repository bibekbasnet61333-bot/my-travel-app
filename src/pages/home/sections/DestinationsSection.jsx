
import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import AnimatedText from '../../../components/animations/AnimatedText';
import FloatingElement from '../../../components/animations/FloatingElement';
import ParticleBackground from '../../../components/animations/ParticleBackground';
import { destinations } from '../../../data/destinations';

// Nepal destinations data with 4 curated destinations
const nepalDestinations = [
  {
    id: 'everest-base-camp-trek',
    name: 'Everest Base Camp',
    country: 'Nepal',
    category: 'local',
    image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?q=80&w=800&auto=format&fit=crop',
    description: 'Himalayan Adventure',
    duration: '14 Days / 13 Nights',
    price: 'From $1,299'
  },
  {
    id: 'annapurna-base-camp-trek',
    name: 'Annapurna Base Camp',
    country: 'Nepal',
    category: 'local',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800&auto=format&fit=crop',
    description: 'Mountain Trekking',
    duration: '12 Days / 11 Nights',
    price: 'From $899'
  },
  {
    id: 'ghorepani-poon-hill-trek',
    name: 'Ghorepani Poon Hill',
    country: 'Nepal',
    category: 'local',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop',
    description: 'Scenic Trek',
    duration: '5 Days / 4 Nights',
    price: 'From $449'
  },
  {
    id: 'kathmandu-pokhara-chitwan',
    name: 'Kathmandu Pokhara Chitwan',
    country: 'Nepal',
    category: 'local',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop',
    description: 'Classic Nepal Tour',
    duration: '7 Days / 6 Nights',
    price: 'From $599'
  }
];

// International destinations
const internationalDestinations = destinations.filter(d => d.category === 'international').slice(0, 6).map(d => ({
  ...d,
  duration: d.atAGlance?.idealStay || d.description?.match(/\d+\s*(Days|Nights)/)?.[0] || '7 Days / 6 Nights'
}));

const DestinationsSection = memo(() => {
  const [activeCategory, setActiveCategory] = React.useState('nepal');

  const getFilteredDestinations = () => {
    if (activeCategory === 'nepal') {
      return nepalDestinations;
    }
    return internationalDestinations;
  };

  const filteredDestinations = getFilteredDestinations();

  return (
    <section id="gallery" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900/30 to-black/30">
      <ParticleBackground
        particleCount={7}
        color="rgba(0, 0, 0, 0.8)"
        size={3}
        speed={0.3}
        interactive={true}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <AnimatedText
          text="Explore Destinations"
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-8 text-white drop-shadow-lg block"
          type="slideUp"
          delay={200}
        />

        {/* Category Tabs */}
        <div className="flex justify-center mb-10">
          <div className="bg-white/5 backdrop-blur-lg rounded-full p-1.5 sm:p-2 flex gap-1 sm:gap-2 border border-white/5">
            <button
              onClick={() => setActiveCategory('nepal')}
              className={`px-5 py-2.5 sm:px-6 sm:py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 ${
                activeCategory === 'nepal'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'text-gray-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              Nepal
            </button>
            <button
              onClick={() => setActiveCategory('international')}
              className={`px-5 py-2.5 sm:px-6 sm:py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 ${
                activeCategory === 'international'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'text-gray-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              International
            </button>
          </div>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredDestinations.map((destination, index) => (
            <FloatingElement
              key={destination.id}
              intensity={0.2}
              speed={0.15}
              direction="y"
              range={12}
              delay={index * 100}
            >
              <Link
                to={`/destinations/${destination.category}/${destination.id}`}
                className="group relative block overflow-hidden rounded-xl cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
              >
                {/* Image Container */}
                <div className="aspect-[4/3] overflow-hidden rounded-xl">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                  />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-end text-white">
                  {/* Duration Badge */}
                  <div className="absolute top-4 right-4">
                    <AnimatedText
                      text={destination.duration}
                      className="px-3 py-1 bg-[#1A1A40] text-white backdrop-blur-sm rounded-full text-xs font-medium"
                      type="fadeIn"
                      delay={100}
                    />
                  </div>

                  {/* Country Label */}
                  <span className="text-xs sm:text-sm font-medium text-blue-300 mb-1">
                    {destination.country}
                  </span>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold mb-1 transform translate-y-0 group-hover:translate-y-0 transition-transform duration-300">
                    {destination.name}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-200 text-sm mb-3 transform translate-y-0 group-hover:translate-y-0 transition-transform duration-300 delay-75 line-clamp-1">
                    {destination.description}
                  </p>

                  {/* Explore Button */}
                  <div className="flex items-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/15 backdrop-blur-sm rounded-full text-sm font-medium group-hover:bg-white/25 transition-colors">
                      Explore
                      <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </FloatingElement>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <Link
            to="/destinations"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-full text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            View All Destinations
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
});

DestinationsSection.displayName = 'DestinationsSection';

export default DestinationsSection;

