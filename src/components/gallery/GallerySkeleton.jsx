import React, { memo } from 'react';
import Skeleton from '../ui/Skeleton';

// Variant types: 'card', 'hero', 'detail-page'
const GallerySkeleton = ({ variant = 'card', className = '' }) => {
  const baseClasses = `overflow-hidden rounded-xl bg-gray-200 ${className}`;

  switch (variant) {
    case 'hero':
      return (
        <section className={`relative h-[50vh] md:h-[60vh] overflow-hidden ${baseClasses}`}>
          <div className="absolute inset-0">
            <Skeleton variant="rectangular" className="w-full h-full" />
          </div>
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-6">
            <div className="text-center max-w-4xl space-y-4">
              <Skeleton width={300} height={48} className="mx-auto" />
              <Skeleton width={500} height={32} className="mx-auto" />
            </div>
          </div>
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <Skeleton variant="circular" width={24} height={24} />
          </div>
        </section>
      );

    case 'detail-page':
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50">
          {/* Hero Section */}
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

          {/* Images Grid */}
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

    case 'card':
    default:
      return (
        <div className={baseClasses}>
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
  }
};

export default memo(GallerySkeleton);

