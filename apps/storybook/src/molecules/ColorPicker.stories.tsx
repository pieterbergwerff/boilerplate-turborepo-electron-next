// import utils
import type { Meta, StoryObj } from '@storybook/react';
// import components
import { ColorPickerMolecule as ColorPicker } from '@packages/ui';

/**
 * ColorPicker component for selecting colors.
 */
const meta = {
  title: 'Molecules/ColorPicker',
  component: ColorPicker,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    value: { control: 'color' },
    onChange: { action: 'changed' },
  },
} satisfies Meta<typeof ColorPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: '#3b82f6',
  },
};

export const Red: Story = {
  args: {
    value: '#ef4444',
  },
};

export const Green: Story = {
  args: {
    value: '#10b981',
  },
};

export const Purple: Story = {
  args: {
    value: '#8b5cf6',
  },
};
