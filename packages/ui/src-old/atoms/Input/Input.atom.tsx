// import types
import type { JSX } from 'react';
import type { InputAtomPropTypes } from '@packages/types';

/**
 * Input component with OS-specific styling.
 * @param {InputAtomPropTypes} props Component props
 * @returns {JSX.Element} Input element
 */
export const InputAtomComponent = ({
  type = 'text',
  value,
  onChange,
  placeholder,
  disabled = false,
  className = '',
  onFocus,
}: InputAtomPropTypes): JSX.Element => {
  const baseStyles =
    'px-3 py-2 border focus:outline-none focus:ring-2 transition-all duration-200';

  const osStyles = [
    // Windows 11 Fluent Design
    'windows:border-gray-300 windows:rounded-win windows:focus:ring-win-accent windows:focus:border-win-accent',
    // macOS
    'osx:border-gray-300 osx:rounded-mac osx:focus:ring-mac-accent osx:focus:border-mac-accent',
    // Linux GNOME
    'linux:border-gray-400 linux:rounded-linux linux:focus:ring-linux-accent linux:focus:border-linux-accent',
  ].join(' ');

  const disabledStyles =
    'disabled:opacity-50 disabled:bg-gray-100 disabled:cursor-not-allowed';

  return (
    <input
      type={type}
      value={value}
      onChange={e => onChange?.(e.target.value)}
      onFocus={onFocus}
      placeholder={placeholder}
      disabled={disabled}
      className={`${baseStyles} ${osStyles} ${disabledStyles} ${className}`}
    />
  );
};

export default InputAtomComponent;
