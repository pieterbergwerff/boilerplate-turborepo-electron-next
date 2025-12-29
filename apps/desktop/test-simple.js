const { app, BrowserWindow } = require('electron');
const path = require('path');

/**
 * Create a simple test window
 */
async function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      sandbox: true,
      nodeIntegration: false,
    },
  });

  // Just load a simple HTML page instead of Next.js
  await win.loadURL(
    'data:text/html,<h1>Hello Electron!</h1><p>If you can see this, Electron is working fine.</p>'
  );
}

/**
 * Bootstrap simple test
 */
function bootstrap() {
  app.whenReady().then(createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
}

bootstrap();
