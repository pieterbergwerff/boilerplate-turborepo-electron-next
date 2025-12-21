// import components
import React from 'react';
// import types
export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

/**
 * Divider component for visual separation.
 * @param {DividerProps} props Component props
 * @returns {React.JSX.Element} Divider element
 */
export function Divider({
  orientation = 'horizontal',
  className = '',
}: DividerProps): React.JSX.Element {
  const orientationClasses =
    orientation === 'horizontal' ? 'w-full h-px' : 'h-full w-px';

  return <div className={`bg-gray-300 ${orientationClasses} ${className}`} />;
}
