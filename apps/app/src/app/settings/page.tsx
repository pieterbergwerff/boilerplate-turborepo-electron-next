// import utils
'use client';
import React, { useEffect, useState } from 'react';
// import constants
// (none)
// import components
// (none)
// import types
import type {
  AppInfo,
  OpenDialogResult,
  Settings,
  Theme,
} from '@packages/validators';

/**
 * Settings page showing example IPC calls.
 * @returns {JSX.Element} Settings UI with actions
 */
export default function SettingsPage(): JSX.Element {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [info, setInfo] = useState<AppInfo | null>(null);
  const [dialogRes, setDialogRes] = useState<OpenDialogResult | null>(null);

  /**
   * Load initial data from Electron via preload API.
   * @returns {Promise<void>}
   */
  async function loadInitial(): Promise<void> {
    const [s, i] = await Promise.all([
      window.api.getSettings(),
      window.api.getAppInfo(),
    ]);
    setSettings(s);
    setInfo(i);
  }

  useEffect(() => {
    void loadInitial();
  }, []);

  /**
   * Toggle theme and persist via IPC.
   * @param {Theme} nextTheme Target theme
   * @returns {Promise<void>}
   */
  async function onToggle(nextTheme: Theme): Promise<void> {
    const updated = await window.api.setTheme(nextTheme);
    setSettings(updated);
  }

  /**
   * Open a file dialog (example IPC).
   * @returns {Promise<void>}
   */
  async function onOpenDialog(): Promise<void> {
    const res = await window.api.openDialog({
      filters: [{ name: 'Text', extensions: ['txt', 'md'] }],
    });
    setDialogRes(res);
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Settings</h1>

      <section style={{ marginBottom: 16 }}>
        <h2>Current</h2>
        <pre>{JSON.stringify({ settings, info }, null, 2)}</pre>
      </section>

      <section style={{ marginBottom: 16 }}>
        <h2>Theme</h2>
        <button
          onClick={() => onToggle('light')}
          disabled={settings?.theme === 'light'}
        >
          Light
        </button>{' '}
        <button
          onClick={() => onToggle('dark')}
          disabled={settings?.theme === 'dark'}
        >
          Dark
        </button>
      </section>

      <section>
        <h2>Open Dialog</h2>
        <button onClick={onOpenDialog}>Choose file…</button>
        {dialogRes && <pre>{JSON.stringify(dialogRes, null, 2)}</pre>}
      </section>
    </div>
  );
}
