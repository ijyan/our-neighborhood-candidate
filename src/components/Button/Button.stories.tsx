import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Button from './Button';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'radio' },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

export const base: Story = {
  args: {
    color: 'base',
    appearance: 'fill',
    children: 'Base Button',
  },
};

export const Primary: Story = {
  args: {
    color: 'primary',
    appearance: 'fill',
    children: 'Primary Button',
  },
};

export const Outline: Story = {
  args: {
    color: 'base',
    appearance: 'outline',
    children: 'Outline Button',
  },
};
