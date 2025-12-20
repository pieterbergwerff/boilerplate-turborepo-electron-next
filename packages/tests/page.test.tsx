import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock navigator for Electron detection
beforeEach(() => {
  Object.defineProperty(navigator, 'userAgent', {
    value:
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) electron/39.2.7 Chrome/122.0.6261.156 Electron/39.2.7 Safari/537.36',
    writable: true,
    configurable: true,
  });
});

describe('HomePage Component', () => {
  it('renders the home page component successfully', async () => {
    // Import the component dynamically
    const HomePage = (await import('@repo/app/src/app/page')).default;

    render(<HomePage />);

    // Check if the main heading renders
    expect(
      screen.getByText('Turborepo Electron + Next.js Boilerplate')
    ).toBeDefined();
    expect(screen.getByText('🚀 Welcome to the App')).toBeDefined();
  });

  it('detects Electron environment', async () => {
    const HomePage = (await import('@repo/app/src/app/page')).default;

    render(<HomePage />);

    // Wait for the environment to be detected
    await waitFor(() => {
      expect(screen.getByText(/Environment: Electron/)).toBeDefined();
    });
  });

  it('renders test communication button', async () => {
    const HomePage = (await import('@repo/app/src/app/page')).default;

    render(<HomePage />);

    const button = screen.getByRole('button', { name: /Test Communication/i });
    expect(button).toBeDefined();
  });
});
