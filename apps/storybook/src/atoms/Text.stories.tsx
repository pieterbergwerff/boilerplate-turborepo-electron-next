// import utils
import type { Meta, StoryObj } from '@storybook/react';
// import components
import { TextAtom as Text } from '@packages/ui';

/**
 * Text component for typography.
 */
const meta = {
  title: 'Atoms/Text',
  component: Text,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    as: {
      control: 'select',
      options: ['p', 'span', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl'],
    },
    weight: {
      control: 'select',
      options: ['normal', 'medium', 'semibold', 'bold'],
    },
    children: { control: 'text' },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Paragraph: Story = {
  args: {
    as: 'p',
    children: 'This is a paragraph of text.',
  },
};

export const Heading1: Story = {
  args: {
    as: 'h1',
    size: '4xl',
    weight: 'bold',
    children: 'Heading 1',
  },
};

export const Heading2: Story = {
  args: {
    as: 'h2',
    size: '3xl',
    weight: 'bold',
    children: 'Heading 2',
  },
};

export const Small: Story = {
  args: {
    as: 'span',
    size: 'sm',
    children: 'Small text',
  },
};

export const ExtraSmall: Story = {
  args: {
    as: 'span',
    size: 'xs',
    children: 'Extra small text',
  },
};

export const Bold: Story = {
  args: {
    as: 'span',
    weight: 'bold',
    children: 'Bold text',
  },
};

export const Large: Story = {
  args: {
    as: 'p',
    size: 'xl',
    children: 'Large text paragraph',
  },
};
