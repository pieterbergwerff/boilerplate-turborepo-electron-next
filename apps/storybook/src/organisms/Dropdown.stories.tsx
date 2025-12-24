// import utils
import type { Meta, StoryObj } from '@storybook/react';
// import components
import { Dropdown } from '@packages/ui/organisms/Dropdown';

/**
 * Dropdown component for menu actions.
 */
const meta = {
  title: 'Organisms/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: { control: 'text' },
    options: { control: 'object' },
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Actions',
    options: [
      { label: 'Edit', onClick: () => {} },
      { label: 'Delete', onClick: () => {} },
      { label: 'Share', onClick: () => {} },
    ],
  },
};

export const UserMenu: Story = {
  args: {
    label: 'Account',
    options: [
      { label: 'Profile', onClick: () => {} },
      { label: 'Settings', onClick: () => {} },
      { label: 'Billing', onClick: () => {} },
      { label: 'Sign Out', onClick: () => {} },
    ],
  },
};

export const FewOptions: Story = {
  args: {
    label: 'More',
    options: [
      { label: 'Copy', onClick: () => {} },
      { label: 'Paste', onClick: () => {} },
    ],
  },
};

export const ManyOptions: Story = {
  args: {
    label: 'Options',
    options: Array.from({ length: 10 }, (_, i) => ({
      label: `Option ${i + 1}`,
      onClick: () => {},
    })),
  },
};
