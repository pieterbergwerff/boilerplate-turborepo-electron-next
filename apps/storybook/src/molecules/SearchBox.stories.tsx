// import utils
import type { Meta, StoryObj } from '@storybook/react';
// import components
import { SearchBox } from '@packages/ui';

/**
 * SearchBox component with search icon.
 */
const meta = {
  title: 'Molecules/SearchBox',
  component: SearchBox,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    value: { control: 'text' },
    onChange: { action: 'changed' },
    placeholder: { control: 'text' },
  },
} satisfies Meta<typeof SearchBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Search...',
    onChange: () => {},
  },
};

export const WithValue: Story = {
  args: {
    value: 'Search query',
    onChange: () => {},
  },
};

export const CustomPlaceholder: Story = {
  args: {
    placeholder: 'Search products...',
    onChange: () => {},
  },
};
