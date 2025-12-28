'use client';

// import utils
import { observer } from '@packages/storage';

// import stores
import { themeStoreInstance, osStoreInstance } from '@packages/storage';

// import hooks
import { useLayoutEffect } from 'react';

// import types
import type { FC, PropsWithChildren } from 'react';

/**
 * ThemeProvider component to wrap children with theme context.
 * Currently a placeholder for future theme-related logic.
 * @returns {JSX.Element | null} ThemeProvider element
 */
export const ThemeProviderComponent: FC<PropsWithChildren> = observer(
  ({ children }: PropsWithChildren) => {
    const loading =
      themeStoreInstance.isInitialized() === false ||
      osStoreInstance.isInitialized() === false;
    const osTheme = osStoreInstance.getOs();
    const colorScheme = themeStoreInstance.colorTheme;

    useLayoutEffect(() => {
      void Promise.all([themeStoreInstance.init(), osStoreInstance.init()]);
    }, []);

    return (
      <div
        className="h-screen w-screen"
        {...(!loading
          ? { 'data-os-theme': osTheme, 'data-color-scheme': colorScheme }
          : {})}
      >
        {children}
      </div>
    );
  }
);

export default ThemeProviderComponent;
