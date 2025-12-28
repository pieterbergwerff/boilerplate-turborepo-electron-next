// import utils
const path = require('path');
const { app, BrowserWindow, protocol, Menu } = require('electron');

import waitForDevServer from './utils/waitForDevServer.util.js';
import getMenu from './utils/getMenu.util.js';
import detectOSTheme from './utils/detectOSTheme.util.js';
import loadEnv from './utils/loadEnv.util.js';
import getKnex from './utils/getKnex.util.js';

// Import from the built lib workspace within the next-electron-rsc monorepo
const { createHandler } = require('next-electron-rsc/lib/build/index.js');
const { registerIpcHandlers } = require('./handlers/index.js');

// import types
import type { Knex } from 'knex';
import type { OsThemeValidatorType } from '@packages/validators';
import type { BrowserWindow as BrowserWindowType } from 'electron';

let win: BrowserWindowType | undefined;
let knexInstance: Knex | undefined;
let ipcRegistered = false;
let interceptorStop: (() => void) | undefined;
let nextUrl: string | undefined;

// Load .env file and detect OS theme
loadEnv(app.getAppPath());
const osTheme: OsThemeValidatorType = detectOSTheme(process.platform);

/**
 * Create the main BrowserWindow and wire Next handler.
 * @returns {Promise<void>} Resolves when window is ready
 */
async function createWindow(): Promise<void> {
  const isPackaged = app.isPackaged;
  const useStandalone =
    isPackaged || process.env.ELECTRON_USE_STANDALONE === 'true';
  const knex = await getKnex();
  if (!ipcRegistered) {
    registerIpcHandlers();
    ipcRegistered = true;
  }

  win = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      sandbox: true,
      nodeIntegration: false,
    },
  });

  let url: string;
  if (!useStandalone) {
    // In dev mode, wait for the Next.js dev server to be ready
    const devUrl = 'http://localhost:3000';
    await waitForDevServer(devUrl);
    url = devUrl;
  } else {
    // Use next-electron-rsc with the built output
    if (!interceptorStop || !nextUrl) {
      // With asar: false, app files are in Contents/Resources/app/
      // In packaged mode: process.resourcesPath points to Contents/Resources/
      const appDir = isPackaged
        ? path.join(
            process.resourcesPath,
            'app',
            'nextjs-standalone',
            'apps',
            'app'
          )
        : path.join(app.getAppPath(), 'nextjs-standalone', 'apps', 'app');
      const { localhostUrl, createInterceptor } = createHandler({
        protocol,
        dir: appDir,
        dev: false,
      });
      nextUrl = localhostUrl;
      interceptorStop = await createInterceptor({
        session: win.webContents.session,
      });
    }
    url = nextUrl ?? 'http://localhost:3000';
  }

  Menu.setApplicationMenu(Menu.buildFromTemplate(getMenu({ win })));
  await win.loadURL(url);
}

/**
 * Enforce single instance and bootstrap app lifecycle.
 * @returns {void}
 */
function bootstrap(): void {
  const gotLock = app.requestSingleInstanceLock();
  if (!gotLock) {
    app.quit();
    return;
  }

  app.on('second-instance', () => {
    if (win) {
      if (win.isMinimized()) win.restore();
      win.focus();
    }
  });

  app
    .whenReady()
    .then(async () => {
      await createWindow();
    })
    .catch(e => {
      console.error(e);
      app.quit();
    });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      void createWindow();
    }
  });

  app.on('before-quit', () => {
    if (interceptorStop) {
      interceptorStop();
      interceptorStop = undefined;
    }
    if (knexInstance) {
      void knexInstance
        .destroy()
        .catch(err => console.error('[DESKTOP] Failed to close DB:', err));
      knexInstance = undefined;
    }
  });
}

bootstrap();
