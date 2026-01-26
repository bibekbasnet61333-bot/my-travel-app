import React, { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { GALLERY_CATEGORIES, GALLERY_TABS } from '../../data/gallery/galleryConfig';

const GalleryTabs = memo(function GalleryTabs({ activeTab, onTabChange, theme }) {
  // Use GALLERY_CATEGORIES for category labels
  const tabs = useMemo(() => {
    return GALLERY_TABS.map(tab => ({
      ...tab,
      label: GALLERY_CATEGORIES[tab.id]?.label || tab.label
    }));
  }, []);

  return (
    <div className="flex justify-center mb-8">
      <div
        className="inline-flex p-2 rounded-full shadow-lg"
        style={{ backgroundColor: 'rgba(255,255,255,0.95)' }}
      >
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`px-8 py-3 rounded-full font-semibold text-sm md:text-base transition-all duration-300 ${
              activeTab === tab.id
                ? ''
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            style={{
              backgroundColor: activeTab === tab.id ? theme.accentColor : 'transparent',
              color: activeTab === tab.id ? 'white' : undefined
            }}
            aria-pressed={activeTab === tab.id}
          >
            {tab.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
});

GalleryTabs.propTypes = {
  activeTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired,
  theme: PropTypes.shape({
    accentColor: PropTypes.string
  })
};

export default GalleryTabs;

