// import utils
const { config } = require('dotenv');
const { existsSync } = require('fs');
const { join } = require('path');

// import types
import type { OsThemeValidatorType } from '@packages/validators';

/**
 * Load environment variables from .env file if it exists.
 * @param {string} appPath Application root path
 * @returns {void}
 */
function loadEnv(appPath: string): void {
  const envPath = join(appPath, '.env');
  if (existsSync(envPath)) {
    config({ path: envPath });
  }
}

/**
 * Detect OS theme from environment variable or platform.
 * Priority: THEME env var -> platform detection
 * @param {NodeJS.Platform} platform Process platform (win32, darwin, linux)
 * @returns {ThemeValidatorType} OS theme identifier
 */
function detectOSTheme(platform: NodeJS.Platform): OsThemeValidatorType {
  // Check THEME environment variable first
  const envTheme = process.env.THEME?.toLowerCase().trim();

  if (envTheme === 'windows' || envTheme === 'osx' || envTheme === 'linux') {
    return envTheme;
  }

  // Fall back to platform detection
  switch (platform) {
    case 'win32':
      return 'windows';
    case 'darwin':
      return 'osx';
    case 'linux':
      return 'linux';
    default:
      return 'windows'; // Default fallback
  }
}

module.exports = { loadEnv, detectOSTheme };
