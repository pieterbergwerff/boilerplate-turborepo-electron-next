// import utils
import type { Meta, StoryObj } from '@storybook/react';
// import components
import { Toolbar } from '@packages/ui/organisms/Toolbar';

/**
 * Toolbar component for action buttons.
 */
const meta = {
  title: 'Organisms/Toolbar',
  component: Toolbar,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    actions: { control: 'object' },
  },
} satisfies Meta<typeof Toolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    actions: [
      { label: 'Save', onClick: () => {} },
      { label: 'Cancel', onClick: () => {} },
      { label: 'Reset', onClick: () => {} },
    ],
  },
  decorators: [
    Story => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

export const WithDisabled: Story = {
  args: {
    actions: [
      { label: 'Edit', onClick: () => {} },
      { label: 'Delete', onClick: () => {}, disabled: true },
      { label: 'Share', onClick: () => {} },
    ],
  },
  decorators: [
    Story => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

export const ManyActions: Story = {
  args: {
    actions: [
      { label: 'New', onClick: () => {} },
      { label: 'Open', onClick: () => {} },
      { label: 'Save', onClick: () => {} },
      { label: 'Save As', onClick: () => {} },
      { label: 'Close', onClick: () => {} },
      { label: 'Print', onClick: () => {} },
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

export const FewActions: Story = {
  args: {
    actions: [
      { label: 'Submit', onClick: () => {} },
      { label: 'Cancel', onClick: () => {} },
    ],
  },
  decorators: [
    Story => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
};
