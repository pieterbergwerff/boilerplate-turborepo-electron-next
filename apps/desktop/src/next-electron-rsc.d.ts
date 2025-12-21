/**
 * Type declarations for next-electron-rsc package
 */
declare module 'next-electron-rsc' {
  import type { Protocol } from 'electron';

  export interface CreateHandlerOptions {
    appDir: string;
    dev: boolean;
  }

  export interface Handler {
    localhostUrl: string;
    electronUrl: string;
  }

  export function createHandler(options: CreateHandlerOptions): Promise<Handler>;

  export function createInterceptor(protocol: Protocol, handler: Handler): void;
}
