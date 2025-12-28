// import types
import type { ElementType, ComponentPropsWithoutRef } from 'react';
import type { ClassValue } from 'clsx';

export type BoxAtomComponentPropTypes<T extends ElementType = 'div'> = {
  component?: T;
  clsx?: ClassValue;
} & ComponentPropsWithoutRef<T>;

export default BoxAtomComponentPropTypes;
