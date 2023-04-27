import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export const Portal = ({ children, selector }) => {
  const [mounted, setMounted] = useState(false);
  const [container, setContainer] = useState(null);

  useEffect(() => {
    const el = document.querySelector(selector);
    setContainer(el);
    setMounted(true);
    return () => {
      setMounted(false);
      setContainer(null);
    };
  }, [selector]);

  return mounted ? createPortal(children, container) : null;
};
