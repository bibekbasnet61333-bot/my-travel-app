import React, { memo, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import useImageViewer from '../../hooks/gallery/useImageViewer';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop';

// Helper to get src from image (handles both string and responsive image object)
const getImageSrc = (image) => {
  if (typeof image === 'string') return image;
  return image?.src || image;
};

// Helper to get srcset from image
const getImageSrcset = (image) => {
  if (typeof image === 'string') return undefined;
  return image?.srcset;
};

const ImageViewer = ({ images, initialIndex = 0, isOpen, onClose }) => {
  const containerRef = useRef(null);
  const previousActiveElement = useRef(null);
  const thumbnailRef = useRef(null);
  const failedImagesRef = useRef(new Set());

  const {
    currentIndex,
    currentImage,
    zoom,
    position,
    nextImage,
    prevImage,
    goToImage,
    zoomIn,
    zoomOut,
    resetZoom,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    canNavigate
  } = useImageViewer(images, initialIndex);

  // Handle image error - fallback to placeholder
  const handleImageError = useCallback(() => {
    failedImagesRef.current.add(currentIndex);
  }, [currentIndex]);

  // Get current image source with fallback
  const getCurrentImageSrc = useCallback(() => {
    if (failedImagesRef.current.has(currentIndex)) {
      return FALLBACK_IMAGE;
    }
    return getImageSrc(currentImage);
  }, [currentIndex, currentImage]);

  // Focus management
  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement;
      const closeButton = containerRef.current?.querySelector('[aria-label="Close image viewer"]');
      if (closeButton) {
        closeButton.focus();
      } else {
        containerRef.current?.focus();
      }
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      if (previousActiveElement.current && previousActiveElement.current.focus) {
        previousActiveElement.current.focus();
      }
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Focus trap for keyboard navigation
  const handleContainerKeyDown = useCallback((e) => {
    if (!isOpen) return;
    if (e.key === 'Tab') {
      const focusableElements = containerRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements && focusableElements.length > 0) {
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }
  }, [isOpen]);

  // Scroll active thumbnail into view
  useEffect(() => {
    if (thumbnailRef.current) {
      const activeThumbnail = thumbnailRef.current.children[currentIndex];
      if (activeThumbnail) {
        activeThumbnail.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }, [currentIndex]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e) => {
    if (!isOpen) return;
    switch (e.key) {
      case 'Escape':
        e.preventDefault();
        onClose();
        break;
      case 'ArrowRight':
        e.preventDefault();
        nextImage();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        prevImage();
        break;
      case '+':
      case '=':
        e.preventDefault();
        zoomIn();
        break;
      case '-':
        e.preventDefault();
        zoomOut();
        break;
      case '0':
        e.preventDefault();
        resetZoom();
        break;
      case 'Home':
        e.preventDefault();
        goToImage(0);
        break;
      case 'End':
        e.preventDefault();
        goToImage(images.length - 1);
        break;
      default:
        break;
    }
  }, [isOpen, onClose, nextImage, prevImage, zoomIn, zoomOut, resetZoom, goToImage, images.length]);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  const handleWheel = useCallback((e) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      zoomIn();
    } else {
      zoomOut();
    }
  }, [zoomIn, zoomOut]);

  if (!isOpen) return null;

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/95 flex flex-col outline-none"
      onWheel={handleWheel}
      onKeyDown={handleContainerKeyDown}
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      tabIndex={-1}
    >
      <div className="sr-only">
        Image viewer open. Use arrow keys to navigate. Press Escape to close.
      </div>
      <div className="flex items-center justify-between p-4 text-white z-10">
        <div className="text-sm font-medium" aria-live="polite">
          {currentIndex + 1} of {images.length}
        </div>
        <div className="flex items-center gap-2" role="group" aria-label="Zoom controls">
          <button
            onClick={zoomOut}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400"
            aria-label="Zoom out"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
          <button
            onClick={resetZoom}
            className="px-3 py-1 text-sm rounded-full bg-white/10 hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400"
            aria-label="Reset zoom"
          >
            {Math.round(zoom * 100)}%
          </button>
          <button
            onClick={zoomIn}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400"
            aria-label="Zoom in"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400"
          aria-label="Close image viewer"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div
        className="flex-1 relative overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={getCurrentImageSrc()}
            srcSet={getImageSrcset(currentImage)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
            alt={`Photo ${currentIndex + 1} of ${images.length}`}
            onError={handleImageError}
            className="max-w-full max-h-full object-contain select-none"
            draggable={false}
            fetchpriority="high"
            loading="eager"
            decoding="async"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: 1,
              scale: zoom,
              x: position.x,
              y: position.y
            }}
            transition={{ duration: 0.3 }}
            style={{ cursor: zoom > 1 ? 'grab' : 'default' }}
          />
        </AnimatePresence>
        {canNavigate && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              aria-label="Previous image (left arrow)"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              aria-label="Next image (right arrow)"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>
      {canNavigate && (
        <div
          ref={thumbnailRef}
          className="p-4 overflow-x-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent"
          role="navigation"
          aria-label="Image thumbnails"
        >
          <div className="flex justify-center gap-2 min-w-max px-4">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => goToImage(index)}
                className={`relative flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                  index === currentIndex
                    ? 'ring-2 ring-amber-400 ring-offset-2 ring-offset-black scale-105'
                    : 'opacity-50 hover:opacity-100 hover:scale-105'
                }`}
                aria-label={`Go to image ${index + 1}`}
                aria-current={index === currentIndex ? 'true' : 'false'}
              >
                <img
                  src={getImageSrc(img)}
                  alt={`Thumbnail ${index + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-1 right-1 text-[10px] font-medium text-white bg-black/60 px-1.5 py-0.5 rounded">
                  {index + 1}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

ImageViewer.propTypes = {
  images: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      src: PropTypes.string,
      srcset: PropTypes.string,
      sizes: PropTypes.string
    })
  ])).isRequired,
  initialIndex: PropTypes.number,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default memo(ImageViewer);

