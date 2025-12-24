'use client';

// import utils
import { useLayoutEffect } from 'react';
import { observer } from '@packages/storage';

// import stores
import { themeStoreInstance, osStoreInstance } from '@packages/storage';

// import components
import { TitleBar } from '@packages/ui';

// import types
import type { FC, PropsWithChildren } from 'react';

const Template: FC = observer(({ children }: PropsWithChildren) => {
  useLayoutEffect(() => {
    void Promise.all([themeStoreInstance.init(), osStoreInstance.init()]);
  }, []);

  const osTheme = osStoreInstance.getOs();

  const sectionAriaLabel =
    osTheme === 'osx'
      ? 'macOS System Settings'
      : osTheme === 'windows'
        ? 'Windows 11 Settings (System)'
        : 'Application Content';

  return (
    <main
      className="flex flex-col overflow-hidden"
      style={{ height: '100vh', width: '100vw', margin: 0, padding: 0 }}
    >
      <section
        aria-label={sectionAriaLabel}
        className="h-full w-full flex flex-col"
      >
        {osTheme === 'osx' ? (
          <div className="subtle-card overflow-hidden h-full flex flex-col">
            <TitleBar />
            <div className="flex-1 overflow-auto">{children}</div>
          </div>
        ) : osTheme === 'windows' ? (
          <>
            <div className="subtle-card overflow-hidden">
              <div className="h-12 bg-white border-b border-black/10 flex items-center px-4">
                <div className="text-sm text-black/50">Settings</div>
              </div>
            </div>
            <div className="flex-1 overflow-auto">{children}</div>
          </>
        ) : null}
      </section>
    </main>
  );
});

export default Template;
