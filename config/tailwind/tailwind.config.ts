import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  content: [],
  theme: {
    extend: {
      // Windows 11 Fluent Design colors
      colors: {
        // Windows accent colors
        'win-accent': {
          DEFAULT: '#0078d4',
          light: '#0090f1',
          dark: '#106ebe',
        },
        // macOS colors
        'mac-accent': {
          DEFAULT: '#007aff',
          light: '#5ac8fa',
          dark: '#0051d5',
        },
        // Linux GNOME colors
        'linux-accent': {
          DEFAULT: '#3584e4',
          light: '#62a0ea',
          dark: '#1c71d8',
        },
      },
      // OS-specific border radius
      borderRadius: {
        win: '4px',
        mac: '8px',
        linux: '6px',
      },
      // OS-specific shadows
      boxShadow: {
        win: '0 2px 4px rgba(0, 0, 0, 0.14), 0 0 2px rgba(0, 0, 0, 0.12)',
        mac: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
        linux: '0 2px 3px rgba(0, 0, 0, 0.16), 0 1px 2px rgba(0, 0, 0, 0.23)',
      },
    },
  },
  plugins: [
    // Custom plugin for OS theme variants
    plugin(({ addVariant }) => {
      addVariant('windows', '[data-os-theme="windows"] &');
      addVariant('osx', '[data-os-theme="osx"] &');
      addVariant('linux', '[data-os-theme="linux"] &');
    }),
  ],
};

export default config;
