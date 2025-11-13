import React,{useContext,FunctionComponentElement,useState,useRef,useEffect} from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";
import { MenuItemProps } from "./menuItem";
import Icon from '../Icon/icon';
import {CSSTransition}from 'react-transition-group'
import Transition from '../Transition/transition'
export interface SubMenuProps{
  index?:string
  title:string
  className?:string
  children?: React.ReactNode
}
const SubMenu:React.FC<SubMenuProps>=({index,title,children,className})=>{

  const context=useContext(MenuContext)

     //3
    const openedSubManus=context.defaultOpenSubMenus as Array<String>
    const isOpend=(index&&context.mode==='vertical')?openedSubManus.includes(index):false
     //

 //2
  const [menuOpen,setOpen]=useState(isOpend)
  //2

  const classes=classNames('menu-item submenu-item',className,{
    'is-active':context.index===index
    ,'is-opened':menuOpen
     ,'is-vertical':context.mode==='vertical'
  })
  //2
  const handleClick=(e:React.MouseEvent)=>{
    e.preventDefault()
    setOpen(!menuOpen)
  }

  let timer:any
  const handleMouse=(e:React.MouseEvent,toggle:boolean)=>{
    clearTimeout(timer)
    e.preventDefault()
    timer=setTimeout(() => {
      setOpen(toggle)
    }, 300);
  }

  const clickEvents=context.mode==='vertical'?{
    onClick:handleClick
  }:{}
  const hoverEvents=context.mode!=='vertical'?{
    onMouseEnter:(e:React.MouseEvent)=>{handleMouse(e,true)},
    onMouseLeave:(e:React.MouseEvent)=>{handleMouse(e,false)} 
  }:{}
  //

  const renderChildren=()=>{
   
    //2
    const subMenuClasses=classNames('viking-submenu',{
      'menu-opened':menuOpen
    })
    //
      const childrenComponent=React.Children.map(children,(child,i)=>{
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      if (childElement.type.displayName === 'MenuItem' ) {
        return React.cloneElement(childElement,{
          index:`${index}-${i}`
        })
      } else {
        console.error("Warning: SubMenu has a child which is not a MenuItem component")
      }
    })
    return(
      // <CSSTransition 
      //      nodeRef={nodeRef}
      //      in={menuOpen} 
      //      timeout={300} 
      //      classNames="zoom-in-top" 
      //      appear
      //      unmountOnExit>
      //   <ul className={subMenuClasses} ref={nodeRef} >
      //   {childrenComponent}
      // </ul>
      // </CSSTransition>
      <Transition
        in={menuOpen}
        // nodeRef={nodeRef}
        timeout={300}
        animation="zoom-in-top"
      >
        {/* ref={nodeRef} */}
        <ul className={subMenuClasses}  >
        {childrenComponent}
      </ul>
      </Transition>
    )
  }
  return(
    <li key={index} className={classes} {...hoverEvents} >
      <div className="submenu-title" {...clickEvents}>
        {title}
        <Icon icon='angle-down'  theme='primary' className="arrow-icon"/>
        </div>
        {renderChildren()}
    </li>
  )
}
SubMenu.displayName='SubMenu'
export default SubMenu
