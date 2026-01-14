import { useState, useRef, useCallback } from 'react';

export default function useDropdownHover(delayMs = 200) {
  const [isOpen, setIsOpen] = useState(false);
  const timerRef = useRef(null);

  const showDropdown = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsOpen(true);
  }, []);

  const hideDropdown = useCallback(() => {
    timerRef.current = setTimeout(() => setIsOpen(false), delayMs);
  }, [delayMs]);

  const closeImmediately = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    handleMouseEnter: showDropdown,
    handleMouseLeave: hideDropdown,
    close: closeImmediately,
  };
}
