
import React from 'react'
import { AutoComplete,DataSourceType } from './autoComplete'

import { Meta } from '@storybook/react-vite';
import { StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import type { Preview } from '@storybook/react-vite';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import '../../styles/index.scss';

// 在Storybook全局范围内初始化Font Awesome图标库
library.add(fas);

interface LakerPlayerProps {
  value: string;
  number: number;
}

interface GithubUserProps {
  login: string;
  url: string;
  avatar_url: string;
}

const meta = {
  title:'Components/AutoComplete',
  component:AutoComplete,
   args: {
    onSelect: fn()
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AutoComplete>;

export default meta;
type Story = StoryObj<typeof meta>;



const lakers = ['bradley', 'pope', 'caruso', 'cook', 'cousins', 'james', 'AD', 'green', 'howard', 'kuzma', 'McGee', 'rando'];
 
  const handleFetch = (query: string) => {
  return lakers.filter(name => name.includes(query)).map(name=>({value:name}));
};
  const renderOption = (item: DataSourceType) => {
    const items = item as DataSourceType<string>
    return (
      <>
        <b>{items.value}</b>
      </>
    )
  }
// export const AsimpleComplete: Story = {
//   render: (args) => (
//     <AutoComplete
//        {...args}
//        fetchSuggesition={handleFetch}
//        renderOption={renderOption}  
//     />
//   )
// };
export const AsimpleComplete: Story = {
  args: {
    fetchSuggesition: handleFetch,
    renderOption: renderOption,
    // 这里可以添加其他需要的属性，比如 onSelect 等（如果有）
  },
  render: (args) => (
    <AutoComplete {...args} />
  ),
};

// const renderOption=(item:DataSourceType<LakerPlayerProps>)=>{
//   return (
//     <>   
//        <h2>Name:{item.value}</h2>
//       <span>Number:{item.number}</span>
//     </>
 
//   )
// } 


const lakersWithNumber = [
    {value: 'bradley', number: 11},
    {value: 'pope', number: 1},
    {value: 'caruso', number: 4},
    {value: 'cook', number: 2},
    {value: 'cousins', number: 15},
    {value: 'james', number: 23},
    {value: 'AD', number: 3},
    {value: 'green', number: 14},
    {value: 'howard', number: 39},
    {value: 'kuzma', number: 0},
  ] 
const handleFetch2 = (query: string) => {
    return lakersWithNumber.filter(player => player.value.includes(query))
  }
  const renderOption2 = (item: DataSourceType) => {
    const itemWithNumber = item as DataSourceType<LakerPlayerProps>
    return (
      <>
        <b>{itemWithNumber.value}</b>
        <span>号码: {itemWithNumber.number}</span>
      </>
    )
  }

export const BsimpleComplete: Story = {
args: {
    fetchSuggesition: handleFetch2,
    renderOption: renderOption2,
    // 这里可以添加其他需要的属性，比如 onSelect 等（如果有）
  },
  render: (args) => (
    <AutoComplete {...args} />
  ),
};

  const handleFetch3 = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then(res => res.json())
      .then(({ items }) => {
        return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item}))
      })
  }

  const renderOption3 = (item: DataSourceType) => {
    const itemWithGithub = item as DataSourceType<GithubUserProps>
    return (
      <>
        <h2>Name: {itemWithGithub.login}</h2>
        <p>url: {itemWithGithub.url}</p>
      </>
    )
  }

export const CajaxComplete: Story = {
args: {
    fetchSuggesition: handleFetch3,
    renderOption: renderOption3,
    // 这里可以添加其他需要的属性，比如 onSelect 等（如果有）
  },
  render: (args) => (
    <AutoComplete {...args} />
  ),
};

     