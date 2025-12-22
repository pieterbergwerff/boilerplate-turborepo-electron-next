// import utils
import {
  detectOsFromUserAgentUtil as detectOsFromUserAgent,
  detectColorSchemePreferenceUtil as detectColorSchemePreference,
} from './utils.js';

// import hooks
import { useState, useLayoutEffect } from 'react';

// import types
import type {
  ThemeProviderProps,
  UseThemeProviderReturnType,
} from '@packages/types';
import type {
  OsThemeValidatorType,
  AppInfoValidatorType,
  SettingsValidatorType,
} from '@packages/validators';

/**
 * Custom hook to manage theme state.
 * @returns {void}
 */
export const useThemeProvider = ({
  defaultOSTheme = 'windows',
}: Pick<ThemeProviderProps, 'defaultOSTheme'>): UseThemeProviderReturnType => {
  const [osTheme, setOSTheme] = useState<OsThemeValidatorType>(defaultOSTheme);
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('light');
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(false);

    if (typeof window !== 'undefined' && window.api) {
      Promise.all([window.api.getAppInfo(), window.api.getSettings()]).then(
        ([info, settings]: [AppInfoValidatorType, SettingsValidatorType]) => {
          setOSTheme(info.osTheme);
          setColorScheme(settings.theme);
        }
      );
    } else {
      setOSTheme(detectOsFromUserAgent());
      setColorScheme(detectColorSchemePreference());
    }
  }, []);

  return { loading, osTheme, colorScheme };
};

export default useThemeProvider;
