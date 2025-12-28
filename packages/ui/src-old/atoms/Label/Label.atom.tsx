// import types
import type { JSX } from 'react';
import type { LabelAtomPropTypes } from '@packages/types';

/**
 * Label component for form fields.
 * @param {LabelAtomPropTypes} props Component props
 * @returns {JSX.Element} Label element
 */
export const LabelAtomComponent = ({
  children,
  htmlFor,
  required = false,
}: LabelAtomPropTypes): JSX.Element => {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-medium text-gray-700"
    >
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
};

export default LabelAtomComponent;
