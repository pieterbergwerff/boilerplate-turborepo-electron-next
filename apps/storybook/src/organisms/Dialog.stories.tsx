// import utils
import type { Meta, StoryObj } from '@storybook/react';
// import components
import { DialogOrganism as Dialog } from '@packages/ui';

/**
 * Dialog component for modal interactions.
 */
const meta = {
  title: 'Organisms/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    open: { control: 'boolean' },
    onClose: { action: 'closed' },
    title: { control: 'text' },
    children: { control: 'text' },
    footer: { control: 'text' },
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: true,
    onClose: () => {},
    title: 'Dialog Title',
    children: 'This is the dialog content.',
  },
};

export const WithFooter: Story = {
  args: {
    open: true,
    onClose: () => {},
    title: 'Confirm Action',
    children: 'Are you sure you want to proceed with this action?',
    footer: 'Footer with action buttons',
  },
};

export const LongContent: Story = {
  args: {
    open: true,
    onClose: () => {},
    title: 'Terms and Conditions',
    children:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
};

export const Closed: Story = {
  args: {
    open: false,
    onClose: () => {},
    title: 'Hidden Dialog',
    children: 'This dialog is closed.',
  },
};
