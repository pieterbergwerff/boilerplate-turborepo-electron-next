// import utils
// (none)
// import constants
// (none)
// import components
// (none)
// import types
import type { App } from 'electron';
import { ipcMain, dialog } from 'electron';
import type { Knex } from 'knex';
import {
  AppInfo,
  OpenDialogOptions,
  OpenDialogResult,
  Settings as SettingsSchema,
  SettingsUpdateInput as SettingsUpdateSchema,
  type Settings,
  type SettingsUpdateInput,
} from '@packages/validators';
import { getSettings, updateSettings } from '@packages/database';

/**
 * Register all IPC handlers with Zod validation.
 * @param {{ app: App; knex: Knex }} deps Electron app + Knex instance
 * @returns {void}
 */
export function registerIpcHandlers(deps: { app: App; knex: Knex }): void {
  const { app, knex } = deps;

  ipcMain.handle('app:get-info', async () => {
    return AppInfo.parse({
      version: app.getVersion(),
      platform: process.platform,
      arch: process.arch,
    });
  });

  ipcMain.handle('settings:get', async (): Promise<Settings> => {
    const settings = await getSettings(knex);
    return SettingsSchema.parse(settings);
  });

  ipcMain.handle(
    'settings:update',
    async (_evt, payload: unknown): Promise<Settings> => {
      const input: SettingsUpdateInput = SettingsUpdateSchema.parse(payload);
      const updated = await updateSettings(knex, input);
      return SettingsSchema.parse(updated);
    }
  );

  ipcMain.handle(
    'fs:openDialog',
    async (_evt, payload: unknown): Promise<OpenDialogResult> => {
      const opts = OpenDialogOptions.parse(payload);
      const res = await dialog.showOpenDialog({
        properties: ['openFile'],
        ...(opts.filters && { filters: opts.filters }),
      });
      return OpenDialogResult.parse({ filePaths: res.filePaths });
    }
  );
}
