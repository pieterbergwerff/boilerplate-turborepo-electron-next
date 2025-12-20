'use client';

import { useState, useEffect } from 'react';

export default function HomePage() {
  const [environment, setEnvironment] = useState<string>('Loading...');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This runs only on the client side, after hydration
    setIsClient(true);

    const isElectron =
      typeof navigator !== 'undefined' &&
      navigator.userAgent.toLowerCase().indexOf('electron') > -1;

    setEnvironment(isElectron ? 'Electron' : 'Browser');
  }, []);

  const handleButtonClick = () => {
    if (!isClient) return;

    const isElectron =
      typeof navigator !== 'undefined' &&
      navigator.userAgent.toLowerCase().indexOf('electron') > -1;

    if (
      isElectron &&
      typeof window !== 'undefined' &&
      (window as any).electronAPI
    ) {
      console.log('Running in Electron context');
    } else {
      console.log('Running in browser context');
    }
  };

  return (
    <div>
      <h1>Turborepo Electron + Next.js Boilerplate</h1>

      <div>
        <h2>🚀 Welcome to the App</h2>
        <p>
          A modern development setup with hot reload, TypeScript, and shared
          packages.
        </p>
      </div>

      <div>
        <div>
          <h3>⚡ Fast Development</h3>
          <p>Hot reload for both Next.js and Electron processes</p>
        </div>

        <div>
          <h3>📦 Monorepo Structure</h3>
          <p>Shared UI components and utilities across apps</p>
        </div>
      </div>

      <div>
        <button onClick={handleButtonClick}>Test Communication</button>

        <div>Environment: {environment}</div>
      </div>
    </div>
  );
}
