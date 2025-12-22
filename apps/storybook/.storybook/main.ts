import type { StorybookConfig } from '@storybook/react-vite';

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
};

export default config;
