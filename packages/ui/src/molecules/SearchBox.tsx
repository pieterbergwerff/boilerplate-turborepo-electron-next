// import components
import React from 'react';
import { Input } from '../atoms/Input.js';
// import types
export interface SearchBoxProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

/**
 * SearchBox component with search icon.
 * @param {SearchBoxProps} props Component props
 * @returns {React.JSX.Element} SearchBox element
 */
export function SearchBox({
  value,
  onChange,
  placeholder = 'Search...',
}: SearchBoxProps): React.JSX.Element {
  return (
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        🔍
      </div>
      <Input
        value={value ?? ''}
        onChange={onChange}
        placeholder={placeholder}
        className="pl-10"
      />
    </div>
  );
}
