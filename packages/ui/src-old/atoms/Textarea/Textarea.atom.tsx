// import types
import type { JSX } from 'react';
import type { TextareaAtomPropTypes } from '@packages/types';

/**
 * Textarea component for multi-line text input.
 * @param {TextareaAtomPropTypes} props Component props
 * @returns {JSX.Element} Textarea element
 */
export const TextareaAtomComponent = ({
  value,
  onChange,
  placeholder,
  rows = 4,
  disabled = false,
  className = '',
}: TextareaAtomPropTypes): JSX.Element => {
  return (
    <textarea
      value={value}
      onChange={e => onChange?.(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      disabled={disabled}
      className={`px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:bg-gray-100 resize-y ${className}`}
    />
  );
};

export default TextareaAtomComponent;
