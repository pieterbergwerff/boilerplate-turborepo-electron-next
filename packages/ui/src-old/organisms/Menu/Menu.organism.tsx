// import types
import type { FC, ReactElement } from 'react';
import type { MenuOrganismPropTypes } from '@packages/types';

/**
 * Menu navigation component.
 * @param {MenuOrganismPropTypes} props Component props
 * @returns {JSX.Element} Menu element
 */
export const MenuOrganismComponent: FC<MenuOrganismPropTypes> = ({
  data,
  orientation = 'horizontal',
}): ReactElement | null => {
  const orientationClasses =
    orientation === 'horizontal' ? 'flex flex-row' : 'flex flex-col';

  if (!data || data.length === 0) return null;

  return (
    <nav
      className={`${orientationClasses} gap-1 border border-gray-200 rounded-lg p-1`}
    >
      {data.map((item, index) => {
        const content = (
          <>
            {item.icon && <span className="mr-2">{item.icon}</span>}
            {item.label}
          </>
        );

        const classes =
          'px-4 py-2 rounded-md hover:bg-gray-700 transition-colors flex items-center';

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
};

export default MenuOrganismComponent;
