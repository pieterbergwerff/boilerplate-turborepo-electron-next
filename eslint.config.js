// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook';

// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11y,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      'react/react-in-jsx-scope': 'off', // Not needed in Next.js 13+
      'react/prop-types': 'off', // Using TypeScript for prop validation
    },
  },
  {
    files: ['apps/desktop/**/*.{ts,js}'],
    rules: {
      // Electron specific rules - desktop app uses CommonJS for preload scripts
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      'no-console': 'off',
    },
  },
  {
    ignores: [
      '**/dist/**',
      '**/build/**',
      '**/.next/**',
      '**/out/**',
      '**/node_modules/**',
      '**/.tscache/**',
      '**/storybook-static/**',
      '**/nextjs-standalone/**',
      '**/docs/assets/**',
      '**/docs/html/**',
      '**/electron/**',
      '*.min.js',
      '*.min.css',
      '**/*.config.{js,mjs,cjs}',
      '**/.eslintrc.{js,cjs}',
      '**/lighthouserc.js',
      '**/.bundlewatch.config.js',
      '**/.turbo/**',
      '**/scripts/**/*.mjs',
    ],
  },
  storybook.configs['flat/recommended'],
  {
    files: ['**/*.stories.{ts,tsx}'],
    rules: {
      // Allow direct @storybook/react imports in story files
      // This can be removed when migrating all stories to use @storybook/react-vite
      'storybook/no-renderer-packages': 'off',
    },
  }
);
