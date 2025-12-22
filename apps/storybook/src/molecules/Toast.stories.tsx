// import utils
import type { Meta, StoryObj } from '@storybook/react';
// import components
import { Toast } from '@packages/ui';

/**
 * Toast component for notifications.
 */
const meta = {
  title: 'Molecules/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    message: { control: 'text' },
    type: {
      control: 'select',
      options: ['success', 'error', 'warning', 'info'],
    },
    duration: { control: 'number' },
    onClose: { action: 'closed' },
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    message: 'Operation completed successfully!',
    type: 'success',
  },
};

export const Error: Story = {
  args: {
    message: 'An error occurred. Please try again.',
    type: 'error',
  },
};

export const Warning: Story = {
  args: {
    message: 'Warning: Your session will expire soon.',
    type: 'warning',
  },
};

export const Info: Story = {
  args: {
    message: 'New updates are available.',
    type: 'info',
  },
};

export const LongMessage: Story = {
  args: {
    message:
      'This is a much longer notification message that demonstrates how the toast component handles longer content with multiple lines of text.',
    type: 'info',
  },
};
