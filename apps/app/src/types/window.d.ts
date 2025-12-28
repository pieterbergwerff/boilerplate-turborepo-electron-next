/**
 * Global window type augmentation for the Next.js app.
 * Re-exports the Electron API types from @packages/types.
 */
import type { ElectronApi } from '@packages/types';

declare global {
  interface Window {
    /**
     * Electron API exposed via contextBridge.
     * Only available in Electron renderer process.
     */
    api?: ElectronApi;
  }
}

export {};
