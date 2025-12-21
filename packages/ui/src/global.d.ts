// import types
import type { AppInfo, Settings } from '@packages/validators';

// Extend Window interface for Electron IPC
declare global {
  interface Window {
    api?: {
      getAppInfo: () => Promise<AppInfo>;
      getSettings: () => Promise<Settings>;
    };
  }
}

export {};
