import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Molecules/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '콘텐츠를 담을 수 있는 카드 컴포넌트입니다. 헤더, 콘텐츠, 푸터를 포함할 수 있습니다.',
      },
    },
  },
  argTypes: {
    title: {
      control: { type: 'text' },
      description: '카드의 제목',
    },
    className: {
      control: { type: 'text' },
      description: '추가 CSS 클래스',
    },
    children: {
      control: { type: 'text' },
      description: '카드의 메인 콘텐츠',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '이것은 카드의 기본 콘텐츠입니다.',
  },
};

export const WithTitle: Story = {
  args: {
    title: '카드 제목',
    children: '제목이 있는 카드의 콘텐츠입니다.',
  },
};
