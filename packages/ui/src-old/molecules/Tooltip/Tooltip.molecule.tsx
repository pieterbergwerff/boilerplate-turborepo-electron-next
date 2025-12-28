'use client';

// import components
import { useState } from 'react';
// import types
import type { JSX } from 'react';
import type { TooltipMoleculePropTypes } from '@packages/types';

/**
 * Tooltip component for hover hints with OS-specific styling.
 * @param {TooltipMoleculePropTypes} props Component props
 * @returns {JSX.Element} Tooltip element
 */
export const TooltipMoleculeComponent = ({
  children,
  content,
  position = 'top',
}: TooltipMoleculePropTypes): JSX.Element => {
  const [visible, setVisible] = useState(false);

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
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
    <div
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div
          className={`absolute ${positionClasses[position]} px-2 py-1 text-sm text-white bg-gray-900 whitespace-nowrap z-50 ${osStyles}`}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default TooltipMoleculeComponent;
