export type OSType = 'windows' | 'osx' | 'linux';

export type ThemeColorSchemeType = 'light' | 'dark';

export interface ThemeStoreTypes {
  osTheme: OSType;
  colorScheme: 'light' | 'dark';
}
