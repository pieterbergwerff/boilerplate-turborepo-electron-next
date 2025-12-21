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
 * @returns {JSX.Element} Rendered button
 */
export function Button({
  children,
  variant = 'primary',
  onClick,
  disabled = false,
}: ButtonProps): JSX.Element {
  return (
    <button onClick={onClick} disabled={disabled} data-variant={variant}>
      {children}
    </button>
  );
}
