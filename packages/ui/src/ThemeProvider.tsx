'use client';
// import utils
import React, { createContext, useContext, useEffect, useState } from 'react';
// import constants
// (none)
// import components
// (none)
// import types
import type { OSTheme, AppInfo, Settings } from '@packages/validators';

export interface ThemeContextValue {
  osTheme: OSTheme;
  colorScheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextValue>({
  osTheme: 'windows',
  colorScheme: 'light',
});

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultOSTheme?: OSTheme;
}

/**
 * Theme provider that manages OS theme and color scheme.
 * @param {ThemeProviderProps} props Provider props
 * @returns {React.JSX.Element} Theme provider
 */
export function ThemeProvider({
  children,
  defaultOSTheme = 'windows',
}: ThemeProviderProps): React.JSX.Element {
  const [osTheme, setOSTheme] = useState<OSTheme>(defaultOSTheme);
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Check if running in Electron
    if (typeof window !== 'undefined' && window.api) {
      // Get OS theme from Electron
      window.api
        .getAppInfo()
        .then((info: AppInfo) => {
          setOSTheme(info.osTheme);
        })
        .catch(console.error);

      // Get initial color scheme (light/dark)
      window.api
        .getSettings()
        .then((settings: Settings) => {
          setColorScheme(settings.theme);
        })
        .catch(console.error);
    } else {
      // Fallback for non-Electron environments (browser)
      // Detect OS from user agent
      const userAgent = navigator.userAgent.toLowerCase();
      if (userAgent.includes('win')) {
        setOSTheme('windows');
      } else if (userAgent.includes('mac')) {
        setOSTheme('osx');
      } else if (userAgent.includes('linux')) {
        setOSTheme('linux');
      }

      // Detect color scheme from system preferences
      if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
        setColorScheme('dark');
      }
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ osTheme, colorScheme }}>
      <div data-os-theme={osTheme} data-color-scheme={colorScheme}>
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
