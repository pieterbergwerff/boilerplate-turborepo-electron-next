// import types
import type {
  AppInfoValidatorType,
  OpenDialogOptionsType,
  OpenDialogResultType,
  SettingsValidatorType,
  ThemeValidatorType,
} from '@packages/validators';

declare global {
  interface Window {
    api?: {
      getSettings: () => Promise<Settings>;
      setTheme: (theme: ThemeValidatorType) => Promise<SettingsValidatorType>;
      getAppInfo: () => Promise<AppInfoValidatorType>;
      openDialog: (
        options?: OpenDialogOptionsType
      ) => Promise<OpenDialogResultType>;
    };
  }
}

export {};
