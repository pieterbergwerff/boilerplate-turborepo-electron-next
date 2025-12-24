// import utils
import type { Meta, StoryObj } from '@storybook/react';
// import components
import { Input } from '@packages/ui/atoms/Input';

/**
 * Input component for text entry.
 */
const meta = {
  title: 'Atoms/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number'],
    },
    value: { control: 'text' },
    onChange: { action: 'changed' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    className: { control: 'text' },
    onFocus: { action: 'focused' },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {
  args: {
    type: 'text',
    placeholder: 'Enter text...',
  },
};

export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'Enter email...',
  },
};

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter password...',
  },
};

export const Number: Story = {
  args: {
    type: 'number',
    placeholder: 'Enter number...',
  },
};

export const Disabled: Story = {
  args: {
    type: 'text',
    value: 'Disabled input',
    disabled: true,
  },
};

export const WithValue: Story = {
  args: {
    type: 'text',
    value: 'Pre-filled value',
  },
};
