// import types
import type { FC, PropsWithChildren } from 'react';

const Template: FC<PropsWithChildren> = ({ children }) => (
  <main className="flex flex-col overflow-hidden h-full">{children}</main>
);

export default Template;
