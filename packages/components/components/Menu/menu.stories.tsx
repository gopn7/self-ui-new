import { Meta } from '@storybook/react-vite';
import { StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';
import React from 'react';

import MenuItem from './menuItem';
import SubMenu from './subMenu';
import Menu from './menu';
import '../../styles/index.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
// import { Transition } from 'react-transition-group';
import type { Preview } from '@storybook/react-vite';

library.add(fas);

const meta = {
  title: 'Components/Menu',
  component: Menu,
  tags: ['autodocs'],
  subcomponents: { 'SubMenu': SubMenu, 'Item': MenuItem },
  args: {
    defaultIndex: '',
    onSelect: fn()
  },
  // parameters:{
  //   controls:{
  //     matchers:{
  //       date:/mode$/
  //     }
  //   }
  // }
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>

export const Horizontal: Story = {
  args: {
    defaultIndex: '',
    mode: 'horizontal'
  },
  render: (args) => (
    <Menu {...args}>
      <MenuItem>首页</MenuItem>
      <MenuItem>产品列表</MenuItem>
      <MenuItem disabled>已售罄商品</MenuItem>
      <SubMenu title='dropdown'> 
        <MenuItem>dropdown1</MenuItem>
        <MenuItem>dropdown2</MenuItem>
        <MenuItem>dropdown3</MenuItem>
      </SubMenu>
      <MenuItem>购物车</MenuItem>
    </Menu>
  ),
}

export const Vertical: Story = {
  args: {
    defaultIndex: '',
    mode: 'vertical'
  },
  render: (args) => (
    <Menu {...args}>
      <MenuItem>首页</MenuItem>
      <MenuItem>产品列表</MenuItem>
      <MenuItem disabled>已售罄商品</MenuItem>
      <SubMenu title='dropdown'> 
        <MenuItem>dropdown1</MenuItem>
        <MenuItem>dropdown2</MenuItem>
        <MenuItem>dropdown3</MenuItem>
      </SubMenu>
      <MenuItem>购物车</MenuItem>
    </Menu>
  ),
  argTypes: {
    defaultIndex: { control: 'text' } // 修正为文本输入控件
  },
  // 仅为Vertical故事配置背景颜色
  parameters: {
     backgrounds: {
      options: {
        red: { name: 'Red', value: '#f00' },
        green: { name: 'Green', value: '#0f0' },
        blue: { name: 'Blue', value: '#00f' },
      },
    },
  }
}
