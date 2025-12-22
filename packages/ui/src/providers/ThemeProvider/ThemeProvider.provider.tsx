'use client';

// import hooks
import useThemeProvider from './hook.js';

// import components
import { ThemeContext } from './context.js';

// import types
import type { FC, PropsWithChildren } from 'react';
import type { ThemeProviderProps } from '@packages/types';

/**
 * ThemeProvider component to wrap children with theme context.
 * Currently a placeholder for future theme-related logic.
 * @returns {JSX.Element | null} ThemeProvider element
 */
export const ThemeProviderProviderComponent: FC<
  PropsWithChildren<Pick<ThemeProviderProps, 'defaultOSTheme'>>
> = ({ children, defaultOSTheme = 'windows' }) => {
  const { loading, osTheme, colorScheme } = useThemeProvider({
    defaultOSTheme,
  });

  return (
    <ThemeContext.Provider value={{ osTheme, colorScheme }}>
      <div
        className="h-screen w-screen"
        {...(!loading
          ? { 'data-os-theme': osTheme, 'data-color-scheme': colorScheme }
          : {})}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export default ThemeProviderProviderComponent;
