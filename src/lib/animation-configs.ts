/**
 * Animation Configuration
 * Timing, easing, and choreography patterns
 */

export const timing = {
  // Primary animations
  primary: 0.8,          // 800ms
  secondary: 0.6,        // 600ms

  // Micro-interactions
  micro: 0.2,            // 200ms
  microSlow: 0.3,        // 300ms

  // Stagger delays
  stagger: 0.08,         // 80ms
  staggerSlow: 0.15,     // 150ms

  // Constraints
  min: 0.15,             // 150ms - never faster
  max: 1.2,              // 1200ms - never slower
} as const;

export const easing = {
  // Default - smooth ease-out feel
  default: [0.4, 0, 0.2, 1] as const,

  // Emphasis - premium expo-out feel
  emphasis: [0.16, 1, 0.3, 1] as const,

  // Micro - subtle interactions
  micro: [0.4, 0, 0.6, 1] as const,
} as const;

export const variants = {
  // Fade in animation
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: timing.microSlow, ease: easing.default },
  },

  // Fade in with upward motion
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: timing.secondary, ease: easing.emphasis },
  },

  // Scale in
  scaleIn: {
    initial: { scale: 0 },
    animate: { scale: 1 },
    transition: { duration: timing.microSlow, ease: easing.emphasis },
  },
} as const;

// Choreography patterns for different animation styles
export const choreography = {
  confident: {
    lineDuration: timing.primary,
    lineEasing: easing.emphasis,
    pointsStagger: timing.stagger,
    pointsDuration: timing.micro,
    labelsDelay: 0.15,
  },
  neutral: {
    lineDuration: timing.secondary,
    lineEasing: easing.default,
    pointsStagger: timing.stagger,
    pointsDuration: timing.micro,
    labelsDelay: 0.1,
  },
  cautious: {
    lineDuration: timing.primary,
    lineEasing: easing.default,
    pointsStagger: timing.staggerSlow,
    pointsDuration: timing.microSlow,
    labelsDelay: 0.2,
  },
} as const;

export type AnimationStyle = keyof typeof choreography;
