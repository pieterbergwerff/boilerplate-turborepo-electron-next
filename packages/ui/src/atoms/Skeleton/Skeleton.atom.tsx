// import types
import type { JSX, CSSProperties } from 'react';
import type { SkeletonAtomPropTypes } from '@packages/types';

/**
 * Skeleton component for loading states.
 * @param {SkeletonAtomPropTypes} props Component props
 * @returns {JSX.Element} Skeleton element
 */
export const SkeletonAtomComponent = ({
  width,
  height = 20,
  circle = false,
  className = '',
}: SkeletonAtomPropTypes): JSX.Element => {
  const style: CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  return (
    <div
      style={style}
      className={`bg-gray-300 animate-pulse ${circle ? 'rounded-full' : 'rounded'} ${className}`}
    />
  );
};

export default SkeletonAtomComponent;
