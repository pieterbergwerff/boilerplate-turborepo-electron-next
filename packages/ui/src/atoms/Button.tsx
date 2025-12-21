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
 * Reusable button component with variants.
 * @param {ButtonProps} props Component props
 * @returns {React.JSX.Element} Rendered button
 */
export function Button({
  children,
  variant = 'primary',
  onClick,
  disabled = false,
}: ButtonProps): React.JSX.Element {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      data-variant={variant}
      className="text-green-500 text-bold"
    >
      {children}
    </button>
  );
}
