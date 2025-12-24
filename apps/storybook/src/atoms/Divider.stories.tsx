// import utils
import type { Meta, StoryObj } from '@storybook/react';
// import components
import { Divider } from '@packages/ui/atoms/Divider';

/**
 * Divider component for visual separation.
 */
const meta = {
  title: 'Atoms/Divider',
  component: Divider,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
  },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
  },
  decorators: [
    Story => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
  decorators: [
    Story => (
      <div style={{ height: '100px', display: 'flex', alignItems: 'center' }}>
        <Story />
      </div>
    ),
  ],
};
