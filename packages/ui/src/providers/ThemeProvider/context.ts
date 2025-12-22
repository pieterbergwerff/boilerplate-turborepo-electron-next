'use client';

// import hooks
import { createContext } from 'react';

// import types
import type { ThemeContextValue } from '@packages/types';

export const ThemeContext = createContext<ThemeContextValue>({
  osTheme: 'windows',
  colorScheme: 'light',
});

export default ThemeContext;
