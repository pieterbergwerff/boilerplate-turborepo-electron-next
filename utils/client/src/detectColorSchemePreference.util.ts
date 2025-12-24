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

export default detectColorSchemePreferenceUtil;
