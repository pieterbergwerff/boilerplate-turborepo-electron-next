// import components
import React from 'react';
// import types
export interface DialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

/**
 * Dialog modal component with OS-specific styling.
 * @param {DialogProps} props Component props
 * @returns {React.JSX.Element | null} Dialog element
 */
export function Dialog({
  open,
  onClose,
  title,
  children,
  footer,
}: DialogProps): React.JSX.Element | null {
  if (!open) return null;

  const osStyles = [
    // Windows 11 Fluent Design
    'windows:rounded-win windows:shadow-win',
    // macOS
    'osx:rounded-mac osx:shadow-mac',
    // Linux GNOME
    'linux:rounded-linux linux:shadow-linux',
  ].join(' ');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className={`relative bg-white max-w-md w-full mx-4 ${osStyles}`}>
        {title && (
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">{title}</h2>
          </div>
        )}
        <div className="px-6 py-4">{children}</div>
        {footer && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-2">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
