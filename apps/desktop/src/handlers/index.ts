// import utils
import { ipcMain } from 'electron';

// import handlers
import appGetInfoHandler from './app.get-info.handler.js';
import settingsGetHandler from './settings.get.handler.js';
import settingsUpdateHandler from './settings.update.handler.js';
import fsOpenDialogHandler from './fs.open-dialog.handler.js';

/**
 * Register all IPC handlers with Zod validation.
 * @returns {void}
 */
export const registerIpcHandlers = (): void => {
  ipcMain.handle('app:get-info', appGetInfoHandler);
  ipcMain.handle('settings:get', settingsGetHandler);
  ipcMain.handle('settings:update', settingsUpdateHandler);
  ipcMain.handle('fs:openDialog', fsOpenDialogHandler);
};

export default registerIpcHandlers;
