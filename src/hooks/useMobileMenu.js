import { useState, useEffect } from 'react';

export default function useMobileMenu(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState);

  const closeMenu = () => setIsOpen(false);
  const toggleMenu = () => setIsOpen(prev => !prev);

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') closeMenu();
    };
    
    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, []);

  return { open: isOpen, toggle: toggleMenu, close: closeMenu };
}
