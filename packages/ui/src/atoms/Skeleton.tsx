// import components
import React from 'react';
// import types
export interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  circle?: boolean;
  className?: string;
}

/**
 * Skeleton component for loading states.
 * @param {SkeletonProps} props Component props
 * @returns {React.JSX.Element} Skeleton element
 */
export function Skeleton({
  width,
  height = 20,
  circle = false,
  className = '',
}: SkeletonProps): React.JSX.Element {
  const style: React.CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  return (
    <div
      style={style}
      className={`bg-gray-300 animate-pulse ${circle ? 'rounded-full' : 'rounded'} ${className}`}
    />
  );
}
