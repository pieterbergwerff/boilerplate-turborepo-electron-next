// import utils
import type { Meta, StoryObj } from '@storybook/react';
// import components
import { MenuOrganism as Menu } from '@packages/ui';

/**
 * Menu component for navigation.
 */
const meta = {
  title: 'Organisms/Menu',
  component: Menu,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    data: { control: 'object' },
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
  },
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
    data: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Services', href: '/services' },
      { label: 'Contact', href: '/contact' },
    ],
  },
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    data: [
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Projects', href: '/projects' },
      { label: 'Team', href: '/team' },
      { label: 'Settings', href: '/settings' },
    ],
  },
};

export const SimpleNav: Story = {
  args: {
    orientation: 'horizontal',
    data: [
      { label: 'Products', href: '/products' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Blog', href: '/blog' },
    ],
  },
};

export const Sidebar: Story = {
  args: {
    orientation: 'vertical',
    data: [
      { label: 'Overview', href: '/overview' },
      { label: 'Analytics', href: '/analytics' },
      { label: 'Reports', href: '/reports' },
      { label: 'Users', href: '/users' },
      { label: 'Integrations', href: '/integrations' },
      { label: 'API', href: '/api' },
    ],
  },
  decorators: [
    Story => (
      <div style={{ width: '200px' }}>
        <Story />
      </div>
    ),
  ],
};
