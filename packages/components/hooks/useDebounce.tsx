import React from "react";
import { useState, useEffect} from "react";

function useDebounce(value:any,delay=300){
  const [debouncevalue,setDebouncevalue]=useState(value)

  useEffect(()=>{
    const handler=window.setTimeout(()=>{
      setDebouncevalue(value)
    },delay)
    return ()=>{window.clearTimeout(handler)} 
  },[value,delay])
  return debouncevalue
}
export default useDebounce
