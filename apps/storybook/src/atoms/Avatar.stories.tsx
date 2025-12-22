// import utils
import type { Meta, StoryObj } from '@storybook/react';
// import components
import { Avatar } from '@packages/ui';

/**
 * Avatar component displays user profile images with fallback text support.
 */
const meta = {
  title: 'Atoms/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    fallback: { control: 'text' },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: 'https://via.placeholder.com/150',
    alt: 'John Doe',
  },
};

export const Small: Story = {
  args: {
    src: 'https://via.placeholder.com/150',
    alt: 'John Doe',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    src: 'https://via.placeholder.com/150',
    alt: 'John Doe',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    src: 'https://via.placeholder.com/150',
    alt: 'John Doe',
    size: 'lg',
  },
};

export const WithFallback: Story = {
  args: {
    alt: 'John Doe',
    fallback: 'JD',
  },
};

export const FallbackSmall: Story = {
  args: {
    alt: 'Jane Smith',
    fallback: 'JS',
    size: 'sm',
  },
};
