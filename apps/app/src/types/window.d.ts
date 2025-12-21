import type {
  AppInfo,
  OpenDialogOptions,
  OpenDialogResult,
  Settings,
  Theme,
} from '@packages/validators';

declare global {
  interface Window {
    api?: {
      getSettings: () => Promise<Settings>;
      setTheme: (theme: Theme) => Promise<Settings>;
      getAppInfo: () => Promise<AppInfo>;
      openDialog: (options?: OpenDialogOptions) => Promise<OpenDialogResult>;
    };
  }
}

export {};
