// import utils
const path = require('path');
const { existsSync, mkdirSync, copyFileSync } = require('fs');
const { app, BrowserWindow, protocol, Menu } = require('electron');
const { createHandler } = require('next-electron-rsc/lib/build/index.js');
const { createDb, runMigrations } = require('@packages/database');
const { registerIpcHandlers } = require('./ipc.js');
const { loadEnv, detectOSTheme } = require('./theme.js');

// import types
import type { Knex } from 'knex';
import type { OsThemeValidatorType } from '@packages/validators';
import type { BrowserWindow as BrowserWindowType } from 'electron';

const DB_FILE = 'app.sqlite';

let win: BrowserWindowType | undefined;
let knexInstance: Knex | undefined;
let ipcRegistered = false;
let interceptorStop: (() => void) | undefined;
let nextUrl: string | undefined;

// Load .env file and detect OS theme
loadEnv(app.getAppPath());
const osTheme: OsThemeValidatorType = detectOSTheme(process.platform);

/**
 * Ensure runtime SQLite exists and is seeded.
 * @param {boolean} isDev Whether app runs in dev mode
 * @returns {string} Absolute runtime DB path
 */
function ensureDb(isDev: boolean): string {
  const dest = path.join(app.getPath('userData'), DB_FILE);
  if (!existsSync(dest)) {
    let src: string;
    if (isDev) {
      // In development/test, look for seed DB in packages/database/seed
      // app.getAppPath() returns apps/desktop, so go up to workspace root
      const workspaceRoot = path.join(app.getAppPath(), '..', '..');
      src = path.join(workspaceRoot, 'packages', 'database', 'seed', DB_FILE);
    } else {
      // In production (packaged), seed DB is in resources folder
      src = path.join(process.resourcesPath, DB_FILE);
    }

    if (!existsSync(src)) {
      throw new Error(`Seed database not found at: ${src}`);
    }

    mkdirSync(path.dirname(dest), { recursive: true });
    copyFileSync(src, dest);
  }
  return dest;
}

/**
 * Initialize and reuse a single Knex instance.
 * @returns {Promise<Knex>} Knex instance
 */
async function getKnex(): Promise<Knex> {
  if (knexInstance) return knexInstance;
  const dbPath = ensureDb(!app.isPackaged);
  knexInstance = createDb(dbPath);
  await runMigrations(knexInstance, dbPath);
  return knexInstance;
}

/**
 * Build the native menu and bind theme actions.
 * @returns {void}
 */
function buildMenu(): void {
  const template: Electron.MenuItemConstructorOptions[] = [
    { label: 'File', submenu: [{ role: 'quit' }] },
    { label: 'Edit', submenu: [{ role: 'copy' }, { role: 'paste' }] },
    {
      label: 'View',
      submenu: [{ role: 'reload' }, { role: 'toggleDevTools' }],
    },
    {
      label: 'Theme',
      submenu: [
        {
          label: 'Light',
          click: () => win?.webContents.send('menu:theme', 'light'),
        },
        {
          label: 'Dark',
          click: () => win?.webContents.send('menu:theme', 'dark'),
        },
      ],
    },
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

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
    registerIpcHandlers({ app, knex, osTheme });
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
    // In dev mode, use the existing Next.js dev server
    url = 'http://localhost:3000';
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

  buildMenu();
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
