import React,{createContext,useState} from "react";
import classNames from "classnames";
import { MenuItemProps } from "./menuItem";
import { render } from "@testing-library/react";
type MenuMode = 'horizontal' | 'vertical'
//2 
type SelectCallback = (selectedIndex: string) => void
export interface MenuProps {
    defaultIndex?:string
    className?: string
    mode?: MenuMode
    style?: React.CSSProperties
    onSelect?: SelectCallback
    children?: React.ReactNode
    defaultOpenSubMenus?:string[]
}

//2
 interface IMenuContext {
  index:string
  onSelect?: SelectCallback
  mode?:MenuMode,
  defaultOpenSubMenus?:string[]
}

 export const MenuContext=createContext<IMenuContext>({index:'0',})

//

const Menu:React.FC<MenuProps>=(props)=>{

  const {
    defaultIndex='0',
    className,
    mode = 'horizontal',
    style,
    children,
    onSelect,
    defaultOpenSubMenus=[]
  } = props;
  //2
  const [currentActive,setActive]=useState(defaultIndex)

    const handleClick=(index:string)=>{
    setActive(index)
    if(onSelect){
      onSelect(index)
    }
   }
  const passedContext:IMenuContext={
    index:currentActive?currentActive:'0',
    onSelect:handleClick,
    mode,
    defaultOpenSubMenus:['3']
  }


//
    const classes=classNames('viking-menu',className,{
       'menu-vertical': mode === 'vertical',
       'menu-horizontal': mode !== 'vertical',
    })
//3
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type
      if (displayName === 'MenuItem'||displayName === 'SubMenu' ) {
        return React.cloneElement(childElement, {
          index:index.toString()
        })
      } else {
        console.error("Warning: Menu has a child which is not a MenuItem component")
      }
    })
  }
// const renderChildren = () => {
//   return React.Children.map(children, (child, index) => {
//     // 替换为更通用的 React.ReactElement 类型断言
//     const childElement = child as React.ReactElement<MenuItemProps>;
//     // const { displayName } = childElement.type;
//     const componentType = childElement.type as (React.ComponentType<MenuItemProps> & { displayName?: string });
//     const { displayName } = componentType;
//     if (displayName === 'MenuItem') {
//       return child;
//     } else {
//       // 修正拼写错误，提升错误提示可读性
//       console.error('warning: Menu has a child which is not a MenuItem component');
//     }
//   });
// };
    return(
      <ul className={classes} style={style} data-testid="test-menu">
        <MenuContext.Provider value={passedContext}>
         {renderChildren()}
        </MenuContext.Provider>
      </ul>
    )
  
}

export default Menu