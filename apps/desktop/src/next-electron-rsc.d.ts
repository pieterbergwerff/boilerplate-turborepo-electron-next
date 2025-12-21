/**
 * Type declarations for next-electron-rsc build entry.
 */
declare module 'next-electron-rsc/lib/build/index.js' {
  import type { Protocol, Session } from 'electron';
  import type { default as createServerNext } from 'next';

  type NextServerOptions = Parameters<typeof createServerNext>[0];

  export function createHandler(
    options: Omit<NextServerOptions, 'conf'> & {
      conf?: NextServerOptions['conf'];
      protocol: Protocol;
      debug?: boolean;
    }
  ): {
    localhostUrl: string;
    createInterceptor: (options: { session: Session }) => Promise<() => void>;
  };
}
