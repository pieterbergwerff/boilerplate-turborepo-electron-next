// import types
import type { JSX } from 'react';
import type { CheckboxAtomPropTypes } from '@packages/types';

/**
 * Checkbox input component with OS-specific styling.
 * @param {CheckboxAtomPropTypes} props Component props
 * @returns {JSX.Element} Checkbox element
 */
export const CheckboxAtomComponent = ({
  checked = false,
  onChange,
  label,
  disabled = false,
}: CheckboxAtomPropTypes): JSX.Element => {
  const osStyles = [
    // Windows 11 Fluent Design
    'windows:border-gray-300 windows:rounded-win windows:focus:ring-win-accent windows:checked:bg-win-accent',
    // macOS
    'osx:border-gray-300 osx:rounded-mac osx:focus:ring-mac-accent osx:checked:bg-mac-accent',
    // Linux GNOME
    'linux:border-gray-400 linux:rounded-linux linux:focus:ring-linux-accent linux:checked:bg-linux-accent',
  ].join(' ');

  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={e => onChange?.(e.target.checked)}
        disabled={disabled}
        className={`w-4 h-4 border focus:ring-2 disabled:opacity-50 transition-colors ${osStyles}`}
      />
      {label && <span className="text-sm text-gray-700">{label}</span>}
    </label>
  );
};

export default CheckboxAtomComponent;
