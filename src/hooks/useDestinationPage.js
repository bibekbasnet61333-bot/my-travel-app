import { useState, useCallback, useMemo } from 'react';

/**
 * Shared hook for destination pages
 * Reduces code duplication and provides consistent behavior
 */
export const useDestinationPage = (theme, faqs, policies) => {
  // Modal state management
  const [modalState, setModalState] = useState({ isOpen: false, type: null, tab: 'faq' });
  const [activeTab, setActiveTab] = useState('itinerary');

  // Stable modal handlers
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

  // Event handlers
  const handleDownloadPDF = useCallback(() => {
    alert('Itinerary PDF coming soon!');
  }, []);

  const handleViewGallery = useCallback(() => {
    alert('Gallery feature coming soon!');
  }, []);

  // Memoized data
  const policiesArray = useMemo(() => policies?.importantNotes || [], [policies]);

  return {
    modalState,
    setModalState,
    activeTab,
    setActiveTab,
    openModal,
    closeModal,
    setTab,
    handleDownloadPDF,
    handleViewGallery,
    policiesArray
  };
};

/**
 * Hook for scroll-based animations
 */
export const useScrollAnimation = () => {
  // Using passive listeners for better scroll performance
  return {
    // Placeholder for future scroll-based optimizations
  };
};

export default useDestinationPage;

