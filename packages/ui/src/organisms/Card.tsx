// import components
import React from 'react';
// import types
export interface CardProps {
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

/**
 * Card component for content containers with OS-specific styling.
 * @param {CardProps} props Component props
 * @returns {React.JSX.Element} Card element
 */
export function Card({
  title,
  children,
  footer,
  className = '',
}: CardProps): React.JSX.Element {
  const osStyles = [
    // Windows 11 Fluent Design
    'windows:border-gray-200 windows:rounded-win windows:shadow-win',
    // macOS
    'osx:border-gray-200 osx:rounded-mac osx:shadow-mac',
    // Linux GNOME
    'linux:border-gray-300 linux:rounded-linux linux:shadow-linux',
  ].join(' ');

  return (
    <div className={`bg-white border overflow-hidden ${osStyles} ${className}`}>
      {title && (
        <div className="px-4 py-3 border-b border-gray-200 font-semibold">
          {title}
        </div>
      )}
      <div className="px-4 py-3">{children}</div>
      {footer && (
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
          {footer}
        </div>
      )}
    </div>
  );
}
