// import utils
// (none)
// import constants
// (none)
// import components
// (none)
// import types
import { contextBridge, ipcRenderer } from 'electron';
import type {
  AppInfo,
  OpenDialogOptions,
  OpenDialogResult,
  Settings,
  Theme,
} from '@packages/validators';

/**
 * Expose a minimal, typed API to the renderer.
 * @returns {void}
 */
function exposeApi(): void {
  contextBridge.exposeInMainWorld('api', {
    /** Get current settings. */
    getSettings: (): Promise<Settings> => ipcRenderer.invoke('settings:get'),
    /** Update theme. */
    setTheme: (theme: Theme): Promise<Settings> =>
      ipcRenderer.invoke('settings:update', { theme }),
    /** Get app info. */
    getAppInfo: (): Promise<AppInfo> => ipcRenderer.invoke('app:get-info'),
    /** Open OS file dialog. */
    openDialog: (opts?: OpenDialogOptions): Promise<OpenDialogResult> =>
      ipcRenderer.invoke('fs:openDialog', opts),
  });

  // Menu → Renderer theme bridge keeps UI in sync.
  ipcRenderer.on('menu:theme', (_e, theme: Theme) => {
    void ipcRenderer.invoke('settings:update', { theme });
  });
}

exposeApi();

declare global {
  var api: {
    getSettings: () => Promise<Settings>;
    setTheme: (theme: Theme) => Promise<Settings>;
    getAppInfo: () => Promise<AppInfo>;
    openDialog: (opts?: OpenDialogOptions) => Promise<OpenDialogResult>;
  };
}
