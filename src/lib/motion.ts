import type { Transition, Variants } from 'framer-motion';

/**
 * Apple Fluid Physics Spring Configuration Interface
 */
export interface AppleSpringConfig {
  type: 'spring';
  stiffness: number;
  damping: number;
  mass: number;
  restDelta?: number;
  restSpeed?: number;
}

/**
 * Canonical Apple Interactive Fluid Spring Presets
 * Derived from harmonic oscillator dynamics: F = -kx - cv
 * k = 260, c = 24, M = 0.75 gives damping ratio zeta ≈ 0.859
 */
export const appleSpring: AppleSpringConfig = {
  type: 'spring',
  stiffness: 260,
  damping: 24,
  mass: 0.75,
  restDelta: 0.001,
  restSpeed: 0.01,
};

export const gentleSpring: AppleSpringConfig = {
  type: 'spring',
  stiffness: 180,
  damping: 22,
  mass: 1.0,
  restDelta: 0.001,
  restSpeed: 0.01,
};

export const snappySpring: AppleSpringConfig = {
  type: 'spring',
  stiffness: 420,
  damping: 28,
  mass: 0.5,
  restDelta: 0.001,
  restSpeed: 0.01,
};

/**
 * Apple iOS UIScrollView Rubber-Band Resistance Function
 *
 * Attenuates overscroll / drag distance logarithmically past boundary limits.
 * Formula: f(x, d, c) = (x * d * c) / (d + c * x)
 *
 * @param offset Distance dragged past edge in pixels (can be negative or positive)
 * @param dimension Total dimension of view or viewport (e.g. innerHeight / clientWidth)
 * @param coefficient Apple standard resistance coefficient (default: 0.55)
 * @returns Attenuated rubber-band offset in pixels
 */
export function rubberBand(
  offset: number,
  dimension: number,
  coefficient: number = 0.55
): number {
  if (offset === 0 || dimension <= 0) return 0;
  const sign = Math.sign(offset);
  const abs = Math.abs(offset);
  const attenuated = (abs * dimension * coefficient) / (dimension + coefficient * abs);
  return sign * attenuated;
}

/**
 * Clamps a value within [min, max] using Apple rubber-band resistance when out of bounds.
 */
export function rubberBandClamp(
  value: number,
  min: number,
  max: number,
  dimension: number,
  coefficient: number = 0.55
): number {
  if (value < min) {
    return min - rubberBand(min - value, dimension, coefficient);
  }
  if (value > max) {
    return max + rubberBand(value - max, dimension, coefficient);
  }
  return value;
}

/**
 * Reusable Motion Configurations & Variants
 */
export const motionPresets = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: gentleSpring,
  },
  fadeSlideUp: {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 8 },
    transition: appleSpring,
  },
  scaleUp: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: appleSpring,
  },
  sheetModal: {
    initial: { y: '100%', opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: '100%', opacity: 0 },
    transition: appleSpring,
  },
  pressableCard: {
    whileHover: { y: -2, scale: 1.005 },
    whileTap: { scale: 0.985 },
    transition: snappySpring,
  },
  pressableButton: {
    whileTap: { scale: 0.96 },
    transition: snappySpring,
  },
} as const;

/**
 * Stagger Container Variants for Lists & Grids
 */
export const staggerListVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.02,
    },
  },
};

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: appleSpring,
  },
};

/**
 * Returns reduced-motion safe transitions conforming to WCAG 2.3.3.
 */
export function getReducedMotionSafeTransition(
  transition: Transition,
  prefersReducedMotion: boolean
): Transition {
  if (prefersReducedMotion) {
    return { duration: 0.01 };
  }
  return transition;
}
