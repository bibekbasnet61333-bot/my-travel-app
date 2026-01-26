// Custom hook for gallery image viewer
// Handles zoom, pan, keyboard, and touch interactions
// Optimized with motion values for smooth animations without re-renders

import { useCallback, useRef, useEffect, useState } from 'react';
import { IMAGE_VIEWER_CONFIG } from '../../data/gallery/galleryConfig';

const useImageViewer = (images = [], initialIndex = 0, zoomMotion, positionXMotion, positionYMotion) => {
  // Use state for current index to ensure proper re-renders and event listener updates
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isResetting, setIsResetting] = useState(false);

  // Refs for values accessed in event handlers
  const currentIndexRef = useRef(initialIndex);
  const imagesRef = useRef(images);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const touchStartRef = useRef({ x: 0, y: 0 });
  const pinchStartRef = useRef({ distance: 0, zoom: 1 });
  const isTouchingRef = useRef(false);

  const config = IMAGE_VIEWER_CONFIG;

  // Sync ref when state changes
  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  // Sync ref when images change
  useEffect(() => {
    imagesRef.current = images;
  }, [images]);

  // Validate bounds
  const validateZoom = useCallback((value) => {
    return Math.min(Math.max(value, config.minZoom), config.maxZoom);
  }, [config.minZoom, config.maxZoom]);

  // Current image
  const currentImage = images[currentIndex] || '';

  // Get zoom/position from motion values
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
    setIsResetting(true);
    if (zoomMotion) zoomMotion.set(1);
    if (positionXMotion) positionXMotion.set(0);
    if (positionYMotion) positionYMotion.set(0);
    setTimeout(() => setIsResetting(false), 50);
  }, [zoomMotion, positionXMotion, positionYMotion]);

  // Navigate to next image
  const nextImage = useCallback(() => {
    const len = imagesRef.current.length;
    if (len > 1) {
      const next = (currentIndexRef.current + 1) % len;
      setCurrentIndex(next);
      resetState();
    }
  }, [resetState]);

  // Navigate to previous image
  const prevImage = useCallback(() => {
    const len = imagesRef.current.length;
    if (len > 1) {
      const prev = (currentIndexRef.current - 1 + len) % len;
      setCurrentIndex(prev);
      resetState();
    }
  }, [resetState]);

  // Go to specific image
  const goToImage = useCallback((index) => {
    const len = imagesRef.current.length;
    if (index >= 0 && index < len) {
      setCurrentIndex(index);
      resetState();
    }
  }, [resetState]);

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

  // Mouse drag handlers - improved for smoother panning
  const handleMouseDown = useCallback((e) => {
    const currentZoom = getZoom();
    if (currentZoom > 1) {
      isDraggingRef.current = true;
      const pos = getPosition();
      dragStartRef.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
      e.preventDefault();
    }
  }, [getZoom, getPosition]);

  const handleMouseMove = useCallback((e) => {
    if (isDraggingRef.current) {
      const currentZoom = getZoom();
      if (currentZoom > 1) {
        const sensitivity = 1 / currentZoom; // Reduce sensitivity at higher zoom
        const newPos = {
          x: (e.clientX - dragStartRef.current.x) * sensitivity,
          y: (e.clientY - dragStartRef.current.y) * sensitivity
        };
        if (positionXMotion) positionXMotion.set(newPos.x);
        if (positionYMotion) positionYMotion.set(newPos.y);
      }
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

  // Get center point between two touches
  const getTouchCenter = useCallback((touches) => {
    return {
      x: (touches[0].clientX + touches[1].clientX) / 2,
      y: (touches[0].clientY + touches[1].clientY) / 2
    };
  }, []);

  // Touch handlers for mobile swipe and pinch zoom - improved
  const handleTouchStart = useCallback((e) => {
    if (e.touches.length === 2 && config.enablePinchZoom) {
      e.preventDefault();
      pinchStartRef.current = {
        distance: getTouchDistance(e.touches),
        zoom: getZoom(),
        center: getTouchCenter(e.touches),
        startX: positionXMotion ? positionXMotion.get() : 0,
        startY: positionYMotion ? positionYMotion.get() : 0
      };
      isTouchingRef.current = true;
    } else if (e.touches.length === 1) {
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        time: Date.now()
      };
      isTouchingRef.current = false;
    }
  }, [config.enablePinchZoom, getTouchDistance, getTouchCenter, getZoom, positionXMotion, positionYMotion]);

  const handleTouchMove = useCallback((e) => {
    if (e.touches.length === 2 && config.enablePinchZoom && isTouchingRef.current) {
      e.preventDefault();
      const currentDistance = getTouchDistance(e.touches);
      const scale = currentDistance / pinchStartRef.current.distance;
      const newZoom = validateZoom(pinchStartRef.current.zoom * scale);
      if (zoomMotion) zoomMotion.set(newZoom);
    }
  }, [config.enablePinchZoom, getTouchDistance, validateZoom, zoomMotion]);

  const handleTouchEnd = useCallback((e) => {
    // Handle swipe navigation
    if (config.enableTouchSwipe && e.changedTouches.length === 1 && !isTouchingRef.current) {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const diffX = touchStartRef.current.x - touchEndX;
      const diffY = touchStartRef.current.y - touchStartRef.current.y;
      const timeDiff = Date.now() - touchStartRef.current.time;

      // Only consider it a swipe if it's horizontal and quick enough
      if (Math.abs(diffX) > 60 && Math.abs(diffX) > Math.abs(diffY) && timeDiff < 500) {
        if (diffX > 0) {
          nextImage();
        } else {
          prevImage();
        }
        return;
      }
    }

    pinchStartRef.current = { distance: 0, zoom: 1 };
    isTouchingRef.current = false;
  }, [config.enableTouchSwipe, nextImage, prevImage]);

  // Reset on index change or when images change
  useEffect(() => {
    resetState();
  }, [currentIndex, images, resetState]);

  // Check navigation availability
  const canNavigate = images.length > 1;

  return {
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
    canNavigate,
    isResetting
  };
};

export default useImageViewer;

