// import types
import type { JSX } from 'react';
import type { RadioGroupAtomPropTypes } from '@packages/types';

/**
 * RadioGroup component for single selection with OS-specific styling.
 * @param {RadioGroupAtomPropTypes} props Component props
 * @returns {JSX.Element} RadioGroup element
 */
export const RadioGroupAtomComponent = ({
  options,
  value,
  onChange,
  name,
  disabled = false,
}: RadioGroupAtomPropTypes): JSX.Element => {
  const osStyles = [
    // Windows 11 Fluent Design
    'windows:border-gray-300 windows:focus:ring-win-accent windows:checked:bg-win-accent',
    // macOS
    'osx:border-gray-300 osx:focus:ring-mac-accent osx:checked:bg-mac-accent',
    // Linux GNOME
    'linux:border-gray-400 linux:focus:ring-linux-accent linux:checked:bg-linux-accent',
  ].join(' ');

  return (
    <div className="flex flex-col gap-2">
      {options.map(option => (
        <label
          key={option.value}
          className="flex items-center gap-2 cursor-pointer"
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={e => onChange?.(e.target.value)}
            disabled={disabled}
            className={`w-4 h-4 border focus:ring-2 disabled:opacity-50 transition-colors ${osStyles}`}
          />
          <span className="text-sm text-gray-700">{option.label}</span>
        </label>
      ))}
    </div>
  );
};

export default RadioGroupAtomComponent;
