// import components
import React from 'react';
// import types
export interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
}

/**
 * Switch toggle component with OS-specific styling.
 * @param {SwitchProps} props Component props
 * @returns {React.JSX.Element} Switch element
 */
export function Switch({
  checked = false,
  onChange,
  disabled = false,
  label,
}: SwitchProps): React.JSX.Element {
  const trackStyles = [
    // Windows 11 Fluent Design
    'windows:peer-checked:bg-win-accent',
    // macOS
    'osx:peer-checked:bg-mac-accent',
    // Linux GNOME
    'linux:peer-checked:bg-linux-accent',
  ].join(' ');

  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={e => onChange?.(e.target.checked)}
          disabled={disabled}
          className="sr-only peer"
        />
        <div
          className={`w-11 h-6 bg-gray-300 rounded-full peer peer-disabled:opacity-50 transition-colors ${trackStyles}`}
        />
        <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform peer-checked:translate-x-5" />
      </div>
      {label && <span className="text-sm text-gray-700">{label}</span>}
    </label>
  );
}
