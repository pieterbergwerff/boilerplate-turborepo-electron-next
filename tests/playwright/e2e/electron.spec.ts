// import utils
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { test, expect } from '@playwright/test';
import { _electron as electron } from 'playwright';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

test('launches Electron and loads Settings', async () => {
  const appPath = path.resolve(__dirname, '../../../apps/desktop');
  const mainPath = path.join(appPath, 'dist', 'main.js');
  
  // Launch Electron app in standalone mode (uses built Next.js)
  const app = await electron.launch({
    args: [mainPath],
    env: { ...process.env, ELECTRON_USE_STANDALONE: 'true' },
  });

  // Wait for the first window to be created
  const win = await app.firstWindow();

  // Wait for the page to load
  await win.waitForLoadState('domcontentloaded');

  // Verify we have a title
  await expect(win).toHaveTitle(/.+/);

  // Navigate to settings page using the internal URL
  const currentUrl = win.url();
  const baseUrl = new URL(currentUrl).origin;
  await win.goto(`${baseUrl}/settings`);

  // Wait for settings page content
  await win.waitForSelector('text=Settings', { timeout: 10000 });

  await app.close();
});
