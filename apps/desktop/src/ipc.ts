// import utils
const { ipcMain, dialog } = require('electron');
const { getSettings, updateSettings } = require('@packages/database');

// import validators
import {
  AppInfoValidator,
  OpenDialogOptionsValidator,
  OpenDialogResultValidator,
  SettingsValidator,
  SettingsUpdateInputValidator,
} from '@packages/validators';

// import types
import type { App } from 'electron';
import type { Knex } from 'knex';
import type {
  OsThemeValidatorType,
  SettingsValidatorType,
  SettingsUpdateInputValidatorType,
  OpenDialogResultType,
} from '@packages/validators';

/**
 * Register all IPC handlers with Zod validation.
 * @param {{ app: App; knex: Knex; osTheme: OsThemeValidatorType }} deps Electron app + Knex instance + OS theme
 * @returns {void}
 */
function registerIpcHandlers(deps: {
  app: App;
  knex: Knex;
  osTheme: OsThemeValidatorType;
}): void {
  const { app, knex, osTheme } = deps;

  ipcMain.handle('app:get-info', async () => {
    return AppInfoValidator.parse({
      version: app.getVersion(),
      platform: process.platform,
      arch: process.arch,
      osTheme,
    });
  });

  ipcMain.handle('settings:get', async (): Promise<SettingsValidatorType> => {
    const settings = await getSettings(knex);
    return SettingsValidator.parse(settings);
  });

  ipcMain.handle(
    'settings:update',
    async (_evt, payload: unknown): Promise<SettingsValidatorType> => {
      const input: SettingsUpdateInputValidatorType =
        SettingsUpdateInputValidator.parse(payload);
      console.log('Updating settings with input:', input);
      const updated = await updateSettings(knex, input);
      return SettingsValidator.parse(updated);
    }
  );

  ipcMain.handle(
    'fs:openDialog',
    async (_evt, payload: unknown): Promise<OpenDialogResultType> => {
      const opts = OpenDialogOptionsValidator.parse(payload);
      const res = await dialog.showOpenDialog({
        properties: ['openFile'],
        ...(opts.filters && { filters: opts.filters }),
      });
      return OpenDialogResultValidator.parse({ filePaths: res.filePaths });
    }
  );
}

module.exports = { registerIpcHandlers };
