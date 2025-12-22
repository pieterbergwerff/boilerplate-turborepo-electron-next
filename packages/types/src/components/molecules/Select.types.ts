// import types

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectMoleculePropTypes {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}
