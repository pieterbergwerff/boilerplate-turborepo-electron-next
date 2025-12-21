// import utils
import path from 'node:path';
import { test, expect } from '@playwright/test';
import { _electron as electron } from 'playwright';

test('launches Electron and loads Settings', async () => {
  const appPath = path.resolve(__dirname, '../../../apps/desktop');
  const app = await electron.launch({
    args: [appPath],
    env: { ...process.env, ELECTRON_USE_STANDALONE: 'true' },
  });
  const win = await app.firstWindow();
  await expect(win).toHaveTitle(/.+/);
  await win.goto('http://localhost:3000/settings');
  await win.waitForSelector('text=Settings');
  await app.close();
});
