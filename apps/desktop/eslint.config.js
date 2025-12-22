import baseConfig from '@config/eslint/eslint.config.js';

export default [
  ...baseConfig,
  {
    rules: {
      // Desktop app uses CommonJS (required for Electron preload context bridge)
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
];
