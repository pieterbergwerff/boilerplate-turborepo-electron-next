'use client';

// import hooks
import { useSyncExternalStore } from 'react';

/**
 * Hook to detect if code is running on the client side.
 * @returns {boolean} True if running on client, false during SSR
 */
export const useIsClientHook = (): boolean =>
  useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

export default useIsClientHook;
