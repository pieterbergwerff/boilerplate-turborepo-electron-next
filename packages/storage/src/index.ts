// Client-side observer export to avoid SSR issues
import type { ComponentType } from 'react';

type ObserverType = <T extends ComponentType>(component: T) => T;

let observer: ObserverType;
if (typeof window !== 'undefined') {
  // ESLint disable for dynamic require in client-side only code
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { observer: mobxObserver } = require('mobx-react-lite');
  observer = mobxObserver as ObserverType;
} else {
  // Server-side fallback - identity function
  observer = <T extends ComponentType>(component: T): T => component;
}

export { observer };

export * from './os.store.js';
export * from './page.store.js';
export * from './theme.store.js';
