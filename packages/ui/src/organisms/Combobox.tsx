// import components
import React, { useState } from 'react';
import { Input } from '../atoms/Input.js';
// import types
export interface ComboboxOption {
  value: string;
  label: string;
}

export interface ComboboxProps {
  options: ComboboxOption[];
  onChange?: (value: string) => void;
  placeholder?: string;
}

/**
 * Combobox component with autocomplete.
 * @param {ComboboxProps} props Component props
 * @returns {React.JSX.Element} Combobox element
 */
export function Combobox({
  options,
  onChange,
  placeholder = 'Type to search...',
}: ComboboxProps): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (optionValue: string): void => {
    onChange?.(optionValue);
    setIsOpen(false);
    const selected = options.find(o => o.value === optionValue);
    setSearchTerm(selected?.label || '');
  };

  return (
    <div className="relative">
      <Input
        value={searchTerm}
        onChange={val => {
          setSearchTerm(val);
          setIsOpen(true);
        }}
        placeholder={placeholder}
        onFocus={() => setIsOpen(true)}
      />
      {isOpen && filteredOptions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {filteredOptions.map(option => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className="w-full px-3 py-2 text-left hover:bg-gray-100 transition-colors"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
