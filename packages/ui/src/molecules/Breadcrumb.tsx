// import components
import React from 'react';
// import types
export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

/**
 * Breadcrumb component for navigation.
 * @param {BreadcrumbProps} props Component props
 * @returns {React.JSX.Element} Breadcrumb element
 */
export function Breadcrumb({ items }: BreadcrumbProps): React.JSX.Element {
  return (
    <nav className="flex items-center text-sm text-gray-600">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <span className="mx-2">/</span>}
          {item.href ? (
            <a href={item.href} className="hover:text-blue-600">
              {item.label}
            </a>
          ) : (
            <span className="text-gray-900 font-medium">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
