import { useState, useEffect } from 'react';

const useTimedPopup = (initialIsOpen = false, timeout = 4000) => {
  const [isOpen, setIsOpen] = useState(initialIsOpen);

  useEffect(() => {
    let timeoutId;

    if (isOpen) {
      timeoutId = setTimeout(() => {
        setIsOpen(false);
      }, timeout);
    }

    return () => clearTimeout(timeoutId);
  }, [isOpen, timeout]);

  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    openPopup,
    closePopup,
  };
};

export { useTimedPopup };
