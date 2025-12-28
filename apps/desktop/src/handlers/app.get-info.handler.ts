// import utils
import { app } from 'electron';
import detectOSTheme from '../utils/detectOSTheme.util.js';

// import validators
import { AppInfoValidator } from '@packages/validators';

// import types
import type { OsThemeValidatorType } from '@packages/validators';

const osTheme: OsThemeValidatorType = detectOSTheme(process.platform);

/**
 * Handler to get application info.
 * @returns {Promise<{ version: string; platform: string; arch: string; osTheme: OsThemeValidatorType }>} App info
 */
export const appGetInfoHandler = async () => {
  return AppInfoValidator.parse({
    version: app.getVersion(),
    platform: process.platform,
    arch: process.arch,
    osTheme,
  });
};

export default appGetInfoHandler;
