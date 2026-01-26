// Custom hook for gallery image viewer
// Handles zoom, pan, keyboard, and touch interactions
// Optimized with motion values for smooth animations without re-renders

import { useCallback, useRef, useEffect } from 'react';
import { IMAGE_VIEWER_CONFIG } from '../../data/gallery/galleryConfig';

const useImageViewer = (images = [], initialIndex = 0, zoomMotion, positionXMotion, positionYMotion) => {
  // Store motion values externally or use internal state if not provided
  const currentIndexRef = { current: initialIndex };

  const imageRef = useRef(null);
  const dragStart = useRef({ x: 0, y: 0 });
  const touchStart = useRef({ x: 0, y: 0 });
  const pinchStart = useRef({ distance: 0, zoom: 1 });
  const isDraggingRef = { current: false };

  const config = IMAGE_VIEWER_CONFIG;

  // Validate bounds
  const validateZoom = useCallback((value) => {
    return Math.min(Math.max(value, config.minZoom), config.maxZoom);
  }, [config.minZoom, config.maxZoom]);

  // Current image
  const currentImage = images[currentIndexRef.current] || '';

  // Get zoom/position from motion values or refs
  const getZoom = useCallback(() => {
    return zoomMotion ? zoomMotion.get() : 1;
  }, [zoomMotion]);

  const getPosition = useCallback(() => {
    return {
      x: positionXMotion ? positionXMotion.get() : 0,
      y: positionYMotion ? positionYMotion.get() : 0
    };
  }, [positionXMotion, positionYMotion]);

  // Reset state when opening
  const resetState = useCallback(() => {
    if (zoomMotion) zoomMotion.set(1);
    if (positionXMotion) positionXMotion.set(0);
    if (positionYMotion) positionYMotion.set(0);
  }, [zoomMotion, positionXMotion, positionYMotion]);

  // Set current index
  const setCurrentIndex = useCallback((index) => {
    currentIndexRef.current = index;
  }, []);

  // Navigate to next image
  const nextImage = useCallback(() => {
    if (images.length > 1) {
      const next = (currentIndexRef.current + 1) % images.length;
      setCurrentIndex(next);
      resetState();
    }
  }, [images.length, setCurrentIndex, resetState]);

  // Navigate to previous image
  const prevImage = useCallback(() => {
    if (images.length > 1) {
      const prev = (currentIndexRef.current - 1 + images.length) % images.length;
      setCurrentIndex(prev);
      resetState();
    }
  }, [images.length, setCurrentIndex, resetState]);

  // Go to specific image
  const goToImage = useCallback((index) => {
    if (index >= 0 && index < images.length) {
      setCurrentIndex(index);
      resetState();
    }
  }, [images.length, setCurrentIndex, resetState]);

  // Zoom in
  const zoomIn = useCallback(() => {
    const currentZoom = getZoom();
    const newZoom = validateZoom(currentZoom + config.zoomStep);
    if (zoomMotion) zoomMotion.set(newZoom);
  }, [config.zoomStep, validateZoom, zoomMotion, getZoom]);

  // Zoom out
  const zoomOut = useCallback(() => {
    const currentZoom = getZoom();
    const newZoom = validateZoom(currentZoom - config.zoomStep);
    if (zoomMotion) zoomMotion.set(newZoom);
  }, [config.zoomStep, validateZoom, zoomMotion, getZoom]);

  // Reset zoom
  const resetZoom = useCallback(() => {
    resetState();
  }, [resetState]);

  // Mouse drag handlers
  const handleMouseDown = useCallback((e) => {
    if (getZoom() > 1) {
      isDraggingRef.current = true;
      const pos = getPosition();
      dragStart.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
    }
  }, [getZoom, getPosition]);

  const handleMouseMove = useCallback((e) => {
    if (isDraggingRef.current && getZoom() > 1) {
      const newPos = {
        x: e.clientX - dragStart.current.x,
        y: e.clientY - dragStart.current.y
      };
      if (positionXMotion) positionXMotion.set(newPos.x);
      if (positionYMotion) positionYMotion.set(newPos.y);
    }
  }, [getZoom, positionXMotion, positionYMotion]);

  const handleMouseUp = useCallback(() => {
    isDraggingRef.current = false;
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
      pinchStart.current = {
        distance: getTouchDistance(e.touches),
        zoom: getZoom()
      };
    } else if (e.touches.length === 1) {
      touchStart.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };
    }
  }, [config.enablePinchZoom, getTouchDistance, getZoom]);

  const handleTouchMove = useCallback((e) => {
    if (e.touches.length === 2 && config.enablePinchZoom) {
      e.preventDefault();
      const currentDistance = getTouchDistance(e.touches);
      const scale = currentDistance / pinchStart.current.distance;
      const newZoom = validateZoom(pinchStart.current.zoom * scale);
      if (zoomMotion) zoomMotion.set(newZoom);
    }
  }, [config.enablePinchZoom, getTouchDistance, validateZoom, zoomMotion]);

  const handleTouchEnd = useCallback((e) => {
    if (!config.enableTouchSwipe) return;

    if (e.changedTouches.length === 1 && !pinchStart.current.distance) {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const diffX = touchStart.current.x - touchEndX;
      const diffY = touchStart.current.y - touchEndY;

      if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 0) {
          nextImage();
        } else {
          prevImage();
        }
      }
    }

    pinchStart.current = { distance: 0, zoom: 1 };
  }, [config.enableTouchSwipe, nextImage, prevImage]);

  // Reset on images change
  useEffect(() => {
    resetState();
  }, [images, resetState]);

  // Check navigation availability
  const canNavigate = images.length > 1;

  return {
    currentIndex: currentIndexRef.current,
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
  };
};

export default useImageViewer;

