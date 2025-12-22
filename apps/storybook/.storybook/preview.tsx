import React from 'react';
import type { Preview } from '@storybook/react';
import '@packages/fonts/fonts.css';
import '@packages/ui/styles.css';
import './platform-themes.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  globalTypes: {
    theme: {
      description: 'Platform theme',
      defaultValue: 'macos',
      toolbar: {
        title: 'Platform',
        icon: 'browser',
        items: [
          { value: 'windows', title: 'Windows', icon: 'browser' },
          { value: 'macos', title: 'macOS', icon: 'browser' },
          { value: 'linux', title: 'Linux', icon: 'browser' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'macos';
      return (
        <div data-platform={theme} className={`platform-${theme}`}>
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
