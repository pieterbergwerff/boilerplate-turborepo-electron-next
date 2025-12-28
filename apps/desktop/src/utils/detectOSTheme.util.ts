// import types
import type { OsThemeValidatorType } from '@packages/validators';

/**
 * Detect OS theme from environment variable or platform.
 * Priority: THEME env var -> platform detection
 * @param {NodeJS.Platform} platform Process platform (win32, darwin, linux)
 * @returns {ThemeValidatorType} OS theme identifier
 */
export function detectOSThemeUtil(
  platform: NodeJS.Platform
): OsThemeValidatorType {
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

export default detectOSThemeUtil;
