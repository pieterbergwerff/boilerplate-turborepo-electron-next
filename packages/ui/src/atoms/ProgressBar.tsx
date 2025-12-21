// import components
import React from 'react';
// import types
export interface ProgressBarProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'green' | 'red';
}

/**
 * ProgressBar component for showing completion.
 * @param {ProgressBarProps} props Component props
 * @returns {React.JSX.Element} ProgressBar element
 */
export function ProgressBar({
  value,
  max = 100,
  size = 'md',
  color = 'blue',
}: ProgressBarProps): React.JSX.Element {
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
}
