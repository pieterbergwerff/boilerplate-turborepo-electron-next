// import types
import type { ReactNode } from 'react';

export interface TooltipMoleculePropTypes {
  children: ReactNode;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}
