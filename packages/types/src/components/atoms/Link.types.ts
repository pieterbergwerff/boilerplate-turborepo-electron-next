// import types
import type { ReactNode } from 'react';

export interface LinkAtomPropTypes {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
}
