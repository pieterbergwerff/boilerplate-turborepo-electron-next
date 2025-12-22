// import types
import type {
  AppInfoValidatorType,
  SettingsValidatorType,
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
    };
  }
}

export {};
