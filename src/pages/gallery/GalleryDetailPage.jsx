import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import ImageViewer from '../../components/gallery/ImageViewer';
import GallerySkeleton from '../../components/gallery/GallerySkeleton';
import EmptyState from '../../components/ui/EmptyState';
import { getDestinationBySlug, getThemeByCategory } from '../../data/gallery';
import { getImageSrc, GALLERY_FALLBACK_IMAGE } from '../../utils/galleryImageUtils';

const GalleryDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  // State hooks - top level
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Track failed images with a Set stored in state for proper re-renders
  const [failedImages, setFailedImages] = useState(() => new Set());

  // Ref for focus management
  const triggerRef = useRef(null);

  // Memoized destination and theme
  const destination = useMemo(() => {
    if (!slug) return null;
    return getDestinationBySlug(slug);
  }, [slug]);

  const theme = useMemo(() => {
    if (!destination) return null;
    return getThemeByCategory(destination.category);
  }, [destination]);

  const comingSoon = destination?.comingSoon || false;

  // Loading timer
  useEffect(() => {
    if (!destination) return;
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [destination]);

  // Redirect if not found
  useEffect(() => {
    if (isLoading) return;
    if (!slug || !destination) {
      navigate('/gallery', { replace: true });
    }
  }, [slug, isLoading, destination, navigate]);

  // Handle image error - properly update state without force re-renders
  const handleImageError = useCallback((index) => {
    setFailedImages(prev => {
      const next = new Set(prev);
      next.add(index);
      return next;
    });
  }, []);

  // Check if image has failed
  const hasImageFailed = useCallback((index) => {
    return failedImages.has(index);
  }, [failedImages]);

  // Get image source with fallback
  const getImageWithFallback = useCallback((image, index) => {
    if (hasImageFailed(index)) {
      return GALLERY_FALLBACK_IMAGE;
    }
    return getImageSrc(image);
  }, [hasImageFailed]);

  // Handle image click
  const handleImageClick = useCallback((index, e) => {
    if (comingSoon) return;
    triggerRef.current = e?.currentTarget || null;
    setSelectedImageIndex(index);
    setIsViewerOpen(true);
  }, [comingSoon]);

  // Close viewer
  const closeViewer = useCallback(() => {
    setIsViewerOpen(false);
    setSelectedImageIndex(null);
    if (triggerRef.current) {
      triggerRef.current.focus();
    }
  }, []);

  // Handle keyboard navigation
  const handleItemKeyDown = useCallback((e, index) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleImageClick(index, e);
    }
  }, [handleImageClick]);

  // Early returns AFTER all hooks
  if (isLoading) {
    return <GallerySkeleton variant="hero" />;
  }

  if (!destination) {
    return null;
  }

  const { name, description, heroImage, images, imageCount } = destination;

  // Variants defined after early returns
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50">
      <Helmet>
        <title>{`${name} Gallery - ${description}`} | SASA Travel</title>
        <meta name="description" content={`Browse stunning photos from ${name}. ${description}`} />
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        {/* Background overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60 z-10" />
        
        <img
          src={heroImage}
          alt={`${name} hero image`}
          fetchpriority="high"
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Back Button - positioned to avoid text overlap, with proper z-index */}
        <button
          type="button"
          onClick={() => navigate('/gallery')}
          className="absolute top-16 left-4 sm:top-20 sm:left-6 md:top-6 md:left-6 lg:top-8 lg:left-8 z-30 flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full text-white transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400 text-xs sm:text-sm cursor-pointer"
          aria-label="Back to Gallery"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="hidden xs:inline">Back</span>
        </button>

        <div className="relative z-20 h-full flex flex-col items-center justify-center text-white px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1
              className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-3 bg-clip-text text-transparent"
              style={{ backgroundImage: theme?.titleGradient }}
            >
              {name}
            </h1>
            <p className="text-sm sm:text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
              {description}
            </p>
            {!comingSoon && (
              <p className="mt-2 sm:mt-4 text-xs sm:text-base text-amber-300">
                {imageCount} photos in this gallery
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Images Grid */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-7xl">
          {!comingSoon ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
              role="list"
              aria-label={`${name} photos`}
            >
              {images.map((image, index) => (
                <motion.button
                  key={index}
                  variants={itemVariants}
                  className="aspect-square overflow-hidden rounded-xl shadow-lg cursor-pointer group focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 relative bg-gray-200"
                  onClick={(e) => handleImageClick(index, e)}
                  onKeyDown={(e) => handleItemKeyDown(e, index)}
                  role="listitem"
                  tabIndex={0}
                  aria-label={`Photo ${index + 1} of ${imageCount} in ${name} gallery`}
                >
                  {/* Error indicator */}
                  {hasImageFailed(index) && (
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <div className="text-center text-gray-500">
                        <svg className="w-6 h-6 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-[10px]">Unavailable</span>
                      </div>
                    </div>
                  )}
                  <img
                    src={getImageWithFallback(image, index)}
                    srcSet={typeof image === 'string' ? undefined : image.srcSet}
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                    alt={`${name} photo ${index + 1}`}
                    loading={index < 2 ? 'eager' : 'lazy'}
                    fetchpriority={index < 2 ? 'high' : 'auto'}
                    decoding="async"
                    onError={() => handleImageError(index)}
                    className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ${hasImageFailed(index) ? 'opacity-50' : ''}`}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </motion.button>
              ))}
            </motion.div>
          ) : (
            <EmptyState
              Icon={(props) => (
                <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
              title="Coming Soon"
              description={`We are curating an amazing collection of photos from ${name}. Check back soon!`}
            />
          )}
        </div>
      </section>

      {/* Image Viewer Modal */}
      {isViewerOpen && images.length > 0 && (
        <ImageViewer
          images={images}
          initialIndex={selectedImageIndex || 0}
          isOpen={isViewerOpen}
          onClose={closeViewer}
        />
      )}
    </div>
  );
};

export default GalleryDetailPage;

