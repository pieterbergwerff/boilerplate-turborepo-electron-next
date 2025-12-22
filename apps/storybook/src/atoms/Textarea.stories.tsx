// import utils
import type { Meta, StoryObj } from '@storybook/react';
// import components
import { Textarea } from '@packages/ui';

/**
 * Textarea component for multi-line text input.
 */
const meta = {
  title: 'Atoms/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    value: { control: 'text' },
    onChange: { action: 'changed' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    rows: { control: { type: 'number', min: 1, max: 20 } },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter your text here...',
  },
};

export const WithValue: Story = {
  args: {
    value: 'This is some pre-filled text content in the textarea.',
  },
};

export const Disabled: Story = {
  args: {
    value: 'This textarea is disabled',
    disabled: true,
  },
};

export const FewRows: Story = {
  args: {
    rows: 3,
    placeholder: '3 rows...',
  },
};

export const ManyRows: Story = {
  args: {
    rows: 10,
    placeholder: '10 rows...',
  },
};
