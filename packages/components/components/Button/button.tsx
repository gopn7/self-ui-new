import React from 'react';
import classNames from 'classnames';

// export enum ButtonSize{
//   Large = "lg",
//   Small = "sm",
// }a

export type ButtonSize = "lg" | "sm"

export type ButtonType = "primary" | "default" | "danger" | "link"
// export enum ButtonType{
//   Primary = "primary",
//   Default = "default",
//   Danger = "danger",
//   Link = "link",
// }

 export interface BaseButtonProps{
  className?: string;
  disabled?: boolean;
  size?: ButtonSize;
  btnType?: ButtonType;  
  children?: React.ReactNode;
  href?: string;
}

//2
type NativeButtonProps =  BaseButtonProps& React.ButtonHTMLAttributes<HTMLButtonElement>
type AnchorButtonProps =  BaseButtonProps& React.AnchorHTMLAttributes<HTMLAnchorElement>
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>
//

// const Button:React.FC<ButtonProps>=(props)=>{
export const Button:React.FC<ButtonProps>=(props)=>{

  const {
    btnType="default",
    size,
    className,
    disabled =false,
    children,
    href,
    ...restProps
  } = props;

  const classes=classNames('btn',className,{
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    'disabled': (btnType === "link") && disabled,
    })
    
    if(btnType==="link"&&href){
      return(
        <a href={href} className={classes} {...restProps}>
          {children}
        </a>
      )
    }
      else{
        return(
          <button className={classes} disabled={disabled} {...restProps}>
            {children}
          </button> 
        )
      }
    }

export default Button