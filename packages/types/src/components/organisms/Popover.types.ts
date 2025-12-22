// import types
import type { ReactNode } from 'react';

export interface PopoverOrganismPropTypes {
  trigger: ReactNode;
  content: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}
