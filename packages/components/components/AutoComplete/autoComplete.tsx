import React,{useState,FC,ChangeEvent,ReactElement, useEffect,KeyboardEvent,useRef,RefObject} from 'react';
import classNames from 'classnames';
import Input, { InputProps } from '../Input/input';
import Icon from '../Icon/icon';
import {FontAwesomeIcon,FontAwesomeIconProps} from '@fortawesome/react-fontawesome';
import useDebounce from '../../hooks/useDebounce';
import useClickOutside from '../../hooks/useClickOutside';


interface DataSourceObject{
  value:string
}
export type DataSourceType<T = {} > =  T & DataSourceObject

export interface AutoCompleteProps extends Omit<InputProps,'onSelect'>{
   fetchSuggesition:(str:string)=>DataSourceType[]|Promise<DataSourceType[]>
   onSelect?:(item:DataSourceType)=>void 
   renderOption?:(item:DataSourceType)=>ReactElement
}  

export const AutoComplete:FC<AutoCompleteProps>=(props)=>{
  const {
    fetchSuggesition,
    onSelect,
    value,
    renderOption,
    ...restProps
  }=props

  const [inputValue,setInputValue]=useState(value as string)
  const [suggesitions,setSuggesitions]=useState<DataSourceType[]>([])

  const [loading,setLoading]=useState(false)
  const [highlightIndex,setHighlightIndex]=useState(-1)
  const debounceValue=useDebounce(inputValue)

  const triggerRef=useRef(false)

  const componentRef=useRef<HTMLDivElement>(null)

  useClickOutside(componentRef as RefObject<HTMLDivElement>,()=>{
    setSuggesitions([])
  })

  useEffect(()=>{
    if(debounceValue && triggerRef.current){
       const result=fetchSuggesition(debounceValue)
       if(result instanceof Promise){
        console.log('trigger')
        setLoading(true)
        console.log(loading)
        result.then(res=>{
          setSuggesitions(res)
          setSuggesitions(res)})
        result.finally(()=>setLoading(false))
        console.log(loading)
       }else{
        setSuggesitions(result)
       }
    }else{
      setSuggesitions([])
    }
    setHighlightIndex(-1)
  },[debounceValue])

  // useEffect(()=>{
  //   if(inputValue){
  //      const result=fetchSuggesition(inputValue)
  //      if(result instanceof Promise){
  //       console.log('promise')
  //       setLoading(true)
  //       console.log(loading)
  //       result.then(res=>setSuggesitions(res))
  //       result.finally(()=>setLoading(false))
  //       console.log(loading)
  //      }else{
  //       setSuggesitions(result)
  //      }
  //   }else{
  //     setSuggesitions([])
  //   }
  // },[inputValue])

  console.log(suggesitions)
  const handleChange=(e:ChangeEvent<HTMLInputElement>)=>{
    const value=e.target.value.trim()
    setInputValue(value)
    triggerRef.current=true
    // if(value){
    //    const result=fetchSuggesition(value)
    //    if(result instanceof Promise){
    //     console.log('promise')
    //     setLoading(true)
    //     console.log(loading)
    //     result.then(res=>setSuggesitions(res))
    //     result.finally(()=>setLoading(false))
    //     console.log(loading)
    //    }else{
    //     setSuggesitions(result)
    //    }
    // }else{
    //   setSuggesitions([])
    // }
  }

  const hightlight=(index:number)=>{
    if(index<0) index=0
    if(index>=suggesitions.length) {index=suggesitions.length-1}
    setHighlightIndex(index)
  }
  const handleKeyDown=(e:KeyboardEvent<HTMLInputElement>)=>{
    switch(e.keyCode){
      case 13:
        if(suggesitions[highlightIndex]){
          handleSelect(suggesitions[highlightIndex])
        }
        break
      case 38:
        hightlight(highlightIndex-1)
        break
      case 40:
        hightlight(highlightIndex+1)
        break
      case 27:
        setSuggesitions([])
        break
      default:
        break
    }
  }

  const handleSelect=(item:DataSourceType)=>{
     setInputValue(item.value)
     setSuggesitions([])
     if(onSelect){
      onSelect(item)
     }
     triggerRef.current=false
  }

  const renderTemplate=(item:DataSourceType)=>{
    return renderOption?renderOption(item):item.value
  }

  const generateDropdown=()=>{
    return (
      <ul className="viking-suggestion-list">
        {suggesitions.map((item,index)=>{
          const hightnames=classNames('suggestion-item',{
            'is-active':index===highlightIndex
          })
          return (
            <li key={index} onClick={()=>handleSelect(item)} className={hightnames}>{renderTemplate(item)}</li>
          )
        })}
      </ul>
    )
  }
  
  return (
    <div className="viking-auto-complete" ref={componentRef}>
      <Input
      value={inputValue}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      {...restProps}
      />
      {loading&&<div className="suggstions-loading-icon"><Icon icon="spinner" spin theme="primary" /></div>}
      {(suggesitions.length>0)&&generateDropdown()}
    </div>
  )
}

export default AutoComplete;

