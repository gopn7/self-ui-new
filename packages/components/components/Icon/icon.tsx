import {FontAwesomeIcon,FontAwesomeIconProps} from '@fortawesome/react-fontawesome';
import React from 'react';
import classNames from 'classnames';
// import { createExternalModuleExport } from 'typescript';

export type ThemeProps='primary'|'secondary'|'success'|'danger'|'info'|'light'|'dark';

export interface IconProps extends FontAwesomeIconProps{
  theme?:ThemeProps;
}

export const Icon :React.FC<IconProps>=(props)=>{
  const {className,theme,spin,...restprops}=props
  const classes=classNames('viking-icon',className,{
    [`icon-${theme}`]:theme
})
return (
  <FontAwesomeIcon {...restprops} className={classes} spin={spin} />
)
}

export default Icon


