import { Meta } from '@storybook/react-vite';
import { StoryObj } from '@storybook/react-vite';

import React from 'react';

import Button, { BaseButtonProps } from './button';
import '../../styles/index.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

// 初始化 FontAwesome 图标库
library.add(fas);

// 元数据配置

const meta = {
  title:'Components/Button',
  component: Button,
  tags: ['autodocs'],
  // autodocs:'tag',
} satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;


// 主要按钮
export const Primary: Story = {
  args: {
    btnType: 'primary',
    size:'lg',
    children: 'Primary Button',
  },
  // decorators:[
  //   (Story)=>(
  //     <div style={{ margin: '3em' }}>
  //       {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
  //       <Story />
  //     </div>
  //   )
  // ]
};

// 默认按钮
export const Default: Story = {
  args: {
    btnType: 'default',
    children: 'Default Button',
  },
};

// 危险按钮
export const Danger: Story = {
  args: {
    btnType: 'danger',
    children: 'Danger Button',
  },
};

// 链接按钮
export const Link: Story = {
  args: {
    btnType: 'link',
    href: '#',
    children: 'Link Button',
  },
};

// 大尺寸按钮
export const LargeSize: Story = {
  args: {
    size: 'lg',
    children: 'Large Button',
  },
};

// 小尺寸按钮
export const SmallSize: Story = {
  args: {
    size: 'sm',
    children: 'Small Button',
  },
};

// 禁用状态按钮
export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
};

// 禁用状态链接按钮
export const DisabledLink: Story = {
  args: {
    btnType: 'link',
    disabled: true,
    href: '#',
    children: 'Disabled Link',
  },
};

// // 带图标按钮
// export const WithIcon: Story = {
//   args: {
//     btnType: 'primary',
//     children: (
//       <>
//         <i className="fas fa-check" style={{ marginRight: '8px' }} />
//         Button with Icon
//       </>
//     ),
//   },
// };

// 可点击按钮（演示事件）
export const Clickable: Story = {
  args: {
    children: 'Click me',
    // 这里会使用 meta 中定义的 fn() 来监控点击
  },
};
