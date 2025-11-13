
import React, { ReactNode, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'

type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-right'

// 使用交叉类型组合 CSSTransitionProps 和自定义属性
type TransitionProps = CSSTransitionProps & {
  animation?: AnimationName,
  children?: ReactNode
  wrapper?:boolean
}

// interface TransitionProps extends CSSTransitionProps {
//   animation?: AnimationName,
//   children?: ReactNode
// }


const Transition: React.FC<TransitionProps> = (props) => {
  const {
    children,
    classNames,
    animation,
    appear= true,
    onMountedExit,
     wrapper,
    ...restProps
  } = props
  const nodeRef=useRef(null)
  
  return (
    <CSSTransition
      classNames = { classNames ? classNames : animation}
      {...restProps}
      unmountOnExit
      nodeRef={nodeRef}
    >
      {/* <div ref={nodeRef}>{children}</div> */}
      {wrapper?<div ref={nodeRef}>{children}</div>:children}
    
    </CSSTransition>
  )
}


export default Transition