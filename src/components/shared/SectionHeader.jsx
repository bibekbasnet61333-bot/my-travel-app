import React from 'react';
import PropTypes from 'prop-types';

function SectionHeader({ title, subtext, className = '', ...props }) {
  return (
    <div className={`text-center mb-8 sm:mb-10 ${className}`} {...props}>
      <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-3 text-[#0f4c5c]">
        {title}
      </h2>
      {subtext && (
        <p className="text-[#334e68] text-sm sm:text-lg max-w-2xl mx-auto font-medium">
          {subtext}
        </p>
      )}
    </div>
  );
}

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtext: PropTypes.string,
  className: PropTypes.string,
};

export default SectionHeader;
