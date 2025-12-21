import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: [],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  staticDirs: [],
  docs: {
    disable: true,
  },
  typescript: {
    check: false,
    reactDocgen: false,
  },
};

export default config;
