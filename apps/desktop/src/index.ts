const path = require('path');
const {
  app,
  BrowserWindow,
  Menu,
  shell,
  ipcMain,
  dialog,
} = require('electron');
const defaultMenu = require('electron-default-menu');
const { config } = require('dotenv');

// TypeScript type imports for CommonJS
import type { BrowserWindow as BrowserWindowType } from 'electron';

// Load environment variables
config();

let mainWindow: BrowserWindowType | null = null;

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] =
  process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] || 'true';
process.env['ELECTRON_ENABLE_LOGGING'] =
  process.env['ELECTRON_ENABLE_LOGGING'] || 'true';

// Graceful shutdown handlers
process.on('SIGTERM', () => {
  console.log('[DESKTOP] Received SIGTERM, shutting down gracefully');
  app.quit();
});
process.on('SIGINT', () => {
  console.log('[DESKTOP] Received SIGINT, shutting down gracefully');
  app.quit();
});

process.on('uncaughtException', error => {
  console.error('[DESKTOP] Uncaught Exception:', error);
  app.quit();
});

process.on('unhandledRejection', (reason, promise) => {
  console.error(
    '[DESKTOP] Unhandled Rejection at:',
    promise,
    'reason:',
    reason
  );
});

// Configuration for connecting to Next.js
const isDevelopment = !app.isPackaged;
const NEXT_SERVER_URL = isDevelopment
  ? 'http://localhost:3000'
  : 'http://localhost:3001'; // Use different port for production server

// Helper function to start a simple static file server in production
const startStaticServer = async (): Promise<void> => {
  if (isDevelopment) return; // Don't start server in development

  return new Promise((resolve, reject) => {
    try {
      const http = require('http');
      const fs = require('fs');
      const url = require('url');
      const mime = require('mime-types');

      // Try to load the Next.js build from the standalone directory
      const nextBuildPath = path.join(
        __dirname,
        '../nextjs-standalone/apps/app/.next'
      );
      const staticPath = path.join(__dirname, '../nextjs-standalone/static');

      console.log('[DESKTOP] Looking for Next.js build at:', nextBuildPath);
      console.log('[DESKTOP] Looking for static files at:', staticPath);

      const server = http.createServer((req: any, res: any) => {
        const parsedUrl = url.parse(req.url, true);
        let pathname = parsedUrl.pathname;

        console.log('[DESKTOP] Serving request for:', pathname);

        let filePath = null;
        let contentType = mime.lookup(pathname) || 'text/html';

        if (pathname === '/') {
          // Serve the actual Next.js index.html
          filePath = path.join(
            __dirname,
            '../nextjs-standalone/apps/app/.next/server/app/index.html'
          );
          contentType = 'text/html';
        } else if (pathname.startsWith('/_next/static/')) {
          // Serve static assets from the correct location
          const staticFile = pathname.replace('/_next/static/', '');
          filePath = path.join(staticPath, staticFile);
        } else {
          // Try to serve as a static file
          const staticFile = pathname.substring(1); // Remove leading slash
          filePath = path.join(staticPath, staticFile);
        }

        if (filePath && fs.existsSync(filePath)) {
          fs.readFile(filePath, (err: Error | null, data: Buffer) => {
            if (err) {
              console.error('[DESKTOP] Error reading file:', filePath, err);
              res.writeHead(404);
              res.end('File not found');
            } else {
              console.log('[DESKTOP] Successfully served:', filePath);
              res.writeHead(200, {
                'Content-Type': contentType,
                'Cache-Control': 'no-cache', // Disable caching for development
              });
              res.end(data);
            }
          });
        } else {
          console.log('[DESKTOP] File not found:', filePath);
          res.writeHead(404);
          res.end('File not found');
        }
      });

      server.listen(3001, () => {
        console.log('[DESKTOP] Static server started on http://localhost:3001');
        resolve();
      });

      server.on('error', (error: Error) => {
        console.error('[DESKTOP] Static server error:', error);
        reject(error);
      });

      // Store server reference for cleanup
      (app as any).staticServer = server;
    } catch (error) {
      console.error('[DESKTOP] Failed to start static server:', error);
      reject(error);
    }
  });
};

// Helper function to check if Next.js server is running
const waitForServer = async (
  url: string,
  maxAttempts = 30,
  delay = 1000
): Promise<boolean> => {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return true;
      }
    } catch (error) {
      // Server not ready yet, wait and try again
    }
    await new Promise(resolve => setTimeout(resolve, delay));
  }
  return false;
};

const createWindow = async () => {
  try {
    mainWindow = new BrowserWindow({
      width: 1600,
      height: 800,
      webPreferences: {
        contextIsolation: true, // protect against prototype pollution
        enableRemoteModule: false,
        nodeIntegration: false,
        devTools: isDevelopment, // Only enable devTools when running from source
        preload: path.join(__dirname, 'preload.js'),
      },
      show: false, // Don't show until ready
    });

    // Safer dev tools opening to prevent crashes
    if (isDevelopment && mainWindow) {
      mainWindow.once('ready-to-show', () => {
        if (mainWindow) {
          mainWindow.show();
          // Only open dev tools if explicitly requested or in debug mode
          if (process.env.DEBUG_ELECTRON === 'true') {
            setTimeout(() => {
              try {
                if (mainWindow) {
                  mainWindow.webContents.openDevTools();
                }
              } catch (error) {
                console.warn('[DESKTOP] Could not open dev tools:', error);
              }
            }, 1000);
          }
        }
      });
    } else if (mainWindow) {
      mainWindow.once('ready-to-show', () => {
        if (mainWindow) {
          mainWindow.show();
        }
      });
    }

    if (mainWindow) {
      mainWindow.on('closed', () => {
        mainWindow = null;
      });

      // Handle window crashes - using render-process-gone instead of crashed
      mainWindow.webContents.on('render-process-gone', (_event, details) => {
        console.error('[DESKTOP] Render process gone:', details);
        mainWindow = null;
        // Optionally restart the window
        // createWindow();
      });

      mainWindow.webContents.on('unresponsive', () => {
        console.warn('[DESKTOP] Window became unresponsive');
      });

      mainWindow.webContents.on('responsive', () => {
        console.log('[DESKTOP] Window became responsive again');
      });
    }

    Menu.setApplicationMenu(Menu.buildFromTemplate(defaultMenu(app, shell)));

    // In production, start the static file server
    if (!isDevelopment) {
      try {
        await startStaticServer();
        console.log('[DESKTOP] Static server started');
      } catch (error) {
        console.error('[DESKTOP] Failed to start static server:', error);
        dialog.showErrorBox(
          'Server Error',
          'Failed to start the application server. Please try again.'
        );
        app.quit();
        return;
      }
    }

    // Wait for Next.js server to be ready before loading
    console.log('[DESKTOP] Waiting for Next.js server at', NEXT_SERVER_URL);
    const serverReady = await waitForServer(NEXT_SERVER_URL);

    if (!serverReady) {
      const errorMessage = isDevelopment
        ? `Could not connect to Next.js development server at ${NEXT_SERVER_URL}. Please make sure the Next.js app is running.`
        : `Could not connect to Next.js server at ${NEXT_SERVER_URL}. The embedded server may have failed to start.`;

      console.error('[DESKTOP]', errorMessage);
      dialog.showErrorBox('Connection Error', errorMessage);
      app.quit();
      return;
    }

    if (mainWindow) {
      await mainWindow.loadURL(NEXT_SERVER_URL);
      console.log('[DESKTOP] Loaded', NEXT_SERVER_URL);
    }
  } catch (error) {
    console.error('[DESKTOP] Error creating window:', error);
    app.quit();
  }
};

// IPC handlers
ipcMain.handle('ping', () => {
  return 'pong';
});

ipcMain.handle('get-app-version', () => {
  return app.getVersion();
});

ipcMain.on('window-minimize', () => {
  if (mainWindow) {
    mainWindow.minimize();
  }
});

ipcMain.on('window-maximize', () => {
  if (mainWindow) {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  }
});

ipcMain.on('window-close', () => {
  if (mainWindow) {
    mainWindow.close();
  }
});

ipcMain.on('open-dev-tools', () => {
  if (mainWindow && isDevelopment) {
    mainWindow.webContents.openDevTools();
  }
});

app.whenReady().then(() => {
  createWindow();
});

app.on('window-all-closed', () => {
  // Cleanup static server
  if ((app as any).staticServer) {
    console.log('[DESKTOP] Stopping static server...');
    (app as any).staticServer.close();
  }

  // On macOS, keep the app running even when all windows are closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('before-quit', () => {
  // Cleanup static server when app is about to quit
  if ((app as any).staticServer) {
    console.log('[DESKTOP] Stopping static server before quit...');
    (app as any).staticServer.close();
  }
});

app.on('activate', () => {
  // On macOS, re-create window when dock icon is clicked
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
