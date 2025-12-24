import type { StorybookConfig } from '@storybook/react-vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: [],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  staticDirs: [],
  core: {
    disableTelemetry: true,
  },
  docs: {
    defaultName: 'docs',
  },
  typescript: {
    check: false,
    reactDocgen: false,
  },
  viteFinal: async config => {
    // Allow Vite to access monorepo packages directory for transpilation
    if (config.server) {
      config.server.fs = {
        ...config.server.fs,
        allow: [
          path.resolve(__dirname, '../../..'), // Access to monorepo root
        ],
      };
    }
    return config;
  },
};

export default config;
