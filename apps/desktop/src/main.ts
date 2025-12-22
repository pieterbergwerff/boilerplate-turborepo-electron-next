// import utils
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { existsSync, mkdirSync, copyFileSync } from 'node:fs';
import { app, BrowserWindow, protocol, Menu } from 'electron';
import { createHandler } from 'next-electron-rsc/lib/build/index.js';
import { createDb, runMigrations } from '@packages/database';
import { registerIpcHandlers } from './ipc.js';
import { loadEnv, detectOSTheme } from './theme.js';

// import types
import type { Knex } from 'knex';
import type { OsThemeValidatorType } from '@packages/validators';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_FILE = 'app.sqlite';

let win: BrowserWindow | undefined;
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
    const src = isDev
      ? path.join(
          app.getAppPath(),
          '..',
          '..',
          'packages',
          'database',
          'seed',
          DB_FILE
        )
      : path.join(process.resourcesPath, DB_FILE);
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
      const appDir = isPackaged
        ? path.join(process.resourcesPath, 'apps', 'app')
        : path.join(app.getAppPath(), '..', 'app');
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
