// import utils
import type { Meta, StoryObj } from '@storybook/react';
// import components
import { TooltipMolecule as Tooltip } from '@packages/ui';

/**
 * Tooltip component for contextual information.
 */
const meta = {
  title: 'Molecules/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    content: { control: 'text' },
    children: { control: 'text' },
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Top: Story = {
  args: {
    content: 'Tooltip on top',
    position: 'top',
    children: 'Hover me',
  },
};

export const Bottom: Story = {
  args: {
    content: 'Tooltip on bottom',
    position: 'bottom',
    children: 'Hover me',
  },
};

export const Left: Story = {
  args: {
    content: 'Tooltip on left',
    position: 'left',
    children: 'Hover me',
  },
};

export const Right: Story = {
  args: {
    content: 'Tooltip on right',
    position: 'right',
    children: 'Hover me',
  },
};

export const LongContent: Story = {
  args: {
    content:
      'This is a longer tooltip with more detailed information about the element',
    position: 'top',
    children: 'Hover for more info',
  },
};
