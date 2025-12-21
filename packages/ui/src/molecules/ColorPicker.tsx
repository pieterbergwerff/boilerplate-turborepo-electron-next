// import components
import React, { useState } from 'react';
// import types
export interface ColorPickerProps {
  value?: string;
  onChange?: (color: string) => void;
}

/**
 * ColorPicker component for selecting colors.
 * @param {ColorPickerProps} props Component props
 * @returns {React.JSX.Element} ColorPicker element
 */
export function ColorPicker({
  value = '#000000',
  onChange,
}: ColorPickerProps): React.JSX.Element {
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
}
