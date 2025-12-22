// import types
import type { JSX } from 'react';
import type { SliderAtomPropTypes } from '@packages/types';

/**
 * Slider component for numeric input.
 * @param {SliderAtomPropTypes} props Component props
 * @returns {JSX.Element} Slider element
 */
export const SliderAtomComponent = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
}: SliderAtomPropTypes): JSX.Element => {
  return (
    <input
      type="range"
      value={value}
      onChange={e => onChange?.(Number(e.target.value))}
      min={min}
      max={max}
      step={step}
      disabled={disabled}
      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 disabled:opacity-50"
    />
  );
};

export default SliderAtomComponent;
