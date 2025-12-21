// import components
import React from 'react';
// import types
export interface LabelProps {
  children: React.ReactNode;
  htmlFor?: string;
  required?: boolean;
}

/**
 * Label component for form fields.
 * @param {LabelProps} props Component props
 * @returns {React.JSX.Element} Label element
 */
export function Label({
  children,
  htmlFor,
  required = false,
}: LabelProps): React.JSX.Element {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-medium text-gray-700"
    >
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
}
