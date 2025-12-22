// import types
import type { ReactNode } from 'react';

export interface AccordionItem {
  title: string;
  content: ReactNode;
}

export interface AccordionOrganismPropTypes {
  items: AccordionItem[];
  allowMultiple?: boolean;
}
