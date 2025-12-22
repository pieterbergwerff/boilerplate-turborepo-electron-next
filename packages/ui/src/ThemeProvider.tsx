'use client';

// import hooks
import { createContext, useContext, useEffect, useState } from 'react';

// import types
import type { JSX } from 'react';
import type {
  OsThemeValidatorType,
  AppInfoValidatorType,
  SettingsValidatorType,
} from '@packages/validators';
import type { ThemeContextValue, ThemeProviderProps } from '@packages/types';

const ThemeContext = createContext<ThemeContextValue>({
  osTheme: 'windows',
  colorScheme: 'light',
});

/**
 * Detect OS theme from user agent (for non-Electron environments).
 * @returns {OsThemeValidatorType} OS theme
 */
function detectOsFromUserAgent(): OsThemeValidatorType {
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
function detectColorSchemePreference(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

/**
 * Theme provider that manages OS theme and color scheme.
 * @param {ThemeProviderProps} props Provider props
 * @returns {JSX.Element} Theme provider
 */
export function ThemeProvider({
  children,
  defaultOSTheme = 'windows',
}: ThemeProviderProps): JSX.Element {
  // Always start with defaults to ensure server/client match on first render
  const [osTheme, setOSTheme] = useState<OsThemeValidatorType>(defaultOSTheme);
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Check if running in Electron
    if (typeof window !== 'undefined' && window.api) {
      // Get OS theme from Electron
      window.api
        .getAppInfo()
        .then((info: AppInfoValidatorType) => {
          setOSTheme(info.osTheme);
        })
        .catch(console.error);

      // Get initial color scheme (light/dark)
      window.api
        .getSettings()
        .then((settings: SettingsValidatorType) => {
          setColorScheme(settings.theme);
        })
        .catch(console.error);
    } else {
      // Detect from browser after mount to avoid hydration mismatch
      setOSTheme(detectOsFromUserAgent());
      setColorScheme(detectColorSchemePreference());
    }
  }, []);

  // Don't render theme-dependent attributes until mounted to avoid hydration issues
  return (
    <ThemeContext.Provider value={{ osTheme, colorScheme }}>
      <div
        style={{ height: '100vh', width: '100vw' }}
        {...(mounted
          ? { 'data-os-theme': osTheme, 'data-color-scheme': colorScheme }
          : {})}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

/**
 * Hook to access theme context.
 * @returns {ThemeContextValue} Theme context value
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
