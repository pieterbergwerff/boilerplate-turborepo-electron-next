// import utils
import { contextBridge, ipcRenderer } from 'electron';

// import types
import type {
  AppInfoValidatorType,
  OpenDialogOptionsType,
  OpenDialogResultType,
  SettingsValidatorType,
  ThemeValidatorType,
} from '@packages/validators';

/**
 * Expose a minimal, typed API to the renderer.
 * @returns {void}
 */
function exposeApi(): void {
  contextBridge.exposeInMainWorld('api', {
    /** Get current settings. */
    getSettings: (): Promise<SettingsValidatorType> =>
      ipcRenderer.invoke('settings:get'),
    /** Update theme. */
    setTheme: (theme: ThemeValidatorType): Promise<SettingsValidatorType> =>
      ipcRenderer.invoke('settings:update', { theme }),
    /** Get app info. */
    getAppInfo: (): Promise<AppInfoValidatorType> =>
      ipcRenderer.invoke('app:get-info'),
    /** Open OS file dialog. */
    openDialog: (opts?: OpenDialogOptionsType): Promise<OpenDialogResultType> =>
      ipcRenderer.invoke('fs:openDialog', opts),
  });

  // Menu → Renderer theme bridge keeps UI in sync.
  ipcRenderer.on('menu:theme', (_e, theme: ThemeValidatorType) => {
    void ipcRenderer.invoke('settings:update', { theme });
  });
}

exposeApi();

declare global {
  var api: {
    getSettings: () => Promise<SettingsValidatorType>;
    setTheme: (theme: ThemeValidatorType) => Promise<SettingsValidatorType>;
    getAppInfo: () => Promise<AppInfoValidatorType>;
    openDialog: (opts?: OpenDialogOptionsType) => Promise<OpenDialogResultType>;
  };
}
