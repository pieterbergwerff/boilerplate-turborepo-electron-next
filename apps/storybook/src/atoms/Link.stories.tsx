// import utils
import type { Meta, StoryObj } from '@storybook/react';
// import components
import { Link } from '@packages/ui';

/**
 * Link component for navigation.
 */
const meta = {
  title: 'Atoms/Link',
  component: Link,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    href: { control: 'text' },
    children: { control: 'text' },
    external: { control: 'boolean' },
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Internal: Story = {
  args: {
    href: '/about',
    children: 'About Page',
  },
};

export const External: Story = {
  args: {
    href: 'https://example.com',
    children: 'Visit Example.com',
    external: true,
  },
};

export const LongText: Story = {
  args: {
    href: '#',
    children: 'This is a much longer link text that demonstrates how the link component handles longer content',
  },
};
