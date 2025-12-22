// import types
import type { JSX } from 'react';
import type { ListOrganismPropTypes } from '@packages/types';

/**
 * List component for displaying items.
 * @param {ListOrganismPropTypes} props Component props
 * @returns {JSX.Element} List element
 */
export const ListOrganismComponent = ({
  items,
  ordered = false,
  className = '',
}: ListOrganismPropTypes): JSX.Element => {
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
};

export default ListOrganismComponent;
