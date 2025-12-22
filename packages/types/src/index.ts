// import types
import type { ReactNode } from 'react';

// ThemeProvider types
export interface ThemeContextValue {
  osTheme: OSTheme;
  colorScheme: 'light' | 'dark';
}

export interface ThemeProviderProps {
  children: ReactNode;
  defaultOSTheme?: OSTheme;
}

export interface UseThemeProviderReturnType {
  loading: boolean;
  osTheme: OSTheme;
  colorScheme: 'light' | 'dark';
}

// OSTheme type (used by ThemeProvider) - should match @packages/validators but include unknown for fallback
export type OSTheme = 'windows' | 'osx' | 'linux';

// Re-export all component types
// Atoms
export type { AvatarAtomPropTypes } from './components/atoms/Avatar.types.js';
export type { BadgeAtomPropTypes } from './components/atoms/Badge.types.js';
export type { ButtonAtomPropTypes } from './components/atoms/Button.types.js';
export type { CheckboxAtomPropTypes } from './components/atoms/Checkbox.types.js';
export type { DividerAtomPropTypes } from './components/atoms/Divider.types.js';
export type { ImageAtomPropTypes } from './components/atoms/Image.types.js';
export type { InputAtomPropTypes } from './components/atoms/Input.types.js';
export type { LabelAtomPropTypes } from './components/atoms/Label.types.js';
export type { LinkAtomPropTypes } from './components/atoms/Link.types.js';
export type { ProgressBarAtomPropTypes } from './components/atoms/ProgressBar.types.js';
export type { RadioGroupAtomPropTypes } from './components/atoms/RadioGroup.types.js';
export type { SkeletonAtomPropTypes } from './components/atoms/Skeleton.types.js';
export type { SliderAtomPropTypes } from './components/atoms/Slider.types.js';
export type { SwitchAtomPropTypes } from './components/atoms/Switch.types.js';
export type { TextAtomPropTypes } from './components/atoms/Text.types.js';
export type { TextareaAtomPropTypes } from './components/atoms/Textarea.types.js';

// Molecules
export type { AvatarGroupMoleculePropTypes } from './components/molecules/AvatarGroup.types.js';
export type {
  BreadcrumbItem,
  BreadcrumbMoleculePropTypes,
} from './components/molecules/Breadcrumb.types.js';
export type { ColorPickerMoleculePropTypes } from './components/molecules/ColorPicker.types.js';
export type { SearchBoxMoleculePropTypes } from './components/molecules/SearchBox.types.js';
export type {
  SelectOption,
  SelectMoleculePropTypes,
} from './components/molecules/Select.types.js';
export type { ToastMoleculePropTypes } from './components/molecules/Toast.types.js';
export type { TooltipMoleculePropTypes } from './components/molecules/Tooltip.types.js';

// Organisms
export type {
  AccordionItem,
  AccordionOrganismPropTypes,
} from './components/organisms/Accordion.types.js';
export type { CardOrganismPropTypes } from './components/organisms/Card.types.js';
export type { CarouselOrganismPropTypes } from './components/organisms/Carousel.types.js';
export type {
  ComboboxOption,
  ComboboxOrganismPropTypes,
} from './components/organisms/Combobox.types.js';
export type { DialogOrganismPropTypes } from './components/organisms/Dialog.types.js';
export type {
  DropdownOption,
  DropdownOrganismPropTypes,
} from './components/organisms/Dropdown.types.js';
export type { ListOrganismPropTypes } from './components/organisms/List.types.js';
export type {
  MenuItem,
  MenuOrganismPropTypes,
} from './components/organisms/Menu.types.js';
export type { PopoverOrganismPropTypes } from './components/organisms/Popover.types.js';
export type {
  ToolbarAction,
  ToolbarOrganismPropTypes,
} from './components/organisms/Toolbar.types.js';
