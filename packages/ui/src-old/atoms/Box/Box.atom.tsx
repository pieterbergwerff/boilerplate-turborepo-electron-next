// import types
import type { ElementType } from 'react';
import { createElement } from 'react';
import type { BoxAtomComponentPropTypes } from '@packages/types/components/atoms/Box.types';

/**
 * Box Atom Component
 * @param param0 - props for the Box component
 * @returns JSX.Element
 */
export const BoxAtomComponent = <T extends ElementType = 'div'>({
  component = 'div' as T,
  clsx,
  ...props
}: BoxAtomComponentPropTypes<T>) =>
  createElement(component, { className: clsx, ...props });

export default BoxAtomComponent;
