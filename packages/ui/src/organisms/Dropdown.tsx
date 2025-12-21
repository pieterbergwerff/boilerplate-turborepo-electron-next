// import components
import React, { useState } from 'react';
// import types
export interface DropdownOption {
  label: string;
  onClick: () => void;
}

export interface DropdownProps {
  label: string;
  options: DropdownOption[];
}

/**
 * Dropdown menu component with OS-specific styling.
 * @param {DropdownProps} props Component props
 * @returns {React.JSX.Element} Dropdown element
 */
export function Dropdown({ label, options }: DropdownProps): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const buttonStyles = [
    // Windows 11 Fluent Design
    'windows:border-gray-300 windows:rounded-win',
    // macOS
    'osx:border-gray-300 osx:rounded-mac',
    // Linux GNOME
    'linux:border-gray-400 linux:rounded-linux',
  ].join(' ');

  const menuStyles = [
    // Windows 11 Fluent Design
    'windows:border-gray-200 windows:rounded-win windows:shadow-win',
    // macOS
    'osx:border-gray-200 osx:rounded-mac osx:shadow-mac',
    // Linux GNOME
    'linux:border-gray-300 linux:rounded-linux linux:shadow-linux',
  ].join(' ');

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`px-4 py-2 bg-white border hover:bg-gray-50 transition-colors ${buttonStyles}`}
      >
        {label}
      </button>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div
            className={`absolute right-0 z-20 mt-2 w-48 bg-white border ${menuStyles}`}
          >
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => {
                  option.onClick();
                  setIsOpen(false);
                }}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 first:rounded-t-md last:rounded-b-md transition-colors"
              >
                {option.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
