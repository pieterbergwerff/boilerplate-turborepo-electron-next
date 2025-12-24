// import utils
import type { Meta, StoryObj } from '@storybook/react';
// import components
import { Accordion } from '@packages/ui/organisms/Accordion';

/**
 * Accordion component for collapsible content sections.
 */
const meta = {
  title: 'Organisms/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    items: { control: 'object' },
    allowMultiple: { control: 'boolean' },
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      {
        title: 'Section 1',
        content: 'Content for section 1',
      },
      {
        title: 'Section 2',
        content: 'Content for section 2',
      },
      {
        title: 'Section 3',
        content: 'Content for section 3',
      },
    ],
  },
  decorators: [
    Story => (
      <div style={{ width: '500px' }}>
        <Story />
      </div>
    ),
  ],
};

export const AllowMultiple: Story = {
  args: {
    allowMultiple: true,
    items: [
      {
        title: 'Section 1',
        content: 'You can open multiple sections at once',
      },
      {
        title: 'Section 2',
        content: 'Try opening this while section 1 is open',
      },
      {
        title: 'Section 3',
        content: 'And this one too!',
      },
    ],
  },
  decorators: [
    Story => (
      <div style={{ width: '500px' }}>
        <Story />
      </div>
    ),
  ],
};

export const LongContent: Story = {
  args: {
    items: [
      {
        title: 'Introduction',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      },
      {
        title: 'Details',
        content:
          'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      },
      {
        title: 'Conclusion',
        content:
          'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
    ],
  },
  decorators: [
    Story => (
      <div style={{ width: '600px' }}>
        <Story />
      </div>
    ),
  ],
};
