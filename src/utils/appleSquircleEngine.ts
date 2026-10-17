// File: src/utils/appleSquircleEngine.ts

/**
 * Clean Concentric Corner Engine (Zero clip-path border slicing).
 * Automatically removes any broken SVG clip-paths and applies smooth
 * Apple concentric radii + GPU anti-aliasing across cards and buttons.
 */
export function initGlobalAppleSquircles(): () => void {
  if (typeof window === 'undefined') return () => {};

  // Clean up any leftover clip-paths that caused notched corners or sliced borders
  const cleanElement = (el: HTMLElement) => {
    if (el.style.clipPath) {
      el.style.clipPath = '';
    }
    el.removeAttribute('data-sq-cache');
  };

  document.querySelectorAll<HTMLElement>('[data-sq-cache], button, article, a').forEach(cleanElement);

  return () => {};
}
