// import utils
import type { Meta, StoryObj } from '@storybook/react';
// import components
import { SwitchAtom as Switch } from '@packages/ui';

/**
 * Switch component for toggle input.
 */
const meta = {
  title: 'Atoms/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    onChange: { action: 'toggled' },
    label: { control: 'text' },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unchecked: Story = {
  args: {
    label: 'Enable feature',
  },
};

export const Checked: Story = {
  args: {
    checked: true,
    label: 'Feature enabled',
  },
};

export const NoLabel: Story = {
  args: {
    checked: false,
  },
};
