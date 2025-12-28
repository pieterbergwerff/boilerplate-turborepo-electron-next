// import types
import type { JSXElementConstructor } from 'react';

export type ComponentPropTypes<T> =
  T extends JSXElementConstructor<infer P> ? P : never;

export default ComponentPropTypes;
