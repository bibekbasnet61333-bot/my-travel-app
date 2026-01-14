import React, { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { HighlightedText } from '../../utils/searchUtils';
import Image from '../shared/Image';

const GalleryCard = ({ destination, index, searchQuery }) => {
  const navigate = useNavigate();
  const { name, description, thumbnail, imageCount, comingSoon, slug, heroImage } = destination;

  const handleClick = useCallback(() => {
    navigate(`/gallery/${slug}`);
  }, [navigate, slug]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      navigate(`/gallery/${slug}`);
    }
  }, [navigate, slug]);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: 'easeOut'
      }}
      className="group cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 rounded-2xl"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="link"
      aria-label={`View gallery: ${name}`}
    >
      <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
        {/* Image */}
        <div className="aspect-[4/3] overflow-hidden bg-gray-200">
          <Image
            src={thumbnail || heroImage}
            alt={`${name} destination photo`}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            aspectRatio="4/3"
            priority={index < 4}
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

        {/* Coming Soon Badge */}
        {comingSoon && (
          <div className="absolute top-4 right-4 bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full">
            Coming Soon
          </div>
        )}

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-amber-300 transition-colors duration-300">
            <HighlightedText text={name} query={searchQuery} />
          </h3>
          <p className="text-sm text-gray-200 line-clamp-2 mb-3 group-hover:text-white transition-colors duration-300">
            <HighlightedText text={description} query={searchQuery} />
          </p>

          {/* Image count */}
          {!comingSoon && (
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-amber-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-xs font-medium text-amber-300">
                {imageCount} photos
              </span>
            </div>
          )}

          {/* View Gallery Link */}
          <motion.div
            className="mt-4 flex items-center gap-2 text-sm font-semibold text-amber-300 opacity-0 group-hover:opacity-100 transition-all duration-300"
            initial={{ x: -10 }}
            whileHover={{ x: 0 }}
          >
            <span>View Gallery</span>
            <svg
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
};

GalleryCard.propTypes = {
  destination: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    description: PropTypes.string,
    thumbnail: PropTypes.string,
    heroImage: PropTypes.string,
    imageCount: PropTypes.number,
    comingSoon: PropTypes.bool
  }).isRequired,
  index: PropTypes.number,
  searchQuery: PropTypes.string
};

export default memo(GalleryCard);

