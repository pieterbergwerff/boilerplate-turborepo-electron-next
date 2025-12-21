// import components
import React from 'react';
// import types
export interface LinkProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
}

/**
 * Link component for navigation.
 * @param {LinkProps} props Component props
 * @returns {React.JSX.Element} Link element
 */
export function Link({
  href,
  children,
  external = false,
  className = '',
}: LinkProps): React.JSX.Element {
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
}
