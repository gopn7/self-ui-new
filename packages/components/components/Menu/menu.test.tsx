import React from "react";
import {render,fireEvent,RenderResult,cleanup,waitFor} from '@testing-library/react'
import '@testing-library/jest-dom'; // 引入后TypeScript即可识别扩展匹配器
import Menu, { MenuProps}from './menu'
import MenuItem from './menuItem'
import classNames from "classnames";
import SubMenu from "./subMenu";

const testProps:MenuProps={
  defaultIndex:'0',
  className:'test',
  onSelect:jest.fn(),
}

const testVerProps:MenuProps={
  defaultIndex:'0',
  mode:'vertical',
}

const generateMenu=(props:MenuProps)=>{
  return (
    <Menu {...props}>
      <MenuItem >Item 1</MenuItem>
      <MenuItem disabled >Item 2</MenuItem> 
      <MenuItem>Item 3</MenuItem>

       <SubMenu title='dropdown'>   
         <MenuItem>drop1</MenuItem >
        </SubMenu>
    </Menu>
  )
}
const createStyleFile=()=>{
  const cssFile:string=`
     .viking-submenu{
      display:none;
    }
    .viking-submenu.menu-opened{
      display:block;
    }
  `
  const style=document.createElement('style')
  style.type='text/css'
  style.innerHTML=cssFile
  return style
}


//删掉index
let wrapper:RenderResult,menuElement:HTMLElement,activeElement:HTMLElement,disabledElement:HTMLElement
describe('Viking menu',()=>{
  beforeEach(()=>{
    wrapper=render(generateMenu(testProps))
    //
    wrapper.container.append(createStyleFile())
    //
    menuElement=wrapper.getByTestId('test-menu')
    activeElement=wrapper.getByText('Item 1')
    disabledElement=wrapper.getByText('Item 2')
  })
  it('should render menu and menu item based on default props',()=>{
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('viking-menu test')
    // expect(menuElement.getElementsByTagName('li').length).toBe(3)
    expect(menuElement.querySelectorAll(':scope>li').length).toEqual(4)
    expect(activeElement).toHaveClass('menu-item is-active')
    expect(disabledElement).toHaveClass('menu-item is-disabled')
  })
  it('click menu item should call onSelect callback',()=>{
    const third=wrapper.getByText('Item 3')
    fireEvent.click(third)
    expect(third).toHaveClass('is-active')
    expect(activeElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).toHaveBeenCalledWith('2')
    
    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith('1')
  })
  it('should render vertical mode when mode is set to vertical',()=>{
    cleanup()
    const wrapper=render(generateMenu(testVerProps))
    const menuElement=wrapper.getByTestId('test-menu')
    expect(menuElement).toHaveClass('viking-menu  menu-vertical')
  })
   it('should show dropdown items when hover when hover on submenu',async()=>{
    // expect(wrapper.queryByText('drop1')).not.toBeVisible()
    const dropdownElement=wrapper.getByText('dropdown')
    fireEvent.mouseEnter(dropdownElement)
    await waitFor(()=>{expect(wrapper.queryByText('drop1')).toBeVisible()})
   })
    it('should show dropdown items when click on subMenu for vertical mode', () => {

    })
     it('should show subMenu dropdown when defaultOpenSubMenus contains SubMenu index', () => {
   
  })
})