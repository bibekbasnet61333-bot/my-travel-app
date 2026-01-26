import React, { memo, useEffect, useCallback, useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import PropTypes from 'prop-types';
import useImageViewer from '../../hooks/gallery/useImageViewer';
import { getImageSrc, getImageSrcset, GALLERY_FALLBACK_IMAGE } from '../../utils/galleryImageUtils';

const ImageViewer = ({ images, initialIndex = 0, isOpen, onClose }) => {
  const containerRef = useRef(null);
  const previousActiveElement = useRef(null);
  const thumbnailRef = useRef(null);
  const failedImagesRef = useRef(new Set());
  const [isKeyListenerActive, setIsKeyListenerActive] = useState(false);

  const zoom = useMotionValue(1);
  const positionX = useMotionValue(0);
  const positionY = useMotionValue(0);
  const cursor = useTransform(() => {
    const z = zoom.get();
    return z > 1 ? 'grab' : 'default';
  });

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

  const handleImageError = useCallback(() => {
    failedImagesRef.current.add(currentIndex);
  }, [currentIndex]);

  const getCurrentImageSrc = useCallback(() => {
    if (failedImagesRef.current.has(currentIndex)) {
      return GALLERY_FALLBACK_IMAGE;
    }
    return getImageSrc(currentImage);
  }, [currentIndex, currentImage]);

  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement;
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => {
        if (containerRef.current) {
          containerRef.current.focus();
          setIsKeyListenerActive(true);
        }
      });
    } else {
      document.body.style.overflow = '';
      setIsKeyListenerActive(false);
      if (previousActiveElement.current && previousActiveElement.current.focus) {
        previousActiveElement.current.focus();
      }
    }
    return () => {
      document.body.style.overflow = '';
      setIsKeyListenerActive(false);
    };
  }, [isOpen]);

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

  const navigateWithArrow = useCallback((direction) => {
    if (!canNavigate) return;
    if (direction === 'next') {
      nextImage();
    } else {
      prevImage();
    }
  }, [canNavigate, nextImage, prevImage]);

  useEffect(() => {
    if (!isOpen || !isKeyListenerActive) return;

    const handleKeyDown = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      switch (e.key) {
        case 'Escape':
          e.preventDefault();
          e.stopPropagation();
          onClose();
          break;
        case 'ArrowRight':
          e.preventDefault();
          e.stopPropagation();
          navigateWithArrow('next');
          break;
        case 'ArrowLeft':
          e.preventDefault();
          e.stopPropagation();
          navigateWithArrow('prev');
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
        case 'PageUp':
          e.preventDefault();
          navigateWithArrow('prev');
          break;
        case 'PageDown':
          e.preventDefault();
          navigateWithArrow('next');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown, { passive: false, capture: true });

    return () => {
      window.removeEventListener('keydown', handleKeyDown, { capture: true });
    };
  }, [isOpen, isKeyListenerActive, onClose, canNavigate, navigateWithArrow, zoomIn, zoomOut, resetZoom, goToImage, images.length]);

  const handleWheel = useCallback((e) => {
    if (!isOpen) return;
    e.preventDefault();
    e.stopPropagation();

    const delta = e.deltaY < 0 ? config.zoomStep : -config.zoomStep;
    const currentZoom = zoom.get();
    const newZoom = Math.min(Math.max(currentZoom + delta, config.minZoom), config.maxZoom);
    zoom.set(newZoom);
  }, [isOpen, zoom]);

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
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer - Press arrow keys to navigate"
    >
      <div className="sr-only">
        Image viewer open. Press left/right arrow keys to navigate between images. Press Escape to close.
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
            aria-label="Zoom out (-)"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
          <button
            onClick={resetZoom}
            className="px-3 py-1 text-sm rounded-full bg-white/10 hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400"
            aria-label="Reset zoom to 100%"
          >
            {currentZoomLevel}%
          </button>
          <button
            onClick={zoomIn}
            disabled={zoom.get() >= config.maxZoom}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Zoom in (+)"
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
              aria-label="Previous image (Left arrow)"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              aria-label="Next image (Right arrow)"
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
