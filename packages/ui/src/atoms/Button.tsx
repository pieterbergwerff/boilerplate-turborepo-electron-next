// import utils
// (none)
// import constants
// (none)
// import components
import React from 'react';
// import types
export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  disabled?: boolean;
}

/**
 * Reusable button component with OS-specific styling.
 * @param {ButtonProps} props Component props
 * @returns {React.JSX.Element} Rendered button
 */
export function Button({
  children,
  variant = 'primary',
  onClick,
  disabled = false,
}: ButtonProps): React.JSX.Element {
  const baseStyles =
    'px-4 py-2 font-medium transition-all duration-200 focus:outline-none focus:ring-2';

  const primaryStyles = [
    // Windows 11 Fluent Design
    'windows:bg-win-accent windows:hover:bg-win-accent-light windows:text-white',
    'windows:rounded-win windows:shadow-win windows:focus:ring-win-accent',
    // macOS Big Sur+
    'osx:bg-mac-accent osx:hover:bg-mac-accent-light osx:text-white',
    'osx:rounded-mac osx:shadow-mac osx:focus:ring-mac-accent',
    // Linux GNOME
    'linux:bg-linux-accent linux:hover:bg-linux-accent-light linux:text-white',
    'linux:rounded-linux linux:shadow-linux linux:focus:ring-linux-accent',
  ].join(' ');

  const secondaryStyles = [
    // Windows 11
    'windows:bg-gray-100 windows:hover:bg-gray-200 windows:text-gray-900 windows:border windows:border-gray-300',
    'windows:rounded-win windows:focus:ring-win-accent',
    // macOS
    'osx:bg-gray-100 osx:hover:bg-gray-200 osx:text-gray-900 osx:border osx:border-gray-300',
    'osx:rounded-mac osx:focus:ring-mac-accent',
    // Linux
    'linux:bg-gray-100 linux:hover:bg-gray-200 linux:text-gray-900 linux:border linux:border-gray-300',
    'linux:rounded-linux linux:focus:ring-linux-accent',
  ].join(' ');

  const disabledStyles = 'disabled:opacity-50 disabled:cursor-not-allowed';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      data-variant={variant}
      className={`${baseStyles} ${variant === 'primary' ? primaryStyles : secondaryStyles} ${disabledStyles}`}
    >
      {children}
    </button>
  );
}
