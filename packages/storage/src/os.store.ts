// import utils
import { makeAutoObservable } from 'mobx';
import { detectOsFromUserAgent } from '@utils/client';

// import types
import type { OSType } from '@packages/types';

class OsStore {
  private _os: OSType = 'windows';
  private _initialized = false;

  constructor() {
    makeAutoObservable(this);
  }

  async init() {
    if (typeof window !== 'undefined' && window.api) {
      const { platform } = await window.api.getAppInfo();

      if (!!platform && platform !== this._os) {
        this.setOs(platform as OSType);
      } else {
        this.setOs(detectOsFromUserAgent());
      }
      this._initialized = true;
    }
  }

  isInitialized(): boolean {
    return this._initialized;
  }

  getOs(): OSType {
    if (!this._os) {
      this._os = detectOsFromUserAgent();
    }
    return this._os;
  }

  setOs(os: OSType): void {
    this._os = os;
  }
}

export const osStoreInstance = new OsStore();
