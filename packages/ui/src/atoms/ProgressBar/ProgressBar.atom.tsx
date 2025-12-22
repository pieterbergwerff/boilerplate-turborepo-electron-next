// import types
import type { JSX } from 'react';
import type { ProgressBarAtomPropTypes } from '@packages/types';

/**
 * ProgressBar component for showing completion.
 * @param {ProgressBarAtomPropTypes} props Component props
 * @returns {JSX.Element} ProgressBar element
 */
export const ProgressBarAtomComponent = ({
  value,
  max = 100,
  size = 'md',
  color = 'blue',
}: ProgressBarAtomPropTypes): JSX.Element => {
  const percentage = Math.min((value / max) * 100, 100);

  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  const colorClasses = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    red: 'bg-red-600',
  };

  return (
    <div className={`w-full bg-gray-200 rounded-full ${sizeClasses[size]}`}>
      <div
        className={`${colorClasses[color]} ${sizeClasses[size]} rounded-full transition-all`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

export default ProgressBarAtomComponent;
