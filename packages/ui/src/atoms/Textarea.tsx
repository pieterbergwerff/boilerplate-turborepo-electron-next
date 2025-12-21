// import components
import React from 'react';
// import types
export interface TextareaProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  rows?: number;
  disabled?: boolean;
  className?: string;
}

/**
 * Textarea component for multi-line text input.
 * @param {TextareaProps} props Component props
 * @returns {React.JSX.Element} Textarea element
 */
export function Textarea({
  value,
  onChange,
  placeholder,
  rows = 4,
  disabled = false,
  className = '',
}: TextareaProps): React.JSX.Element {
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
}
