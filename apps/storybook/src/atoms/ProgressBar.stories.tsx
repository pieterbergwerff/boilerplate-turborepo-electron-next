// import utils
import type { Meta, StoryObj } from '@storybook/react';
// import components
import { ProgressBarAtom as ProgressBar } from '@packages/ui';

/**
 * ProgressBar component for displaying progress.
 */
const meta = {
  title: 'Atoms/ProgressBar',
  component: ProgressBar,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    max: { control: { type: 'number', min: 1 } },
    color: { control: 'select', options: ['blue', 'green', 'red'] },
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 50,
  },
  decorators: [
    Story => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
};

export const Blue: Story = {
  args: {
    value: 75,
    color: 'blue',
  },
  decorators: [
    Story => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
};

export const Green: Story = {
  args: {
    value: 60,
    color: 'green',
  },
  decorators: [
    Story => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
};

export const Red: Story = {
  args: {
    value: 25,
    color: 'red',
  },
  decorators: [
    Story => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
};

export const Complete: Story = {
  args: {
    value: 100,
    color: 'green',
  },
  decorators: [
    Story => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
};
