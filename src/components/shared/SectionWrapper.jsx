import { memo, forwardRef } from 'react';
import PropTypes from 'prop-types';

/**
 * Reusable SectionWrapper component for consistent section styling
 * Standardizes padding, max-width, and background colors across the app
 */
const SectionWrapper = memo(
  forwardRef(function SectionWrapper(
    {
      children,
      className = '',
      background = 'transparent',
      paddingY = 'py-12 md:py-16',
      as: Component = 'section',
      ...props
    },
    ref
  ) {
    // Background color mapping
    const bgClasses = {
      transparent: '',
      light: 'bg-slate-50',
      white: 'bg-white',
      gradient: 'bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50',
      dark: 'bg-slate-900',
    };

    return (
      <Component
        ref={ref}
        className={`
          w-full
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          lg:px-8
          ${paddingY}
          ${bgClasses[background] || bgClasses.transparent}
          ${className}
        `}
        {...props}
      >
        {children}
      </Component>
    );
  })
);

SectionWrapper.displayName = 'SectionWrapper';

SectionWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  background: PropTypes.oneOf(['transparent', 'light', 'white', 'gradient', 'dark']),
  paddingY: PropTypes.string,
  as: PropTypes.elementType,
};

export default SectionWrapper;

