// import types

export interface ComboboxOption {
  value: string;
  label: string;
}

export interface ComboboxOrganismPropTypes {
  options: ComboboxOption[];
  onChange?: (value: string) => void;
  placeholder?: string;
}
