'use client';

// import utils
import { useState } from 'react';
// import constants
// (none)
// import components
import { Button } from '@packages/ui';
// import types
// (none)

/**
 * Home page for the application.
 * @returns {React.JSX.Element} Home page content
 */
export default function HomePage(): React.JSX.Element {
  const [environment, setEnvironment] = useState('unknown');

  /**
   * Handle button click to test IPC communication.
   */
  function handleButtonClick(): void {
    console.log('Button clicked');
    setEnvironment('development');
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Turborepo Electron + Next.js Boilerplate</h1>

      <div style={{ marginTop: 16 }}>
        <h2>🚀 Welcome to the App</h2>
        <p className="text-red-500">
          Tailwind: A modern development setup with hot reload, TypeScript, and
          shared packages.
        </p>
      </div>

      <div style={{ marginTop: 16 }}>
        <Button onClick={handleButtonClick}>Example Button</Button>
      </div>

      <div style={{ marginTop: 16, display: 'flex', gap: 24 }}>
        <div>
          <h3>⚡ Fast Development</h3>
          <p>Hot reload for both Next.js and Electron processes</p>
        </div>

        <div>
          <h3>📦 Monorepo Structure</h3>
          <p>Shared UI components and utilities across apps</p>
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        <div>Environment: {environment}</div>
      </div>
    </div>
  );
}
