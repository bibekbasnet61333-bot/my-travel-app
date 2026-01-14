// Custom hook for gallery image viewer
// Handles zoom, pan, keyboard, and touch interactions

import { useState, useCallback, useRef, useEffect } from 'react';
import { IMAGE_VIEWER_CONFIG } from '../../data/gallery/galleryConfig';

const useImageViewer = (images = [], initialIndex = 0) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const imageRef = useRef(null);
  const dragStart = useRef({ x: 0, y: 0 });
  const touchStart = useRef({ x: 0, y: 0 });
  const pinchStart = useRef({ distance: 0, zoom: 1 });

  const config = IMAGE_VIEWER_CONFIG;

  // Validate bounds
  const validateZoom = useCallback((value) => {
    return Math.min(Math.max(value, config.minZoom), config.maxZoom);
  }, [config.minZoom, config.maxZoom]);

  // Current image
  const currentImage = images[currentIndex] || '';

  // Reset state when opening
  const resetState = useCallback(() => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  // Navigate to next image
  const nextImage = useCallback(() => {
    if (images.length > 1) {
      setCurrentIndex((prev) => (prev + 1) % images.length);
      resetState();
    }
  }, [images.length, resetState]);

  // Navigate to previous image
  const prevImage = useCallback(() => {
    if (images.length > 1) {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      resetState();
    }
  }, [images.length, resetState]);

  // Go to specific image
  const goToImage = useCallback((index) => {
    if (index >= 0 && index < images.length) {
      setCurrentIndex(index);
      resetState();
    }
  }, [images.length, resetState]);

  // Zoom in
  const zoomIn = useCallback(() => {
    setZoom((prev) => validateZoom(prev + config.zoomStep));
  }, [config.zoomStep, validateZoom]);

  // Zoom out
  const zoomOut = useCallback(() => {
    setZoom((prev) => validateZoom(prev - config.zoomStep));
  }, [config.zoomStep, validateZoom]);

  // Reset zoom
  const resetZoom = useCallback(() => {
    resetState();
  }, [resetState]);

  // Mouse drag handlers with proper cleanup
  const handleMouseDown = useCallback((e) => {
    if (zoom > 1) {
      setIsDragging(true);
      dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y };
    }
  }, [zoom, position]);

  const handleMouseMove = useCallback((e) => {
    if (isDragging && zoom > 1) {
      setPosition({
        x: e.clientX - dragStart.current.x,
        y: e.clientY - dragStart.current.y
      });
    }
  }, [isDragging, zoom]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Calculate distance between two touch points
  const getTouchDistance = useCallback((touches) => {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }, []);

  // Touch handlers for mobile swipe and pinch zoom
  const handleTouchStart = useCallback((e) => {
    if (e.touches.length === 2 && config.enablePinchZoom) {
      // Pinch gesture start
      pinchStart.current = {
        distance: getTouchDistance(e.touches),
        zoom: zoom
      };
    } else if (e.touches.length === 1) {
      // Single touch for swipe
      touchStart.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };
    }
  }, [config.enablePinchZoom, getTouchDistance, zoom]);

  const handleTouchMove = useCallback((e) => {
    if (e.touches.length === 2 && config.enablePinchZoom) {
      // Handle pinch zoom
      e.preventDefault();
      const currentDistance = getTouchDistance(e.touches);
      const scale = currentDistance / pinchStart.current.distance;
      const newZoom = validateZoom(pinchStart.current.zoom * scale);
      setZoom(newZoom);
    }
  }, [config.enablePinchZoom, getTouchDistance, validateZoom]);

  const handleTouchEnd = useCallback((e) => {
    if (!config.enableTouchSwipe) return;

    // Only handle swipe if it was a single touch gesture
    if (e.changedTouches.length === 1 && !pinchStart.current.distance) {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const diffX = touchStart.current.x - touchEndX;
      const diffY = touchStart.current.y - touchEndY;

      // Minimum swipe distance
      if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 0) {
          nextImage();
        } else {
          prevImage();
        }
      }
    }

    // Reset pinch tracking
    pinchStart.current = { distance: 0, zoom: 1 };
  }, [config.enableTouchSwipe, nextImage, prevImage]);

  // Reset on images change
  useEffect(() => {
    resetState();
  }, [images, resetState]);

  // Check navigation availability
  const canNavigate = images.length > 1;

  return {
    currentIndex,
    currentImage,
    zoom,
    position,
    isDragging,
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
    canNavigate,
    imageRef
  };
};

export default useImageViewer;

