// import utils
import type { Meta, StoryObj } from '@storybook/react';
// import components
import { AvatarGroup } from '@packages/ui';

/**
 * AvatarGroup component displays multiple avatars with overflow handling.
 */
const meta = {
  title: 'Molecules/AvatarGroup',
  component: AvatarGroup,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    avatars: { control: 'object' },
    max: { control: 'number' },
  },
} satisfies Meta<typeof AvatarGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    avatars: [
      { src: 'https://via.placeholder.com/150', alt: 'User 1' },
      { src: 'https://via.placeholder.com/150', alt: 'User 2' },
      { src: 'https://via.placeholder.com/150', alt: 'User 3' },
    ],
  },
};

export const WithFallbacks: Story = {
  args: {
    avatars: [
      { alt: 'John Doe', fallback: 'JD' },
      { alt: 'Jane Smith', fallback: 'JS' },
      { alt: 'Bob Wilson', fallback: 'BW' },
      { alt: 'Alice Brown', fallback: 'AB' },
    ],
  },
};

export const MaxThree: Story = {
  args: {
    max: 3,
    avatars: [
      { alt: 'User 1', fallback: 'U1' },
      { alt: 'User 2', fallback: 'U2' },
      { alt: 'User 3', fallback: 'U3' },
      { alt: 'User 4', fallback: 'U4' },
      { alt: 'User 5', fallback: 'U5' },
    ],
  },
};

export const Many: Story = {
  args: {
    max: 5,
    avatars: Array.from({ length: 10 }, (_, i) => ({
      alt: `User ${i + 1}`,
      fallback: `U${i + 1}`,
    })),
  },
};
