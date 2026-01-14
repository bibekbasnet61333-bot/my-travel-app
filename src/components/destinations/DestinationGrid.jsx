import { memo } from 'react';
import PropTypes from 'prop-types';
import DestinationCard from './DestinationCard';

function DestinationGrid({ destinations, category }) {
  if (destinations.length === 0) {
    return (
      <div className="text-center py-20">
        <svg 
          className="w-24 h-24 mx-auto text-gray-300 mb-6" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={1.5} 
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
          />
        </svg>
        <h3 className="text-2xl font-bold text-gray-700 mb-2">No destinations found</h3>
        <p className="text-gray-500">Check back soon for new adventures!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {destinations.map((destination) => (
        <DestinationCard
          key={destination.id}
          destination={destination}
          category={category}
        />
      ))}
    </div>
  );
}

DestinationGrid.propTypes = {
  destinations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
  category: PropTypes.string.isRequired,
};

export default memo(DestinationGrid);
