import React, { memo } from 'react';
import Skeleton from '../ui/Skeleton';

const GalleryDetailPageSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50">
      {/* Hero Section Skeleton */}
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <Skeleton variant="rectangular" className="w-full h-full" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-6">
          <div className="text-center space-y-4">
            <Skeleton width={400} height={56} className="mx-auto" />
            <Skeleton width={600} height={32} className="mx-auto" />
            <Skeleton width={200} height={24} className="mx-auto" />
          </div>
        </div>
      </section>

      {/* Images Grid Skeleton */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="aspect-square">
                <Skeleton variant="rectangular" className="w-full h-full rounded-xl" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default memo(GalleryDetailPageSkeleton);

