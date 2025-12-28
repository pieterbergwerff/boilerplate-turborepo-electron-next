// import types
import type {
  AppInfoValidatorType,
  SettingsValidatorType,
  ThemeValidatorType,
  OpenDialogOptionsType,
  OpenDialogResultType,
} from '@packages/validators';

/**
 * Global window interface extension for Electron API.
 */
declare global {
  interface Window {
    /**
     * Electron API exposed via preload script.
     */
    api?: {
      /**
       * Get application info including OS theme.
       * @returns {Promise<AppInfoValidatorType>} Application information
       */
      getAppInfo: () => Promise<AppInfoValidatorType>;
      /**
       * Get current settings.
       * @returns {Promise<SettingsValidatorType>} Current settings
       */
      getSettings: () => Promise<SettingsValidatorType>;
      /**
       * Update theme setting.
       * @param {ThemeValidatorType} theme Theme to set
       * @returns {Promise<SettingsValidatorType>} Updated settings
       */
      setTheme: (theme: ThemeValidatorType) => Promise<SettingsValidatorType>;
      /**
       * Open OS file dialog.
       * @param {OpenDialogOptionsType} [opts] Dialog options
       * @returns {Promise<OpenDialogResultType>} Dialog result
       */
      openDialog: (
        opts?: OpenDialogOptionsType
      ) => Promise<OpenDialogResultType>;
    };
  }
}

export {};
