import { Meta } from '@storybook/react-vite';
import { StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import React from 'react';
import Icon from './icon';
import '../../styles/index.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon,FontAwesomeIconProps} from '@fortawesome/react-fontawesome';
import { faCheck, faClose } from '@fortawesome/free-solid-svg-icons';

// 初始化 FontAwesome 图标库
library.add(fas);

// 元数据配置
const meta = {
  title:'Components/Icon',
  component: Icon,
   tags: ['autodocs'],
  // parameters: {
  //   docs: {
  //     // 关闭这个文件的 autodocs，避免与 icon.mdx 冲突
  //     autodocs: false,
  //   },
  // },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ADefaultIcons: Story = {
  args: {
    icon: faCheck, // 使用导入的图标对象，符合 IconProp 类型
    size: '3x',
  },
};


export const  BThemeIcons: Story = {
  args: {
    icon: 'spinner',
    spin: true,
    theme:'primary',
  },
};  



