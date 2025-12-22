// import types

export interface DropdownOption {
  label: string;
  onClick: () => void;
}

export interface DropdownOrganismPropTypes {
  label: string;
  options: DropdownOption[];
}
