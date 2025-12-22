// import components
import { AppProvider } from '@packages/ui';

// import styles
import '@packages/fonts/fonts.css';
import '../styles/globals.css';

// import types
import type { Metadata } from 'next';
import type { FC, ReactNode } from 'react';

type RootLayoutPropTypes = { children: ReactNode };

const RootLayout: FC<RootLayoutPropTypes> = ({ children }) => {
  return (
    <html lang="en">
      <head></head>
      <body className="bg-gray-50">
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
