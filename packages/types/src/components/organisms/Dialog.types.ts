// import types
import type { ReactNode } from 'react';

export interface DialogOrganismPropTypes {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
}
