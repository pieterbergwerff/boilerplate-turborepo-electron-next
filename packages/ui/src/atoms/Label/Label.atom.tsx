// import components
import Box from '../Box/index.js';

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
  ...props
}: LabelAtomPropTypes): JSX.Element => {
  return (
    <Box
      component="label"
      htmlFor={htmlFor}
      clsx={['block text-sm font-medium text-gray-700', props.clsx]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
      {required && (
        <Box component="span" className="text-red-500 ml-1">
          *
        </Box>
      )}
    </Box>
  );
};

export default LabelAtomComponent;
