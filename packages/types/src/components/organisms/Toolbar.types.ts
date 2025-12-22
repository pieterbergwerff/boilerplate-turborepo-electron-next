// import types

export interface ToolbarAction {
  label: string;
  icon?: string;
  onClick: () => void;
  disabled?: boolean;
}

export interface ToolbarOrganismPropTypes {
  actions: ToolbarAction[];
  className?: string;
}
