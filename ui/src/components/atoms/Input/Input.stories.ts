import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '다양한 타입과 상태를 지원하는 입력 필드 컴포넌트입니다.',
      },
    },
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number'],
      description: '입력 필드의 타입',
    },
    placeholder: {
      control: { type: 'text' },
      description: '플레이스홀더 텍스트',
    },
    value: {
      control: { type: 'text' },
      description: '입력 필드의 값',
    },
    disabled: {
      control: { type: 'boolean' },
      description: '입력 필드 비활성화 여부',
    },
    label: {
      control: { type: 'text' },
      description: '입력 필드의 라벨',
    },
    error: {
      control: { type: 'text' },
      description: '에러 메시지',
    },
    onChange: {
      action: 'changed',
      description: '값 변경 이벤트 핸들러',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: '텍스트를 입력하세요',
  },
};

export const WithLabel: Story = {
  args: {
    label: '이메일 주소',
    placeholder: 'example@email.com',
    type: 'email',
  },
};

export const WithValue: Story = {
  args: {
    label: '사용자 이름',
    value: '홍길동',
    placeholder: '사용자 이름을 입력하세요',
  },
};

export const Password: Story = {
  args: {
    label: '비밀번호',
    type: 'password',
    placeholder: '비밀번호를 입력하세요',
  },
};

export const Number: Story = {
  args: {
    label: '나이',
    type: 'number',
    placeholder: '나이를 입력하세요',
  },
};

export const WithError: Story = {
  args: {
    label: '이메일 주소',
    type: 'email',
    placeholder: 'example@email.com',
    error: '올바른 이메일 주소를 입력해주세요',
  },
};

export const Disabled: Story = {
  args: {
    label: '사용자 이름',
    value: '홍길동',
    disabled: true,
  },
};
