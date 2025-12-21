// import utils
import type { Meta, StoryObj } from '@storybook/react';
// import components
import { Skeleton } from '@packages/ui';

/**
 * Skeleton component for loading states.
 */
const meta = {
  title: 'Atoms/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    width: { control: 'text' },
    height: { control: 'text' },
    circle: { control: 'boolean' },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: '200px',
    height: '20px',
  },
};

export const Wide: Story = {
  args: {
    width: '400px',
    height: '20px',
  },
};

export const Tall: Story = {
  args: {
    width: '200px',
    height: '100px',
  },
};

export const Circle: Story = {
  args: {
    width: '80px',
    height: '80px',
    circle: true,
  },
};

export const Avatar: Story = {
  args: {
    width: '48px',
    height: '48px',
    circle: true,
  },
};
