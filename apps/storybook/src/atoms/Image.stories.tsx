// import utils
import type { Meta, StoryObj } from '@storybook/react';
// import components
import { ImageAtom as Image } from '@packages/ui';

/**
 * Image component with Tailwind styling.
 */
const meta = {
  title: 'Atoms/Image',
  component: Image,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },
    className: { control: 'text' },
  },
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: 'https://via.placeholder.com/400x300',
    alt: 'Placeholder image',
  },
};

export const Rounded: Story = {
  args: {
    src: 'https://via.placeholder.com/300',
    alt: 'Rounded image',
    className: 'rounded-lg',
  },
};

export const Circle: Story = {
  args: {
    src: 'https://via.placeholder.com/200',
    alt: 'Circle image',
    className: 'rounded-full',
  },
};
