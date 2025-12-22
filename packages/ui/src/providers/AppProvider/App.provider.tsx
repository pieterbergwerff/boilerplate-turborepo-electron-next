// import components
import ThemeProvider from '../ThemeProvider/index.js';

// import types
import type { FC, PropsWithChildren } from 'react';

/**
 * AppProvider component to wrap the application with necessary providers.
 * Currently a placeholder for future providers.
 * @returns {JSX.Element | null
 * } AppProvider element
 */
export const AppProviderComponent: FC<PropsWithChildren> = ({ children }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

export default AppProviderComponent;
