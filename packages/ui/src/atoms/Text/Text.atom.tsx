// import types
import type { JSX } from 'react';
import type { TextAtomPropTypes } from '@packages/types';

/**
 * Text component for typography.
 * @param {TextAtomPropTypes} props Component props
 * @returns {JSX.Element} Text element
 */
export const TextAtomComponent = ({
  children,
  as: Component = 'p',
  size = 'base',
  weight = 'normal',
  className = '',
}: TextAtomPropTypes): JSX.Element => {
  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
  };

  const weightClasses = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };

  return (
    <Component
      className={`${sizeClasses[size]} ${weightClasses[weight]} ${className}`}
    >
      {children}
    </Component>
  );
};

export default TextAtomComponent;
