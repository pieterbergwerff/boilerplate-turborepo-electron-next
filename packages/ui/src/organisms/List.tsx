// import components
import React from 'react';
// import types
export interface ListProps {
  items: React.ReactNode[];
  ordered?: boolean;
  className?: string;
}

/**
 * List component for displaying items.
 * @param {ListProps} props Component props
 * @returns {React.JSX.Element} List element
 */
export function List({
  items,
  ordered = false,
  className = '',
}: ListProps): React.JSX.Element {
  const Component = ordered ? 'ol' : 'ul';

  return (
    <Component
      className={`space-y-2 ${ordered ? 'list-decimal' : 'list-disc'} list-inside ${className}`}
    >
      {items.map((item, index) => (
        <li key={index} className="text-gray-700">
          {item}
        </li>
      ))}
    </Component>
  );
}
