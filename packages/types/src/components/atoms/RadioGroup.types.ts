// import types

export interface RadioGroupAtomPropTypes {
  options: Array<{ value: string; label: string }>;
  value?: string;
  onChange?: (value: string) => void;
  name: string;
  disabled?: boolean;
}
