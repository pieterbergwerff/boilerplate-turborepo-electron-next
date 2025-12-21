'use client';
// import components
import { ThemeProvider } from '@packages/ui';
// import types
import type { ReactNode } from 'react';

export interface ClientProvidersProps {
  children: ReactNode;
}

/**
 * Client-side providers wrapper.
 * @param {ClientProvidersProps} props Component props
 * @returns {React.JSX.Element} Wrapped children with providers
 */
export function ClientProviders({
  children,
}: ClientProvidersProps): React.JSX.Element {
  return <ThemeProvider>{children}</ThemeProvider>;
}
