// import components
import AppProvider from '@packages/ui/providers/AppProvider';

// import styles
import '@packages/fonts/fonts.css';
import '@packages/ui/styles.css';

// import types
import type { Metadata } from 'next';
import type { FC, ReactNode } from 'react';

type RootLayoutPropTypes = { children: ReactNode };

const RootLayout: FC<RootLayoutPropTypes> = ({ children }) => {
  return (
    <html lang="en">
      <head></head>
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
};

export default RootLayout;

export const metadata: Metadata = {
  title: 'Electron + Next.js App',
  description: 'A modern Electron app built with Next.js and Turborepo',
};
