// import types
import type { JSX } from 'react';
import type { LinkAtomPropTypes } from '@packages/types';

/**
 * Link component for navigation.
 * @param {LinkAtomPropTypes} props Component props
 * @returns {JSX.Element} Link element
 */
export const LinkAtomComponent = ({
  href,
  children,
  external = false,
  className = '',
}: LinkAtomPropTypes): JSX.Element => {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={`text-blue-600 hover:text-blue-800 underline ${className}`}
    >
      {children}
    </a>
  );
};

export default LinkAtomComponent;
