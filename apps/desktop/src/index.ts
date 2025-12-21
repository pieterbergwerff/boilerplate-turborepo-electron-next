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

// Helper function to start the Next.js standalone server in production
const startNextServer = async (): Promise<void> => {
  if (isDevelopment) return; // Don't start server in development
  
  const { spawn } = require('child_process');
  const nextServerPath = path.join(__dirname, '../nextjs-standalone/apps/app/server.js');
  
  return new Promise((resolve, reject) => {
    console.log('[DESKTOP] Starting Next.js standalone server...');
    
    const serverProcess = spawn('node', [nextServerPath], {
      env: { ...process.env, PORT: '3001' },
      stdio: ['pipe', 'pipe', 'pipe']
    });
    
    let serverStarted = false;
    
    serverProcess.stdout.on('data', (data: Buffer) => {
      const output = data.toString();
      console.log('[NEXT] ', output);
      
      if (output.includes('ready') || output.includes('started server') || output.includes('listening')) {
        if (!serverStarted) {
          serverStarted = true;
          resolve();
        }
      }
    });
    
    serverProcess.stderr.on('data', (data: Buffer) => {
      console.error('[NEXT ERROR] ', data.toString());
    });
    
    serverProcess.on('error', (error: Error) => {
      console.error('[DESKTOP] Failed to start Next.js server:', error);
      reject(error);
    });
    
    serverProcess.on('exit', (code: number | null) => {
      console.log('[DESKTOP] Next.js server exited with code:', code);
    });
    
    // Auto-resolve after timeout if we don't get explicit ready signal
    setTimeout(() => {
      if (!serverStarted) {
        serverStarted = true;
        resolve();
      }
    }, 5000);
    
    // Store process reference for cleanup
    (app as any).nextServerProcess = serverProcess;
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
      mainWindow.webContents.on('render-process-gone', (event, details) => {
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

    // In production, start the Next.js standalone server
    if (!isDevelopment) {
      try {
        await startNextServer();
        console.log('[DESKTOP] Next.js standalone server started');
      } catch (error) {
        console.error('[DESKTOP] Failed to start Next.js server:', error);
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
      console.error(
        '[DESKTOP] Could not connect to Next.js server. Make sure the Next.js app is running on',
        NEXT_SERVER_URL
      );
      // Show error dialog or exit gracefully
      const { dialog } = require('electron');
      dialog.showErrorBox(
        'Connection Error',
        `Could not connect to Next.js server at ${NEXT_SERVER_URL}. Please make sure the Next.js app is running.`
      );
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
  // Cleanup Next.js server process
  if ((app as any).nextServerProcess) {
    console.log('[DESKTOP] Stopping Next.js server...');
    (app as any).nextServerProcess.kill();
  }
  
  // On macOS, keep the app running even when all windows are closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('before-quit', () => {
  // Cleanup Next.js server process when app is about to quit
  if ((app as any).nextServerProcess) {
    console.log('[DESKTOP] Stopping Next.js server before quit...');
    (app as any).nextServerProcess.kill();
  }
});

app.on('activate', () => {
  // On macOS, re-create window when dock icon is clicked
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
