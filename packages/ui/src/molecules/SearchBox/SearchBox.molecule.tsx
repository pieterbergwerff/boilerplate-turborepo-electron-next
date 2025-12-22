// import components
import InputAtomComponent from '../../atoms/Input/index.js';
// import types
import type { JSX } from 'react';
import type { SearchBoxMoleculePropTypes } from '@packages/types';

/**
 * SearchBox component with search icon.
 * @param {SearchBoxMoleculePropTypes} props Component props
 * @returns {JSX.Element} SearchBox element
 */
export const SearchBoxMoleculeComponent = ({
  value,
  onChange,
  placeholder = 'Search...',
}: SearchBoxMoleculePropTypes): JSX.Element => {
  return (
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10">
        🔍
      </div>
      <InputAtomComponent
        value={value ?? ''}
        onChange={onChange}
        placeholder={placeholder}
        className="!pl-12 pr-3 w-full"
      />
    </div>
  );
};

export default SearchBoxMoleculeComponent;
