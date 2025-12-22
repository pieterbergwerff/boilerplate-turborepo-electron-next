'use client';

// import utils
import React, { useEffect, useState } from 'react';

// import types
import type {
  AppInfoValidatorType,
  OpenDialogResultType,
  SettingsValidatorType,
  ThemeValidatorType,
} from '@packages/validators';

// import components
import { TitleBar } from '@packages/ui';

// import types
import type { FC, PropsWithChildren } from 'react';

const Template: FC<PropsWithChildren> = ({ children }) => {
  const [settings, setSettings] = useState<SettingsValidatorType | null>(null);
  const [info, setInfo] = useState<AppInfoValidatorType | null>(null);

  /**
   * Load initial data from Electron via preload API.
   * @returns {Promise<void>}
   */
  async function loadInitial(): Promise<void> {
    if (!window.api) return;
    const [s, i] = await Promise.all([
      window.api.getSettings(),
      window.api.getAppInfo(),
    ]);
    setSettings(s);
    setInfo(i);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Initial data load on mount is intentional
    loadInitial().catch(console.error);
  }, []);

  const osTheme = info?.osTheme;

  if (osTheme === 'osx') {
    return (
      <main
        className="flex flex-col overflow-hidden"
        style={{ height: '100vh', width: '100vw', margin: 0, padding: 0 }}
      >
        <section
          aria-label="macOS System Settings"
          className="h-full w-full flex flex-col"
        >
          <div className="subtle-card overflow-hidden h-full flex flex-col">
            <TitleBar>System Settings</TitleBar>
            <div className="flex-1 overflow-hidden">{children}</div>
          </div>
        </section>
      </main>
    );
  } else if (osTheme === 'windows') {
    return (
      <main
        className="flex flex-col overflow-hidden"
        style={{ height: '100vh', width: '100vw', margin: 0, padding: 0 }}
      >
        <section aria-label="Windows 11 Settings (System)" className="font-win">
          <div className="subtle-card overflow-hidden">
            <div className="h-12 bg-white border-b border-black/10 flex items-center px-4">
              <div className="text-sm text-black/50">Settings</div>
            </div>
          </div>
          <div className="flex-1 overflow-hidden">{children}</div>
        </section>
      </main>
    );
  }

  return <>{children}</>;
};

export default Template;
