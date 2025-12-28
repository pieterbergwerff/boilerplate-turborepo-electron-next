'use client';

// import hooks
import { useEffect } from 'react';
import useTheme from '@packages/hooks/useTheme.hook';
import usePlatform from '@packages/hooks/usePlatform.hook';

// import components
import Box from '../../atoms/Box';

// import types
import type { FC, PropsWithChildren } from 'react';

/**
 * ThemeProvider component to wrap children with theme context.
 * Currently a placeholder for future theme-related logic.
 * @returns {JSX.Element | null} ThemeProvider element
 */
export const ThemeProviderComponent: FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren) => {
  const platform = usePlatform();
  const { isLoading, theme } = useTheme();

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;
    root.dataset.colorScheme = theme;
    root.dataset.osTheme = platform;
  }, [theme, platform]);

  if (isLoading) {
    return null;
  }

  return (
    <Box
      clsx="h-screen w-screen"
      data-color-scheme={theme}
      data-os-theme={platform}
    >
      {children}
    </Box>
  );
};

export default ThemeProviderComponent;
