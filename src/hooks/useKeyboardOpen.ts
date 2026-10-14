import { useState, useEffect } from 'react';

export function useKeyboardOpen(): boolean {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    // 1. Detect via VisualViewport height shrink (Android Chrome & iOS Safari)
    const viewport = window.visualViewport;
    const handleResize = () => {
      if (!viewport) return;
      const heightRatio = viewport.height / window.screen.height;
      setIsKeyboardOpen(heightRatio < 0.75);
    };

    // 2. Detect via input/textarea focus-in/out fallback
    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        setIsKeyboardOpen(true);
      }
    };

    const handleFocusOut = () => {
      setIsKeyboardOpen(false);
    };

    viewport?.addEventListener('resize', handleResize);
    document.addEventListener('focusin', handleFocusIn);
    document.addEventListener('focusout', handleFocusOut);

    return () => {
      viewport?.removeEventListener('resize', handleResize);
      document.removeEventListener('focusin', handleFocusIn);
      document.removeEventListener('focusout', handleFocusOut);
    };
  }, []);

  return isKeyboardOpen;
}
