// import utils
import type { Meta, StoryObj } from '@storybook/react';
// import components
import { Popover } from '@packages/ui/organisms/Popover';

/**
 * Popover component for contextual content.
 */
const meta = {
  title: 'Organisms/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    trigger: { control: 'text' },
    content: { control: 'text' },
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
  },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Top: Story = {
  args: {
    trigger: 'Click me',
    content: 'This is a popover on top',
    position: 'top',
  },
};

export const Bottom: Story = {
  args: {
    trigger: 'Click me',
    content: 'This is a popover on bottom',
    position: 'bottom',
  },
};

export const Left: Story = {
  args: {
    trigger: 'Click me',
    content: 'This is a popover on left',
    position: 'left',
  },
};

export const Right: Story = {
  args: {
    trigger: 'Click me',
    content: 'This is a popover on right',
    position: 'right',
  },
};

export const LongContent: Story = {
  args: {
    trigger: 'More info',
    content:
      'This is a popover with longer content that provides more detailed information about the element.',
    position: 'bottom',
  },
};
