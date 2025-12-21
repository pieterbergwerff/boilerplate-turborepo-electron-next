// import components
import { ClientProviders } from '../components/ClientProviders.js';
// import types
import type { Metadata } from 'next';
// import styles
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'Electron + Next.js App',
  description: 'A modern Electron app built with Next.js and Turborepo',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head></head>
      <body className="min-h-screen bg-gray-50">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
