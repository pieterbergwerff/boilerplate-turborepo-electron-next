// import utils
import { makeAutoObservable } from 'mobx';
import { detectColorSchemePreference } from '@utils/client';

// import types
import type { ThemeColorSchemeType } from '@packages/types';

class ThemeStore {
  private _colorTheme: ThemeColorSchemeType;
  private _initialized = false;

  constructor(initialColorTheme: ThemeColorSchemeType = 'light') {
    this._colorTheme = initialColorTheme;
    makeAutoObservable(this);
  }

  async init() {
    if (typeof window !== 'undefined' && window.api) {
      const { theme } = await window.api.getSettings();

      if (!!theme && theme !== this._colorTheme) {
        this.setColorTheme(theme);
      } else {
        this.setColorTheme(detectColorSchemePreference());
      }

      this._initialized = true;
    }
  }

  isInitialized(): boolean {
    return this._initialized;
  }

  get colorTheme(): ThemeColorSchemeType {
    return this._colorTheme;
  }

  setColorTheme(theme: ThemeColorSchemeType): void {
    this._colorTheme = theme;
  }

  toggleColorTheme(): void {
    this._colorTheme = this._colorTheme === 'light' ? 'dark' : 'light';
  }
}

export const themeStoreInstance = new ThemeStore();
