// @ts-check
import rootConfig from '../../eslint.config.js';

export default [
  ...rootConfig,
  {
    ignores: ['storybook-static/**'],
  },
  {
    files: ['**/*.stories.{ts,tsx}'],
    rules: {
      // Allow direct @storybook/react imports in story files
      // This can be removed when migrating all stories to use @storybook/react-vite
      'storybook/no-renderer-packages': 'off',
    },
  },
];
