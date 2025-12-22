// import types
import type { JSX } from 'react';
import type { DividerAtomPropTypes } from '@packages/types';

/**
 * Divider component for visual separation.
 * @param {DividerAtomPropTypes} props Component props
 * @returns {JSX.Element} Divider element
 */
export const DividerAtomComponent = ({
  orientation = 'horizontal',
  className = '',
}: DividerAtomPropTypes): JSX.Element => {
  const orientationClasses =
    orientation === 'horizontal' ? 'w-full h-px' : 'h-full w-px';

  return <div className={`bg-gray-300 ${orientationClasses} ${className}`} />;
};

export default DividerAtomComponent;
