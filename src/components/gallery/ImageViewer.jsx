import React, { memo, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import PropTypes from 'prop-types';
import useImageViewer from '../../hooks/gallery/useImageViewer';
import { getImageSrc, getImageSrcset, GALLERY_FALLBACK_IMAGE } from '../../utils/galleryImageUtils';

const ImageViewer = ({ images, initialIndex = 0, isOpen, onClose }) => {
  const containerRef = useRef(null);
  const previousActiveElement = useRef(null);
  const thumbnailRef = useRef(null);
  const failedImagesRef = useRef(new Set());
  const zoomLevelRef = useRef(1);

  // Motion values for smooth animations without re-renders
  const zoom = useMotionValue(1);
  const positionX = useMotionValue(0);
  const positionY = useMotionValue(0);
  const cursor = useTransform(() => zoomLevelRef.current > 1 ? 'grab' : 'default');
  const isDragging = useTransform(() => zoomLevelRef.current > 1);

  const {
    currentIndex,
    currentImage,
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
  } = useImageViewer(images, initialIndex, zoom, positionX, positionY);

  // Track zoom level for cursor and drag sensitivity
  useEffect(() => {
    const unsubscribe = zoom.on('change', (latestZoom) => {
      zoomLevelRef.current = latestZoom;
    });
    return unsubscribe;
  }, [zoom]);

  // Handle image error - fallback to placeholder
  const handleImageError = useCallback(() => {
    failedImagesRef.current.add(currentIndex);
  }, [currentIndex]);

  // Get current image source with fallback
  const getCurrentImageSrc = useCallback(() => {
    if (failedImagesRef.current.has(currentIndex)) {
      return GALLERY_FALLBACK_IMAGE;
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

  // Keyboard navigation - wrapped in useCallback with proper dependencies
  const handleKeyDown = useCallback((e) => {
    if (!isOpen) return;

    // Ignore if focus is on interactive element (buttons, inputs)
    const tagName = document.activeElement?.tagName.toLowerCase();
    if (tagName === 'button' || tagName === 'input' || tagName === 'textarea') {
      return;
    }

    switch (e.key) {
      case 'Escape':
        e.preventDefault();
        onClose();
        break;
      case 'ArrowRight':
        e.preventDefault();
        if (canNavigate) nextImage();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        if (canNavigate) prevImage();
        break;
      case '+':
      case '=':
        if (!e.shiftKey) {
          e.preventDefault();
          zoomIn();
        }
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
      case 'PageUp':
        e.preventDefault();
        if (canNavigate) prevImage();
        break;
      case 'PageDown':
        e.preventDefault();
        if (canNavigate) nextImage();
        break;
      default:
        break;
    }
  }, [isOpen, onClose, canNavigate, nextImage, prevImage, zoomIn, zoomOut, resetZoom, goToImage, images.length]);

  // Set up keyboard event listener with proper cleanup
  useEffect(() => {
    if (isOpen) {
      // Use capture phase to intercept keyboard events first
      window.addEventListener('keydown', handleKeyDown, { passive: false });
      // Also listen on container for focus-trapped events
      containerRef.current?.addEventListener('keydown', handleKeyDown, { passive: false });

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        containerRef.current?.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, handleKeyDown]);

  // Handle wheel zoom
  const handleWheel = useCallback((e) => {
    if (!isOpen) return;
    e.preventDefault();

    const delta = e.deltaY < 0 ? config.zoomStep : -config.zoomStep;
    const currentZoom = zoom.get();
    const newZoom = Math.min(Math.max(currentZoom + delta, config.minZoom), config.maxZoom);
    zoom.set(newZoom);
  }, [isOpen, zoom]);

  // Get current zoom level for zoom controls
  const currentZoomLevel = Math.round(zoom.get() * 100);

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
            disabled={zoom.get() <= config.minZoom}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Zoom out"
            aria-describedby="zoom-out-help"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
          <span id="zoom-out-help" className="sr-only">Decrease zoom level</span>
          <button
            onClick={resetZoom}
            className="px-3 py-1 text-sm rounded-full bg-white/10 hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400"
            aria-label={`Reset zoom to 100%, current zoom: ${currentZoomLevel}%`}
          >
            {currentZoomLevel}%
          </button>
          <button
            onClick={zoomIn}
            disabled={zoom.get() >= config.maxZoom}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400 disabled:opacity-50 disabled:cursor-not-allowed"
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
          aria-label="Close image viewer (ESC)"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div
        className="flex-1 relative overflow-hidden flex items-center justify-center"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ touchAction: 'none' }}
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
              scale: zoom.get(),
              x: positionX.get(),
              y: positionY.get()
            }}
            transition={{ duration: 0.25 }}
            style={{
              cursor: cursor,
              transformOrigin: 'center center'
            }}
          />
        </AnimatePresence>
        {canNavigate && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              aria-label="Previous image (Left arrow or Swipe right)"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              aria-label="Next image (Right arrow or Swipe left)"
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

// Zoom configuration
const config = {
  minZoom: 0.5,
  maxZoom: 3,
  zoomStep: 0.25
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

