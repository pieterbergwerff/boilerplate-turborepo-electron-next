'use client';

// import components
import { useState } from 'react';

// import types
import type { JSX } from 'react';
import type { ColorPickerMoleculePropTypes } from '@packages/types';

/**
 * ColorPicker component for selecting colors.
 * @param {ColorPickerMoleculePropTypes} props Component props
 * @returns {JSX.Element} ColorPicker element
 */
export const ColorPickerMoleculeComponent = ({
  value = '#000000',
  onChange,
}: ColorPickerMoleculePropTypes): JSX.Element => {
  const [color, setColor] = useState(value);

  const handleChange = (newColor: string): void => {
    setColor(newColor);
    onChange?.(newColor);
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="color"
        value={color}
        onChange={e => handleChange(e.target.value)}
        className="w-12 h-12 rounded border border-gray-300 cursor-pointer"
      />
      <input
        type="text"
        value={color}
        onChange={e => handleChange(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default ColorPickerMoleculeComponent;
