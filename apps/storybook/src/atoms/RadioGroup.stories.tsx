// import utils
import type { Meta, StoryObj } from '@storybook/react';
// import components
import { RadioGroupAtom as RadioGroup } from '@packages/ui';

/**
 * RadioGroup component for single selection from multiple options.
 */
const meta = {
  title: 'Atoms/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    name: { control: 'text' },
    options: { control: 'object' },
    value: { control: 'text' },
    onChange: { action: 'changed' },
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'choice',
    options: [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
      { label: 'Option 3', value: '3' },
    ],
  },
};

export const WithSelection: Story = {
  args: {
    name: 'color',
    value: 'blue',
    options: [
      { label: 'Red', value: 'red' },
      { label: 'Blue', value: 'blue' },
      { label: 'Green', value: 'green' },
    ],
  },
};

export const FewOptions: Story = {
  args: {
    name: 'yesno',
    options: [
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' },
    ],
  },
};

export const ManyOptions: Story = {
  args: {
    name: 'size',
    options: [
      { label: 'Extra Small', value: 'xs' },
      { label: 'Small', value: 'sm' },
      { label: 'Medium', value: 'md' },
      { label: 'Large', value: 'lg' },
      { label: 'Extra Large', value: 'xl' },
      { label: '2X Large', value: '2xl' },
    ],
  },
};
