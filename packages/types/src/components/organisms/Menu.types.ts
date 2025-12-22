// import types

export interface MenuItem {
  label: string;
  icon?: string;
  onClick?: () => void;
  href?: string;
}

export interface MenuOrganismPropTypes {
  data: MenuItem[];
  orientation?: 'horizontal' | 'vertical';
}
