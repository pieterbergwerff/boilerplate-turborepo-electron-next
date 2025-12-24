'use client';
// import utils
import React from 'react';
// import components
import { Accordion } from '@packages/ui/organisms/Accordion';
import { Avatar } from '@packages/ui/atoms/Avatar';
import { AvatarGroup } from '@packages/ui/molecules/AvatarGroup';
import { Badge } from '@packages/ui/atoms/Badge';
import { Breadcrumb } from '@packages/ui/molecules/Breadcrumb';
import { Button } from '@packages/ui/atoms/Button';
import { Card } from '@packages/ui/organisms/Card';
import { Carousel } from '@packages/ui/organisms/Carousel';
import { Checkbox } from '@packages/ui/atoms/Checkbox';
import { ColorPicker } from '@packages/ui/molecules/ColorPicker';
import { Combobox } from '@packages/ui/organisms/Combobox';
import { Divider } from '@packages/ui/atoms/Divider';
import { Dropdown } from '@packages/ui/organisms/Dropdown';
import { Image } from '@packages/ui/atoms/Image';
import { Input } from '@packages/ui/atoms/Input';
import { Label } from '@packages/ui/atoms/Label';
import { Link } from '@packages/ui/atoms/Link';
import { List } from '@packages/ui/organisms/List';
import { Menu } from '@packages/ui/organisms/Menu';
import { Popover } from '@packages/ui/organisms/Popover';
import { ProgressBar } from '@packages/ui/atoms/ProgressBar';
import { RadioGroup } from '@packages/ui/atoms/RadioGroup';
import { SearchBox } from '@packages/ui/molecules/SearchBox';
import { Select } from '@packages/ui/molecules/Select';
import { Skeleton } from '@packages/ui/atoms/Skeleton';
import { Slider } from '@packages/ui/atoms/Slider';
import { Switch } from '@packages/ui/atoms/Switch';
import { Text } from '@packages/ui/atoms/Text';
import { Textarea } from '@packages/ui/atoms/Textarea';
import { Toast } from '@packages/ui/molecules/Toast';
import { Toolbar } from '@packages/ui/organisms/Toolbar';
import { Tooltip } from '@packages/ui/molecules/Tooltip';
import { PageMeta } from '@packages/ui/atoms/PageMeta';
import '@packages/ui/styles.css';

/**
 * Showcase page displaying all UI components.
 * @returns {React.JSX.Element} Components showcase page
 */
export default function ComponentsPage(): React.JSX.Element {
  const [searchValue, setSearchValue] = React.useState('');

  return (
    <div>
      <PageMeta title="UI Components Showcase" />
      <div className="mb-12">
        <Text as="h1" size="4xl" weight="bold">
          UI Components Showcase
        </Text>
        <Text as="p" size="lg" className="mt-4 text-gray-600">
          A comprehensive collection of reusable React components built with
          Tailwind CSS.
        </Text>
      </div>

      <a href="/">Go to Home Page</a>

      {/* Atoms Section */}
      <section className="mb-16">
        <Text as="h2" size="3xl" weight="bold" className="mb-8">
          Atoms
        </Text>

        {/* Avatar */}
        <div className="mb-8  p-6 rounded-lg shadow">
          <Text as="h3" size="xl" weight="semibold" className="mb-4">
            Avatar
          </Text>
          <div className="flex gap-4 items-center">
            <Avatar
              src="https://via.placeholder.com/150"
              alt="User"
              size="sm"
            />
            <Avatar
              src="https://via.placeholder.com/150"
              alt="User"
              size="md"
            />
            <Avatar
              src="https://via.placeholder.com/150"
              alt="User"
              size="lg"
            />
            <Avatar alt="User" fallback="JD" size="md" />
          </div>
        </div>

        {/* Badge */}
        <div className="mb-8  p-6 rounded-lg shadow">
          <Text as="h3" size="xl" weight="semibold" className="mb-4">
            Badge
          </Text>
          <div className="flex gap-4 items-center flex-wrap">
            <Badge>Default</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
            <Badge size="sm">Small</Badge>
            <Badge size="md">Medium</Badge>
            <Badge size="lg">Large</Badge>
          </div>
        </div>

        {/* Button */}
        <div className="mb-8  p-6 rounded-lg shadow">
          <Text as="h3" size="xl" weight="semibold" className="mb-4">
            Button
          </Text>
          <div className="flex gap-4">
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
          </div>
        </div>

        {/* Checkbox */}
        <div className="mb-8  p-6 rounded-lg shadow">
          <Text as="h3" size="xl" weight="semibold" className="mb-4">
            Checkbox
          </Text>
          <div className="space-y-2">
            <Checkbox label="Option 1" />
            <Checkbox label="Option 2 (Checked)" checked />
            <Checkbox label="Option 3 (Disabled)" disabled />
          </div>
        </div>

        {/* Divider */}
        <div className="mb-8  p-6 rounded-lg shadow">
          <Text as="h3" size="xl" weight="semibold" className="mb-4">
            Divider
          </Text>
          <Divider />
          <div className="mt-4 flex items-center gap-4">
            <Text>Left</Text>
            <Divider orientation="vertical" />
            <Text>Right</Text>
          </div>
        </div>

        {/* Image */}
        <div className="mb-8  p-6 rounded-lg shadow">
          <Text as="h3" size="xl" weight="semibold" className="mb-4">
            Image
          </Text>
          <div className="flex gap-4">
            <Image
              src="https://via.placeholder.com/200"
              alt="Default"
              className="rounded-lg"
            />
            <Image
              src="https://via.placeholder.com/150"
              alt="Circle"
              className="rounded-full"
            />
          </div>
        </div>

        {/* Input */}
        <div className="mb-8  p-6 rounded-lg shadow">
          <Text as="h3" size="xl" weight="semibold" className="mb-4">
            Input
          </Text>
          <div className="space-y-4 max-w-md">
            <Input type="text" placeholder="Text input" />
            <Input type="email" placeholder="Email input" />
            <Input type="password" placeholder="Password input" />
            <Input type="number" placeholder="Number input" />
          </div>
        </div>

        {/* Label */}
        <div className="mb-8  p-6 rounded-lg shadow">
          <Text as="h3" size="xl" weight="semibold" className="mb-4">
            Label
          </Text>
          <div className="space-y-2">
            <Label>Standard Label</Label>
            <Label required>Required Label</Label>
          </div>
        </div>

        {/* Link */}
        <div className="mb-8  p-6 rounded-lg shadow">
          <Text as="h3" size="xl" weight="semibold" className="mb-4">
            Link
          </Text>
          <div className="space-y-2">
            <div>
              <Link href="/about">Internal Link</Link>
            </div>
            <div>
              <Link href="https://example.com" external>
                External Link
              </Link>
            </div>
          </div>
        </div>

        {/* ProgressBar */}
        <div className="mb-8  p-6 rounded-lg shadow">
          <Text as="h3" size="xl" weight="semibold" className="mb-4">
            ProgressBar
          </Text>
          <div className="space-y-4">
            <ProgressBar value={25} color="blue" />
            <ProgressBar value={50} color="green" />
            <ProgressBar value={75} color="red" />
          </div>
        </div>

        {/* RadioGroup */}
        <div className="mb-8  p-6 rounded-lg shadow">
          <Text as="h3" size="xl" weight="semibold" className="mb-4">
            RadioGroup
          </Text>
          <RadioGroup
            name="demo-radio"
            options={[
              { label: 'Option 1', value: '1' },
              { label: 'Option 2', value: '2' },
              { label: 'Option 3', value: '3' },
            ]}
          />
        </div>

        {/* Skeleton */}
        <div className="mb-8  p-6 rounded-lg shadow">
          <Text as="h3" size="xl" weight="semibold" className="mb-4">
            Skeleton
          </Text>
          <div className="space-y-4">
            <Skeleton width="200px" height="20px" />
            <Skeleton width="300px" height="20px" />
            <Skeleton width="100px" height="100px" circle />
          </div>
        </div>

        {/* Slider */}
        <div className="mb-8  p-6 rounded-lg shadow">
          <Text as="h3" size="xl" weight="semibold" className="mb-4">
            Slider
          </Text>
          <div className="max-w-md">
            <Slider value={50} min={0} max={100} />
          </div>
        </div>

        {/* Switch */}
        <div className="mb-8  p-6 rounded-lg shadow">
          <Text as="h3" size="xl" weight="semibold" className="mb-4">
            Switch
          </Text>
          <div className="space-y-2">
            <Switch label="Enable feature" />
            <Switch label="Enabled by default" checked />
          </div>
        </div>

        {/* Text */}
        <div className="mb-8  p-6 rounded-lg shadow">
          <Text as="h3" size="xl" weight="semibold" className="mb-4">
            Text
          </Text>
          <div className="space-y-2">
            <Text as="h1" size="4xl" weight="bold">
              Heading 1
            </Text>
            <Text as="h2" size="3xl" weight="bold">
              Heading 2
            </Text>
            <Text as="p" size="base">
              Paragraph text
            </Text>
            <Text as="span" size="sm" weight="medium">
              Small text
            </Text>
          </div>
        </div>

        {/* Textarea */}
        <div className="mb-8  p-6 rounded-lg shadow">
          <Text as="h3" size="xl" weight="semibold" className="mb-4">
            Textarea
          </Text>
          <div className="max-w-md">
            <Textarea placeholder="Enter your text here..." rows={4} />
          </div>
        </div>
      </section>

      {/* Molecules Section */}
      <section className="mb-16">
        <Text as="h2" size="3xl" weight="bold" className="mb-8">
          Molecules
        </Text>

        {/* AvatarGroup */}
        <div className="mb-8  p-6 rounded-lg shadow">
          <Text as="h3" size="xl" weight="semibold" className="mb-4">
            AvatarGroup
          </Text>
          <AvatarGroup
            avatars={[
              {
                src: 'https://via.placeholder.com/150',
                alt: 'User 1',
              },
              {
                src: 'https://via.placeholder.com/150',
                alt: 'User 2',
              },
              {
                src: 'https://via.placeholder.com/150',
                alt: 'User 3',
              },
              { alt: 'User 4', fallback: 'U4' },
              { alt: 'User 5', fallback: 'U5' },
            ]}
            max={3}
          />
        </div>

        {/* Breadcrumb */}
        <div className="mb-8  p-6 rounded-lg shadow">
          <Text as="h3" size="xl" weight="semibold" className="mb-4">
            Breadcrumb
          </Text>
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Products', href: '/products' },
              { label: 'Category', href: '/products/category' },
            ]}
          />
        </div>

        {/* ColorPicker */}
        <div className="mb-8  p-6 rounded-lg shadow">
          <Text as="h3" size="xl" weight="semibold" className="mb-4">
            ColorPicker
          </Text>
          <ColorPicker value="#3b82f6" />
        </div>

        {/* SearchBox */}
        <div className="mb-8  p-6 rounded-lg shadow">
          <Text as="h3" size="xl" weight="semibold" className="mb-4">
            SearchBox
          </Text>
          <div className="max-w-md">
            <SearchBox
              value={searchValue}
              onChange={setSearchValue}
              placeholder="Search..."
            />
          </div>
        </div>

        {/* Select */}
        <div className="mb-8  p-6 rounded-lg shadow">
          <Text as="h3" size="xl" weight="semibold" className="mb-4">
            Select
          </Text>
          <div className="max-w-md">
            <Select
              placeholder="Select an option"
              options={[
                { label: 'Option 1', value: '1' },
                { label: 'Option 2', value: '2' },
                { label: 'Option 3', value: '3' },
              ]}
            />
          </div>
        </div>

        {/* Toast */}
        <div className="mb-8  p-6 rounded-lg shadow">
          <Text as="h3" size="xl" weight="semibold" className="mb-4">
            Toast
          </Text>
          <div className="space-y-4">
            <Toast message="Success message!" type="success" />
            <Toast message="Error message!" type="error" />
            <Toast message="Warning message!" type="warning" />
            <Toast message="Info message!" type="info" />
          </div>
        </div>

        {/* Tooltip */}
        <div className="mb-8  p-6 rounded-lg shadow">
          <Text as="h3" size="xl" weight="semibold" className="mb-4">
            Tooltip
          </Text>
          <div className="flex gap-4">
            <Tooltip content="Tooltip on top" position="top">
              Hover me (top)
            </Tooltip>
            <Tooltip content="Tooltip on bottom" position="bottom">
              Hover me (bottom)
            </Tooltip>
            <Tooltip content="Tooltip on left" position="left">
              Hover me (left)
            </Tooltip>
            <Tooltip content="Tooltip on right" position="right">
              Hover me (right)
            </Tooltip>
          </div>
        </div>
      </section>

      {/* Organisms Section */}
      <section className="mb-16">
        <Text as="h2" size="3xl" weight="bold" className="mb-8">
          Organisms
        </Text>

        {/* Accordion */}
        <div className="mb-8  p-6 rounded-lg shadow">
          <Text as="h3" size="xl" weight="semibold" className="mb-4">
            Accordion
          </Text>
          <Accordion
            items={[
              {
                title: 'Section 1',
                content: 'Content for section 1',
              },
              {
                title: 'Section 2',
                content: 'Content for section 2',
              },
              {
                title: 'Section 3',
                content: 'Content for section 3',
              },
            ]}
          />
        </div>

        {/* Card */}
        <div className="mb-8  p-6 rounded-lg shadow">
          <Text as="h3" size="xl" weight="semibold" className="mb-4">
            Card
          </Text>
          <Card
            title="Card Title"
            footer={<Button variant="primary">Action</Button>}
          >
            This is the card content. It can contain any React elements.
          </Card>
        </div>

        {/* Carousel */}
        <div className="mb-8  p-6 rounded-lg shadow">
          <Text as="h3" size="xl" weight="semibold" className="mb-4">
            Carousel
          </Text>
          <Carousel items={['Slide 1', 'Slide 2', 'Slide 3', 'Slide 4']} />
        </div>

        {/* Combobox */}
        <div className="mb-8  p-6 rounded-lg shadow">
          <Text as="h3" size="xl" weight="semibold" className="mb-4">
            Combobox
          </Text>
          <div className="max-w-md">
            <Combobox
              placeholder="Type to search..."
              options={[
                { label: 'Apple', value: 'apple' },
                { label: 'Banana', value: 'banana' },
                { label: 'Cherry', value: 'cherry' },
                { label: 'Date', value: 'date' },
              ]}
            />
          </div>
        </div>

        {/* Dialog */}
        <div className="mb-8  p-6 rounded-lg shadow">
          <Text as="h3" size="xl" weight="semibold" className="mb-4">
            Dialog
          </Text>
          <Text size="sm" className="text-gray-600">
            Dialog component (open state shown in Storybook)
          </Text>
        </div>

        {/* Dropdown */}
        <div className="mb-8  p-6 rounded-lg shadow">
          <Text as="h3" size="xl" weight="semibold" className="mb-4">
            Dropdown
          </Text>
          <Dropdown
            label="Actions"
            options={[
              { label: 'Edit', onClick: () => {} },
              { label: 'Delete', onClick: () => {} },
              { label: 'Share', onClick: () => {} },
            ]}
          />
        </div>

        {/* List */}
        <div className="mb-8  p-6 rounded-lg shadow">
          <Text as="h3" size="xl" weight="semibold" className="mb-4">
            List
          </Text>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <Text size="sm" weight="semibold" className="mb-2">
                Unordered
              </Text>
              <List data={['Item 1', 'Item 2', 'Item 3']} />
            </div>
            <div>
              <Text size="sm" weight="semibold" className="mb-2">
                Ordered
              </Text>
              <List ordered data={['First', 'Second', 'Third']} />
            </div>
          </div>
        </div>

        {/* Menu */}
        <div className="mb-8  p-6 rounded-lg shadow">
          <Text as="h3" size="xl" weight="semibold" className="mb-4">
            Menu
          </Text>
          <div className="space-y-8">
            <div>
              <Text size="sm" weight="semibold" className="mb-2">
                Horizontal
              </Text>
              <Menu
                orientation="horizontal"
                data={[
                  { label: 'Home', href: '/' },
                  { label: 'About', href: '/about' },
                  { label: 'Contact', href: '/contact' },
                ]}
              />
            </div>
            <div>
              <Text size="sm" weight="semibold" className="mb-2">
                Vertical
              </Text>
              <Menu
                orientation="vertical"
                data={[
                  { label: 'Dashboard', href: '/dashboard' },
                  { label: 'Projects', href: '/projects' },
                  { label: 'Settings', href: '/settings' },
                ]}
              />
            </div>
          </div>
        </div>

        {/* Popover */}
        <div className="mb-8  p-6 rounded-lg shadow">
          <Text as="h3" size="xl" weight="semibold" className="mb-4">
            Popover
          </Text>
          <div className="flex gap-4">
            <Popover trigger="Click me" content="Popover content" />
          </div>
        </div>

        {/* Toolbar */}
        <div className="mb-8  p-6 rounded-lg shadow">
          <Text as="h3" size="xl" weight="semibold" className="mb-4">
            Toolbar
          </Text>
          <Toolbar
            actions={[
              { label: 'Save', onClick: () => {} },
              { label: 'Cancel', onClick: () => {} },
              { label: 'Reset', onClick: () => {}, disabled: true },
            ]}
          />
        </div>
      </section>
    </div>
  );
}
