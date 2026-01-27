import React, { useState, useEffect, useMemo } from 'react';

/**
 * Optimized Image Component with:
 * - Blur placeholder effect
 * - Responsive image support (srcSet)
 * - Loading state with skeleton
 * - Error handling with fallback
 * - CLS prevention with explicit dimensions
 * 
 * Usage:
 * <Image src="..." alt="..." width={800} height={600} />
 * <Image src="..." alt="..." aspectRatio="16/9" />
 */
const Image = ({
  src,
  srcSet,
  sizes,
  alt,
  className = '',
  aspectRatio = '16/9',
  fallbackSrc = '/placeholder-image.svg',
  priority = false,
  placeholderColor = '#e2e8f0',
  width,
  height,
  onLoad,
  onError,
  ...props
}) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);

  // Calculate aspect-ratio style - prevents CLS
  const aspectRatioStyle = useMemo(() => {
    if (width && height) {
      return { aspectRatio: `${width}/${height}`, width, height };
    }
    return { aspectRatio };
  }, [width, height, aspectRatio]);

  // Intersection Observer for lazy loading (non-priority images)
  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '50px', threshold: 0.01 }
    );

    const element = document.getElementById(`image-${props.id || alt?.replace(/\s+/g, '-')}`);
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [priority, alt, props.id]);

  const handleLoad = (e) => {
    setIsLoading(false);
    setHasError(false);
    if (onLoad) onLoad(e);
  };

  const handleError = (e) => {
    setHasError(true);
    setIsLoading(false);
    if (imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
    }
    if (onError) onError(e);
  };

  // Generate SVG placeholder
  const placeholderSvg = useMemo(() => {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1">
        <rect width="1" height="1" fill="${placeholderColor}"/>
      </svg>
    `;
    return `data:image/svg+xml,${encodeURIComponent(svg.trim())}`;
  }, [placeholderColor]);

  return (
    <div
      id={`image-${props.id || alt?.replace(/\s+/g, '-')}`}
      className={`relative overflow-hidden bg-gray-200 ${className}`}
      style={aspectRatioStyle}
    >
      {/* Loading skeleton */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Blur placeholder background */}
      {isLoading && !hasError && (
        <img
          src={placeholderSvg}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-50 blur-lg scale-110"
        />
      )}

      {/* Main image - only load when in view */}
      {isInView && (
        <picture>
          {/* WebP source if srcSet is provided */}
          {srcSet && (
            <source srcSet={srcSet.replace(/\?w=(\d+)/g, '?w=$1&auto=format&fit=crop')} type="image/webp" />
          )}
          <img
            src={imageSrc}
            alt={alt}
            srcSet={srcSet}
            sizes={sizes}
            className={`w-full h-full object-cover transition-all duration-500 ${
              isLoading ? 'opacity-0 scale-105 blur-lg' : 'opacity-100 scale-100 blur-0'
            }`}
            onLoad={handleLoad}
            onError={handleError}
            loading={priority ? 'eager' : 'lazy'}
            decoding={priority ? 'sync' : 'async'}
            {...props}
          />
        </picture>
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100">
          <svg
            className="w-12 h-12 text-gray-300 mb-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="text-gray-400 text-sm">Image unavailable</span>
        </div>
      )}
    </div>
  );
};

export default Image;

