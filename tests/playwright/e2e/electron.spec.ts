// import utils
import { test, expect } from '@playwright/test';
import { _electron as electron } from 'playwright';

test('launches Electron and loads Settings', async () => {
  const app = await electron.launch({ args: ['.'] });
  const win = await app.firstWindow();
  await expect(win).toHaveTitle(/.+/);
  await win.waitForSelector('text=Settings');
  await app.close();
});
