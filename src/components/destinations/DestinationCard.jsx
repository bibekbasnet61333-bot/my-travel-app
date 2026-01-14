import { memo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function DestinationCard({ destination, category }) {
  const { id, name, description, image } = destination;
  const linkPath = `/destinations/${category}/${id}`;

  return (
    <Link
      to={linkPath}
      className="group block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">
          {name}
        </h3>
      </div>
      <div className="p-6">
        <p className="text-gray-600 line-clamp-2">{description}</p>
        <div className="mt-4 flex items-center text-indigo-600 font-semibold group-hover:gap-2 transition-all">
          <span>Explore</span>
          <svg 
            className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

DestinationCard.propTypes = {
  destination: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    country: PropTypes.string,
  }).isRequired,
  category: PropTypes.oneOf(['local', 'international', 'nepal']).isRequired,
};

export default memo(DestinationCard);
