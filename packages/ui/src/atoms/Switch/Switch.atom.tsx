'use client';

// import components
import Box from '../Box';
import Label from '../Label';

// import types
import type { JSX } from 'react';
import type { SwitchAtomPropTypes } from '@packages/types';

/**
 * Switch toggle component with OS-specific styling.
 * @param {SwitchAtomPropTypes} props Component props
 * @returns {JSX.Element} Switch element
 */
export const SwitchAtomComponent = ({
  checked = false,
  onChange,
  disabled = false,
  label,
}: SwitchAtomPropTypes): JSX.Element => {
  return (
    <Label className="flex items-center gap-2 cursor-pointer">
      <Box clsx="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={e => onChange?.(e.target.checked)}
          disabled={disabled}
          className="sr-only peer"
        />
        <Box
          clsx={[
            'w-11',
            'h-6',
            'bg-gray-300',
            'rounded-full',
            'peer',
            'peer-disabled:opacity-50',
            'transition-colors',
            'windows:peer-checked:bg-win-accent',
            'osx:peer-checked:bg-mac-accent',
            'linux:peer-checked:bg-linux-accent',
          ].join(' ')}
        />
        <Box clsx="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform peer-checked:translate-x-5" />
      </Box>
      {label && (
        <Box component="span" clsx="text-sm text-gray-700">
          {label}
        </Box>
      )}
    </Label>
  );
};

export default SwitchAtomComponent;
