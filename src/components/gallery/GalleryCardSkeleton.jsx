import React, { memo } from 'react';
import Skeleton from '../ui/Skeleton';

const GalleryCardSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-2xl shadow-lg bg-gray-200">
      <div className="aspect-[4/3] relative">
        <Skeleton variant="rectangular" className="w-full h-full" />
      </div>
      <div className="p-6 space-y-3">
        <Skeleton width="60%" height={28} />
        <Skeleton width="80%" height={16} />
        <Skeleton width="40%" height={12} />
      </div>
    </div>
  );
};

export default memo(GalleryCardSkeleton);

