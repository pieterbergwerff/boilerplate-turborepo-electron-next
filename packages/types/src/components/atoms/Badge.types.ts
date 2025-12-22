// import types
import type { ReactNode } from 'react';

export interface BadgeAtomPropTypes {
  children: ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
}
