// import components
import React from 'react';
// import types
export interface MenuItem {
  label: string;
  icon?: string;
  onClick?: () => void;
  href?: string;
}

export interface MenuProps {
  items: MenuItem[];
  orientation?: 'horizontal' | 'vertical';
}

/**
 * Menu navigation component.
 * @param {MenuProps} props Component props
 * @returns {React.JSX.Element} Menu element
 */
export function Menu({
  items,
  orientation = 'horizontal',
}: MenuProps): React.JSX.Element {
  const orientationClasses =
    orientation === 'horizontal' ? 'flex flex-row' : 'flex flex-col';

  return (
    <nav
      className={`${orientationClasses} gap-1 bg-white border border-gray-200 rounded-lg p-1`}
    >
      {items.map((item, index) => {
        const content = (
          <>
            {item.icon && <span className="mr-2">{item.icon}</span>}
            {item.label}
          </>
        );

        const classes =
          'px-4 py-2 rounded-md hover:bg-gray-100 transition-colors flex items-center';

        if (item.href) {
          return (
            <a key={index} href={item.href} className={classes}>
              {content}
            </a>
          );
        }

        return (
          <button key={index} onClick={item.onClick} className={classes}>
            {content}
          </button>
        );
      })}
    </nav>
  );
}
