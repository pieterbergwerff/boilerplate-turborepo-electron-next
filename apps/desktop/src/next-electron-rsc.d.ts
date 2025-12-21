/**
 * Type declarations for next-electron-rsc package installed from GitHub.
 * The package provides types in lib/build/index.d.ts, but TypeScript may have
 * trouble resolving them when installed from Git with .js extension imports.
 */
declare module 'next-electron-rsc/lib/build/index.js' {
  import type { Protocol, Session } from 'electron';

  export function createHandler(options: {
    protocol: Protocol;
    dir: string;
    dev?: boolean;
    debug?: boolean;
    hostname?: string;
    port?: number;
    [key: string]: any;
  }): {
    localhostUrl: string;
    createInterceptor: (options: { session: Session }) => Promise<() => void>;
  };
}
