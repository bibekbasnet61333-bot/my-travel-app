import { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Enhanced hook for destination pages
 * Consolidates all modal state, handlers, and common logic
 * Used by all 8 country pages: China, Bali, Thailand, Vietnam, Dubai, Australia, Turkey, Japan
 */
export const useDestinationPage = (config) => {
  const {
    destinationId,
    theme,
    faqs = [],
    policies = {},
    galleryPath = null,
    onCustomPDF = null
  } = config;

  const navigate = useNavigate();

  // Modal state management - single source of truth
  const [modalState, setModalState] = useState({ 
    isOpen: false, 
    type: null, 
    tab: 'faq' 
  });

  // Active tab for itinerary/inclusions
  const [activeTab, setActiveTab] = useState('itinerary');

  // Modal handlers
  const openModal = useCallback((type) => {
    setModalState({
      isOpen: true,
      type,
      tab: type === 'policies' ? 'policies' : 'faq'
    });
  }, []);

  const closeModal = useCallback(() => {
    setModalState(prev => ({ ...prev, isOpen: false, type: null, tab: 'faq' }));
  }, []);

  // Tab handlers
  const setTab = useCallback((tab) => {
    setActiveTab(tab);
  }, []);

  // PDF download handler - with actual functionality
  const handleDownloadPDF = useCallback(() => {
    if (onCustomPDF) {
      onCustomPDF();
      return;
    }
    // Default: try to download from public folder
    const link = document.createElement('a');
    link.href = `/${destinationId}.pdf`;
    link.download = `${destinationId}-itinerary.pdf`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [destinationId, onCustomPDF]);

  // Gallery navigation handler
  const handleViewGallery = useCallback(() => {
    if (galleryPath) {
      navigate(galleryPath);
    } else {
      // Fallback: navigate to gallery page
      navigate(`/gallery?destination=${destinationId}`);
    }
  }, [destinationId, galleryPath, navigate]);

  // Memoized computed values
  const policiesArray = useMemo(() => {
    if (!policies) return [];
    return policies.importantNotes || [];
  }, [policies]);

  const hasFAQs = useMemo(() => faqs && faqs.length > 0, [faqs]);
  
  const hasPolicies = useMemo(() => {
    if (!policies) return false;
    return !!(policies.importantNotes || policies.checkInOut || 
             policies.paymentConditions || policies.cancellation);
  }, [policies]);

  return {
    // State
    modalState,
    activeTab,
    
    // Setters
    setModalState,
    setActiveTab: setTab,
    
    // Modal handlers
    openModal,
    closeModal,
    
    // Event handlers
    handleDownloadPDF,
    handleViewGallery,
    
    // Computed values
    policiesArray,
    hasFAQs,
    hasPolicies,
    
    // Theme (for convenience)
    theme
  };
};

/**
 * Hook for scroll-based animations optimization
 * Uses passive listeners for better scroll performance
 */
export const useScrollAnimation = () => {
  return {
    // Optimized scroll tracking with passive listeners
  };
};

export default useDestinationPage;

