import React, { memo } from 'react';
import PropTypes from 'prop-types';

const Skeleton = ({ className, variant = 'text', width, height }) => {
  const baseClass = 'animate-pulse bg-gray-200';
  const variantClasses = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
    square: 'rounded-md'
  };

  return (
    <div
      className={`${baseClass} ${variantClasses[variant]} ${className || ''}`}
      style={{ width, height }}
    />
  );
};

Skeleton.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(['text', 'circular', 'rectangular', 'square']),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export const SkeletonGrid = memo(({ count = 6, itemClassName }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={`space-y-3 ${itemClassName || ''}`}>
          <Skeleton variant="rectangular" height={200} className="w-full" />
          <Skeleton width="60%" />
          <Skeleton width="80%" />
          <Skeleton width="40%" />
        </div>
      ))}
    </div>
  );
});

SkeletonGrid.propTypes = {
  count: PropTypes.number,
  itemClassName: PropTypes.string
};

SkeletonGrid.displayName = 'SkeletonGrid';

export default memo(Skeleton);

