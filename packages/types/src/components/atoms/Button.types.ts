// import types
import type { ReactNode } from 'react';

export interface ButtonAtomPropTypes {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  disabled?: boolean;
}
