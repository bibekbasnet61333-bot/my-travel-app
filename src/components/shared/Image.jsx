import React, { useState } from 'react';

const Image = ({
  src,
  alt,
  className = '',
  aspectRatio = '16/9',
  fallbackSrc = '/placeholder-image.jpg',
  priority = false,
  ...props
}) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    if (imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
    }
  };

  return (
    <div
      className={`relative overflow-hidden bg-gray-200 ${className}`}
      style={{ aspectRatio }}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}
      <img
        src={imageSrc}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={handleLoad}
        onError={handleError}
        loading={priority ? 'eager' : 'lazy'}
        {...props}
      />
      {hasError && imageSrc === fallbackSrc && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <span className="text-gray-500 text-sm">Image unavailable</span>
        </div>
      )}
    </div>
  );
};

export default Image;
