// import components
import ButtonAtomComponent from '../../atoms/Button/index.js';
// import types
import type { JSX } from 'react';
import type { ToolbarOrganismPropTypes } from '@packages/types';

/**
 * Toolbar component for action buttons.
 * @param {ToolbarOrganismPropTypes} props Component props
 * @returns {JSX.Element} Toolbar element
 */
export const ToolbarOrganismComponent = ({
  actions,
  className = '',
}: ToolbarOrganismPropTypes): JSX.Element => {
  return (
    <div
      className={`flex items-center gap-2 p-2 bg-white border border-gray-200 rounded-lg ${className}`}
    >
      {actions.map((action, index) => (
        <ButtonAtomComponent
          key={index}
          onClick={action.onClick}
          disabled={action.disabled ?? false}
          variant="secondary"
        >
          {action.icon && <span className="mr-1">{action.icon}</span>}
          {action.label}
        </ButtonAtomComponent>
      ))}
    </div>
  );
};

export default ToolbarOrganismComponent;
