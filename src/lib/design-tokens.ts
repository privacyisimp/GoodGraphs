/**
 * Design System Tokens
 * Authority Palette - for growth/financial stories
 */

export const colors = {
  // Primary palette
  primary: '#0f172a',      // deep slate
  accent: '#3b82f6',       // confident blue
  highlight: '#f59e0b',    // warm amber
  success: '#10b981',      // emerald
  danger: '#ef4444',       // red

  // Backgrounds
  background: '#ffffff',
  surface: '#f8fafc',      // subtle gray

  // Text
  textPrimary: '#0f172a',
  textSecondary: '#64748b',

  // Borders
  border: '#e2e8f0',
} as const;

export const typography = {
  // Font family
  fontFamily: 'Inter, system-ui, -apple-system, sans-serif',

  // Font sizes
  heroNumber: '72px',
  sectionTitle: '24px',
  dataLabel: '14px',
  axisLabel: '12px',

  // Font weights
  light: 400,
  medium: 500,
  semibold: 600,
  bold: 700,

  // Letter spacing
  tight: '-0.02em',
} as const;

export const spacing = {
  base: 4,
  xs: 8,
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
  xxl: 64,
} as const;

export const borderRadius = {
  default: '8px',
} as const;

export const shadows = {
  subtle: '0px 2px 8px rgba(0,0,0,0.04)',
  card: '0px 4px 12px rgba(0,0,0,0.08)',
} as const;

export const gradients = {
  accent: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
} as const;

// Chart-specific tokens
export const chartTokens = {
  padding: spacing.lg,
  minHeight: 400,
  maxHeight: 600,
} as const;
