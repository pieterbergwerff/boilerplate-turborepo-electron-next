// import utils
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { existsSync, mkdirSync, copyFileSync } from 'node:fs';
// import constants
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_FILE = 'app.sqlite';
// import components
import { app, BrowserWindow, protocol, Menu } from 'electron';
// import types
import type { Knex } from 'knex';

// @ts-expect-error - next-electron-rsc is a monorepo with the lib in a subfolder
import { createHandler, createInterceptor } from '../../../node_modules/next-electron-rsc/lib/build/index.js';
import { createDb, runMigrations } from '@packages/database';
import { registerIpcHandlers } from './ipc.js';

let win: BrowserWindow | undefined;

/**
 * Ensure runtime SQLite exists and is seeded.
 * @param {boolean} isDev Whether app runs in dev mode
 * @returns {string} Absolute runtime DB path
 */
function ensureDb(isDev: boolean): string {
  const dest = path.join(app.getPath('userData'), DB_FILE);
  if (!existsSync(dest)) {
    const src = isDev
      ? path.join(process.cwd(), '..', '..', 'packages', 'database', 'seed', DB_FILE)
      : path.join(process.resourcesPath, DB_FILE);
    mkdirSync(path.dirname(dest), { recursive: true });
    copyFileSync(src, dest);
  }
  return dest;
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
 * @returns {Promise<{ knex: Knex }>} Dependencies created for later use
 */
async function createWindow(): Promise<{ knex: Knex }> {
  const isDev = !app.isPackaged;
  const dbPath = ensureDb(isDev);
  const knex = createDb(dbPath);
  await runMigrations(knex, dbPath);

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
  if (isDev) {
    // In dev mode, use the existing Next.js dev server
    url = 'http://localhost:3000';
  } else {
    // In production, use next-electron-rsc to serve the standalone build
    const { localhostUrl, createInterceptor } = createHandler({
      protocol,
      dir: path.join(process.resourcesPath, 'apps', 'app'),
      dev: false,
    });
    const interceptor = await createInterceptor({ session: win.webContents.session });
    app.on('quit', interceptor);
    url = localhostUrl;
  }

  buildMenu();
  await win.loadURL(url);

  return { knex };
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
      const { knex } = await createWindow();
      registerIpcHandlers({ app, knex });
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
      void createWindow().then(({ knex }) =>
        registerIpcHandlers({ app, knex })
      );
    }
  });
}

bootstrap();
