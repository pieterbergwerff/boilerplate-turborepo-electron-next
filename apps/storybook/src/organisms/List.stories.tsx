// import utils
import type { Meta, StoryObj } from '@storybook/react';
// import components
import { List } from '@packages/ui';

/**
 * List component for ordered and unordered lists.
 */
const meta = {
  title: 'Organisms/List',
  component: List,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    items: { control: 'object' },
    ordered: { control: 'boolean' },
  },
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unordered: Story = {
  args: {
    items: ['First item', 'Second item', 'Third item'],
  },
  decorators: [
    Story => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
};

export const Ordered: Story = {
  args: {
    ordered: true,
    items: ['First step', 'Second step', 'Third step'],
  },
  decorators: [
    Story => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
};

export const TodoList: Story = {
  args: {
    items: [
      'Complete project documentation',
      'Review pull requests',
      'Update dependencies',
      'Write unit tests',
      'Deploy to production',
    ],
  },
  decorators: [
    Story => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

export const ShoppingList: Story = {
  args: {
    items: ['Milk', 'Bread', 'Eggs', 'Butter', 'Cheese', 'Apples', 'Bananas'],
  },
  decorators: [
    Story => (
      <div style={{ width: '300px' }}>
        <Story />
      </div>
    ),
  ],
};
