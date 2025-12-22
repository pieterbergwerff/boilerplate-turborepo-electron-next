// import types
import type { OsThemeValidatorType } from '@packages/validators';

/**
 * Detect OS theme from user agent (for non-Electron environments).
 * @returns {OsThemeValidatorType} OS theme
 */
export function detectOsFromUserAgentUtil(): OsThemeValidatorType {
  if (typeof window === 'undefined') return 'windows';
  const userAgent = navigator.userAgent.toLowerCase();
  if (userAgent.includes('mac')) return 'osx';
  if (userAgent.includes('linux')) return 'linux';
  return 'windows';
}

/**
 * Detect color scheme preference from system.
 * @returns {'light' | 'dark'} Color scheme
 */
export function detectColorSchemePreferenceUtil(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}
