// import components
import React from 'react';
import { Button } from '../atoms/Button.js';
// import types
export interface ToolbarAction {
  label: string;
  icon?: string;
  onClick: () => void;
  disabled?: boolean;
}

export interface ToolbarProps {
  actions: ToolbarAction[];
  className?: string;
}

/**
 * Toolbar component for action buttons.
 * @param {ToolbarProps} props Component props
 * @returns {React.JSX.Element} Toolbar element
 */
export function Toolbar({
  actions,
  className = '',
}: ToolbarProps): React.JSX.Element {
  return (
    <div
      className={`flex items-center gap-2 p-2 bg-white border border-gray-200 rounded-lg ${className}`}
    >
      {actions.map((action, index) => (
        <Button
          key={index}
          onClick={action.onClick}
          disabled={action.disabled ?? false}
          variant="secondary"
        >
          {action.icon && <span className="mr-1">{action.icon}</span>}
          {action.label}
        </Button>
      ))}
    </div>
  );
}
