import React, { memo } from 'react';
import Skeleton from '../ui/Skeleton';

const GalleryHeroSkeleton = () => {
  return (
    <section className="relative h-[50vh] md:h-[60vh] overflow-hidden bg-gray-200">
      <div className="absolute inset-0">
        <Skeleton variant="rectangular" className="w-full h-full" />
      </div>
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-6">
        <div className="text-center max-w-4xl space-y-4">
          <Skeleton width={300} height={48} className="mx-auto" />
          <Skeleton width={500} height={32} className="mx-auto" />
        </div>
      </div>
      {/* Scroll indicator placeholder */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <Skeleton variant="circular" width={24} height={24} />
      </div>
    </section>
  );
};

export default memo(GalleryHeroSkeleton);

