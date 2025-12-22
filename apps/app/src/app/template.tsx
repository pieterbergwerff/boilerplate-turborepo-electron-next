// import components
import { MenuOrganismComponent as Menu } from '@packages/ui';

// import types
import type { FC, PropsWithChildren } from 'react';

const Template: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Turborepo Electron + Next.js Boilerplate
      </h1>
      <Menu
        data={[
          {
            label: 'Dashboard',
            href: '/',
          },
          {
            label: 'Settings',
            href: '/settings',
          },
          {
            label: 'Components',
            href: '/components',
          },
        ]}
      />
      <main className="mt-4">{children}</main>
    </div>
  );
};

export default Template;
