import React,{useContext} from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';

export interface MenuItemProps {
  className?: string;
  disabled?: boolean;
  index?:string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const MenuItem:React.FC<MenuItemProps>=(props)=>{
  const {
    className,
    disabled = false,
    index,
    style,
    children, 
  } = props;
//2
const context=useContext(MenuContext)
const handleClick=()=>{
  if(context.onSelect&&!disabled&&typeof(index)==='string'){
    context.onSelect(index)
  }
}

    const classes=classNames('menu-item',className,{
      'is-disabled': disabled,
      'is-active': context.index === index,
    })

    return(
      <li className={classes} style={style} onClick={handleClick}>
        {children}
      </li>
    )
  

}
//3
MenuItem.displayName='MenuItem'
export default MenuItem