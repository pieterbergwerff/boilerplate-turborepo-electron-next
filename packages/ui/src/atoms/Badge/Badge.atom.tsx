// import types
import type { JSX } from 'react';
import type { BadgeAtomPropTypes } from '@packages/types';

/**
 * Badge component for labels and tags with OS-specific styling.
 * @param {BadgeAtomPropTypes} props Component props
 * @returns {JSX.Element} Badge element
 */
export const BadgeAtomComponent = ({
  children,
  variant = 'default',
  size = 'md',
}: BadgeAtomPropTypes): JSX.Element => {
  const variantClasses = {
    default: 'bg-gray-200 text-gray-800',
    success: 'bg-green-200 text-green-800',
    warning: 'bg-yellow-200 text-yellow-800',
    error: 'bg-red-200 text-red-800',
  };

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5',
  };

  const osStyles = [
    // Windows 11 Fluent Design
    'windows:rounded-win',
    // macOS
    'osx:rounded-mac',
    // Linux GNOME
    'linux:rounded-linux',
  ].join(' ');

  return (
    <span
      className={`inline-flex items-center font-medium ${variantClasses[variant]} ${sizeClasses[size]} ${osStyles}`}
    >
      {children}
    </span>
  );
};

export default BadgeAtomComponent;
