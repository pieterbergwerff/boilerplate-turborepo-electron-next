// import utils
import type { Meta, StoryObj } from '@storybook/react';
// import components
import { CarouselOrganism as Carousel } from '@packages/ui';

/**
 * Carousel component for sliding content.
 */
const meta = {
  title: 'Organisms/Carousel',
  component: Carousel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    items: { control: 'object' },
    autoPlay: { control: 'boolean' },
    interval: { control: 'number' },
  },
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: ['Slide 1', 'Slide 2', 'Slide 3'],
  },
  decorators: [
    Story => (
      <div style={{ width: '500px' }}>
        <Story />
      </div>
    ),
  ],
};

export const AutoPlay: Story = {
  args: {
    items: ['Auto Slide 1', 'Auto Slide 2', 'Auto Slide 3', 'Auto Slide 4'],
    autoPlay: true,
    interval: 3000,
  },
  decorators: [
    Story => (
      <div style={{ width: '500px' }}>
        <Story />
      </div>
    ),
  ],
};

export const ManySlides: Story = {
  args: {
    items: Array.from({ length: 8 }, (_, i) => `Slide ${i + 1}`),
  },
  decorators: [
    Story => (
      <div style={{ width: '500px' }}>
        <Story />
      </div>
    ),
  ],
};
