import { Meta } from '@storybook/react-vite';
import { StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';
import React from 'react';
import Upload from './upload';

import '../../styles/index.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
// import { Transition } from 'react-transition-group';
import type { Preview } from '@storybook/react-vite';
import UploadList from './uploadList';
import { UploadFile } from './upload';
import Icon from '../Icon/icon';

library.add(fas)



const meta = {
  title: 'Components/Upload',
  component: Upload,
  tags: ['autodocs'],
  args: {
    // action: '',
    // onProgress:fn(),
    // onSuccess:fn(),
    // onError:fn(), 
    // onChange:fn(),
    // onChange:fn(),
    // beforeUpload:checkFileSize,
  },
  // parameters:{
  //   controls:{
  //     matchers:{
  //       date:/mode$/
  //     }
  //   }
  // }
} satisfies Meta<typeof Upload>;

export default meta;
type Story = StoryObj<typeof meta>


export const AsimpleUpload: Story = {
  args: {
    action: 'https://jsonplaceholder.typicode.com/posts',
    onChange:fn(),
    onRemove:fn(),
  },
  render:(args) => (
    <Upload
       {...args}
       name='filename'
       data={{
        username:'james',
        password:'123456',
      }}
      headers={{
        'Authorization': 'Bearer token',
      }}
      accept='.jpg'
      multiple={true}
    />
  ),
}


const checkFileSize=(file:File)=>{
  if(Math.floor(file.size/1024)>50){
   alert('文件大小不能超过50MB')
   return false
  }
  return true
}

const filePromise = (file:File)=> {
  const newFile = new File([file], 'hello.txt', {
    type: file.type,
  })
  return Promise.resolve(newFile)
}

const defaultFileList:UploadFile[]=[
  {
    uid: '1',
    name: 'file1.txt',
    status: 'success',
    size: 1024,
    percent: 100,
  },
  {
    uid: '2',
    name: 'file2.txt',
    status: 'error',
    size: 2048,
    percent: 0,
  },
    {
    uid: '3',
    name: 'file3.txt',
    status: 'uploading',
    size: 2048,
    percent: 50,
  },
]

export const UploadStory: Story = {
  args: {
    action: 'https://jsonplaceholder.typicode.com/posts',
    onChange:fn(),
  },
  render:(args) => (
    <Upload
       {...args}
       defaultFileList={defaultFileList}

    />
  ),
}

export const CdragUpload: Story = {
  args: {
    action: 'https://jsonplaceholder.typicode.com/posts',
    onChange:fn(),
    onRemove:fn(),
  },
  render:(args) => (
    <Upload
       {...args}
        name="fileName"
        multiple
        drag={true}
    >
      <Icon icon="upload" size="5x" theme="secondary" />
    <br/>
    <p>点击或者拖动到此区域进行上传</p>
  </Upload>

  ),
}