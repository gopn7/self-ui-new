import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Button,{ButtonProps,ButtonType,ButtonSize} from './button'
import { on } from 'events'
import '@testing-library/jest-dom'; // 引入后TypeScript即可识别扩展匹配器
const defaultProps = {
  onClick:jest.fn(),
}
const testProps :ButtonProps= {
  btnType:"primary",
  size:"lg",
  className:'custom-class',
}
const disabledProps = {
  onClick:jest.fn(),
  disabled:true,
}

describe('Button',()=>{
   it('should render the correct default button',()=>{
     const first = render(<Button {...defaultProps}>Hello</Button>)
     const f1=first.queryByText('Hello') as HTMLButtonElement
     expect(f1).toBeInTheDocument()
     expect(f1?.tagName).toEqual('BUTTON')
     expect(f1).toHaveClass('btn btn-default')
     if (f1) {
      fireEvent.click(f1)
    }
     expect(defaultProps.onClick).toHaveBeenCalled()
     expect(f1.disabled).toBeFalsy()
  })
   })
   it('should render the correct component based on different props',()=>{
     const second = render(<Button {...testProps}>Hello</Button>)
     const s1=second.queryByText('Hello')
     expect(s1).toBeInTheDocument()
     expect(s1).toHaveClass('btn btn-primary btn-lg custom-class')

   })
   it('should render a link button when btnType equals to Link and href is provided',()=>{
     const third = render(<Button btnType="link" href="https://www.baidu.com"> Link</Button>)
     const t1=third.queryByText('Link')
     expect(t1).toBeInTheDocument()
     expect(t1?.tagName).toEqual('A')
     expect(t1).toHaveClass('btn btn-link ')
   })
   it('should render a disabled ',()=>{
     const third = render(<Button {...disabledProps}> disabled</Button>)
     const t1=third.queryByText('disabled') as HTMLButtonElement
     expect(t1).toBeInTheDocument()
     expect(t1.disabled).toBeTruthy()
     fireEvent.click(t1)
     expect(disabledProps.onClick).not.toHaveBeenCalled()
   })

