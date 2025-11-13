import { Meta } from '@storybook/react-vite';
import { StoryObj } from '@storybook/react-vite';


import { fn } from 'storybook/test';
import React, { use, useState } from 'react';

import Input from './input';
import '../../styles/index.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
// import { Transition } from 'react-transition-group';
import type { Preview } from '@storybook/react-vite';
import Icon from '../Icon/icon';
library.add(fas);



const meta = {
  title: 'Components/Input',
  component:Input,
  tags: ['autodocs'],
  // parameters:{
  //   controls:{
  //     matchers:{
  //       date:/mode$/
  //     }
  //   }
  // }
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>

const ControlledInput=()=>{
  const [value,setValue]=useState('')
   return  <Input value={value} defaultValue={value} onChange={(e)=>{setValue(e.target.value)}}></Input>
}

export const ADefualt: Story = {
  args: {
    placeholder: 'input',
    onChange:fn()
  },
   render: (args) => (
      <>
    <ControlledInput/>
  </>
  ),
}

export const BDisabled: Story = {
  args: {
    placeholder: 'disabled input',
    disabled: true
  },
}

export const CIcon: Story = {
  args: {
    placeholder: 'input with icon',
    icon: 'search'
  },
}

export const DSizeInput: Story = {
  render: (args) => (
      <>
    <Input
      defaultValue="large size"
      size="lg"
    />
    <Input
      placeholder="small size"
      size="sm"
    />
  </>
  ),
}

export const EPandInput: Story = {
  render: (args) => (
     <>
    <Input
      defaultValue="prepend text"
      prepend="https://"
    />
    <Input
      defaultValue="google"
      append=".com"
    />
    
  </>
  ),
}
