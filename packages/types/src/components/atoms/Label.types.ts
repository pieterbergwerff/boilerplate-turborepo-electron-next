// import types
import type { ReactNode } from 'react';
import type BoxAtomComponentPropTypes from './Box.types.js';
export interface LabelAtomPropTypes extends BoxAtomComponentPropTypes<'label'> {
  children: ReactNode;
  htmlFor?: string;
  required?: boolean;
}

export default LabelAtomPropTypes;
