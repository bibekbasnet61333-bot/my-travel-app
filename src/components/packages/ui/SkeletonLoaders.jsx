import { memo } from 'react';
import PropTypes from 'prop-types';

// Base skeleton pulse animation class - slate tones for light backgrounds
const skeletonClass = 'animate-pulse bg-slate-200 rounded';

// Package Card Skeleton
const PackageCardSkeleton = memo(function PackageCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Image placeholder */}
      <div className={`${skeletonClass} h-48 w-full`} />

      {/* Content */}
      <div className="p-5 bg-white">
        {/* Title placeholder */}
        <div className={`${skeletonClass} h-5 w-3/4 mb-3`} />

        {/* Description placeholder */}
        <div className={`${skeletonClass} h-4 w-full mb-2`} />
        <div className={`${skeletonClass} h-4 w-2/3 mb-4`} />

        {/* Details */}
        <div className="space-y-2 mb-4">
          <div className={`${skeletonClass} h-4 w-1/2`} />
          <div className={`${skeletonClass} h-4 w-1/3`} />
        </div>

        {/* CTA */}
        <div className="flex items-center justify-end pt-4 border-t border-slate-100">
          <div className={`${skeletonClass} h-4 w-24`} />
        </div>
      </div>
    </div>
  );
});

PackageCardSkeleton.propTypes = {};

// Package Grid Skeleton
const PackageGridSkeleton = memo(function PackageGridSkeleton({ count = 6 }) {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
      role="status"
      aria-label="Loading packages"
    >
      {Array.from({ length: count }).map((_, index) => (
        <PackageCardSkeleton key={index} />
      ))}
    </div>
  );
});

PackageGridSkeleton.propTypes = {
  count: PropTypes.number
};

PackageGridSkeleton.displayName = 'PackageGridSkeleton';

// Hero Skeleton
const HeroSkeleton = memo(function HeroSkeleton() {
  return (
    <div className="relative h-[320px] md:h-[420px] overflow-hidden bg-slate-100">
      {/* Background gradient placeholder */}
      <div className={`absolute inset-0 ${skeletonClass}`} />

      {/* Content placeholder */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        <div className="text-center mb-12">
          {/* Title placeholder */}
          <div className={`${skeletonClass} h-12 md:h-16 w-64 md:w-96 mx-auto mb-6`} />

          {/* Subtitle placeholder */}
          <div className={`${skeletonClass} h-6 w-full max-w-2xl mx-auto`} />
        </div>
      </div>

      {/* Scroll indicator placeholder */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className={`${skeletonClass} w-6 h-10 rounded-full`} />
      </div>
    </div>
  );
});

HeroSkeleton.propTypes = {};

HeroSkeleton.displayName = 'HeroSkeleton';

// Category Filter Skeleton
const CategoryFilterSkeleton = memo(function CategoryFilterSkeleton() {
  return (
    <div className="py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex overflow-x-auto gap-3 pb-2 -mx-2 px-2 mb-8">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className={`${skeletonClass} flex-shrink-0 px-5 py-3 rounded-full w-24 h-10`}
            />
          ))}
        </div>
      </div>
    </div>
  );
});

CategoryFilterSkeleton.propTypes = {};

CategoryFilterSkeleton.displayName = 'CategoryFilterSkeleton';

// Section Header Skeleton
const SectionHeaderSkeleton = memo(function SectionHeaderSkeleton() {
  return (
    <div className="text-center mb-12">
      <div className={`${skeletonClass} h-8 w-64 mx-auto mb-4`} />
      <div className={`${skeletonClass} h-5 w-full max-w-2xl mx-auto`} />
    </div>
  );
});

SectionHeaderSkeleton.propTypes = {};

SectionHeaderSkeleton.displayName = 'SectionHeaderSkeleton';

// Stats Skeleton for WhyChooseUs
const StatsSkeleton = memo(function StatsSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-sm border border-slate-200 p-6"
        >
          <div className={`${skeletonClass} h-8 md:h-10 w-16 mx-auto mb-2`} />
          <div className={`${skeletonClass} h-4 w-20 mx-auto`} />
        </div>
      ))}
    </div>
  );
});

StatsSkeleton.propTypes = {};

StatsSkeleton.displayName = 'StatsSkeleton';

export {
  PackageCardSkeleton,
  PackageGridSkeleton,
  HeroSkeleton,
  CategoryFilterSkeleton,
  SectionHeaderSkeleton,
  StatsSkeleton
};

export default {
  PackageCardSkeleton,
  PackageGridSkeleton,
  HeroSkeleton,
  CategoryFilterSkeleton,
  SectionHeaderSkeleton,
  StatsSkeleton
};

