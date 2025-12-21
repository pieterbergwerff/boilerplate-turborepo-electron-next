// import components
import React from 'react';
// import types
export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

/**
 * Select dropdown component with OS-specific styling.
 * @param {SelectProps} props Component props
 * @returns {React.JSX.Element} Select element
 */
export function Select({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  disabled = false,
}: SelectProps): React.JSX.Element {
  const osStyles = [
    // Windows 11 Fluent Design
    'windows:border-gray-300 windows:rounded-win windows:focus:ring-win-accent windows:focus:border-win-accent',
    // macOS
    'osx:border-gray-300 osx:rounded-mac osx:focus:ring-mac-accent osx:focus:border-mac-accent',
    // Linux GNOME
    'linux:border-gray-400 linux:rounded-linux linux:focus:ring-linux-accent linux:focus:border-linux-accent',
  ].join(' ');

  return (
    <select
      value={value}
      onChange={e => onChange?.(e.target.value)}
      disabled={disabled}
      className={`px-3 py-2 border focus:outline-none focus:ring-2 disabled:opacity-50 disabled:bg-gray-100 bg-white transition-all ${osStyles}`}
    >
      <option value="">{placeholder}</option>
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
