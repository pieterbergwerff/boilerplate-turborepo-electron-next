// import components
import { Fragment } from 'react';
// import types
import type { JSX } from 'react';
import type { BreadcrumbMoleculePropTypes } from '@packages/types';

/**
 * Breadcrumb component for navigation.
 * @param {BreadcrumbMoleculePropTypes} props Component props
 * @returns {JSX.Element} Breadcrumb element
 */
export function BreadcrumbMoleculeComponent({
  items,
}: BreadcrumbMoleculePropTypes): JSX.Element {
  return (
    <nav className="flex items-center text-sm text-gray-600">
      {items.map((item, index) => (
        <Fragment key={index}>
          {index > 0 && <span className="mx-2">/</span>}
          {item.href ? (
            <a href={item.href} className="hover:text-blue-600">
              {item.label}
            </a>
          ) : (
            <span className="text-gray-900 font-medium">{item.label}</span>
          )}
        </Fragment>
      ))}
    </nav>
  );
}

export default BreadcrumbMoleculeComponent;
