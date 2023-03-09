import { useState, useEffect, useRef } from "react";

export const usePopup = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const ref = useRef(null);

  const toggle = () => setIsPopupVisible(!isPopupVisible);
  const close = () => setIsPopupVisible(false);
  const open = () => setIsPopupVisible(true);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsPopupVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  return {
    isPopupVisible,
    close,
    open,
    toggle,
    ref,
  };
};
