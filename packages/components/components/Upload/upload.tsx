// import axios from 'axios'
import React, { useRef ,useState,} from 'react'
import Dragger from './dragger'

import Button from '../Button/button' 
import UploadList from './uploadList'
import axios from 'axios'
import { AxiosProgressEvent } from 'axios';

export type UploadStatus='ready'|'uploading'|'success'|'error'
export interface UploadFile{
  uid:string
  size:number
  name:string
  status?:UploadStatus
  percent?:number
  raw?:File
  error?:any
  response?:any
}

export interface UploadProps{
  action:string
  defaultFileList?:UploadFile[]
  beforeUpload?:(file:File)=>Promise<File>|boolean
  onProgress?:(percentage:number,file:File)=>void
  onSuccess?:(data:string,file:File)=>void
  onError?:(error:any,file:File)=>void
  onChange?:(file:File)=>void
  onRemove?:(file:UploadFile)=>void
  headers?:{[key:string]:any}
  name?:string
  data?:{[key:string]:any}
  withCredentials?:boolean
  accept?:string
  multiple?:boolean
  children?:React.ReactNode
  drag?:boolean
}

export const Upload:React.FC<UploadProps>=(props)=>{
  const {
    action,
    onProgress,
    onSuccess,
    onError,
    onChange,
    onRemove,
    beforeUpload,
    defaultFileList=[],
    headers,
    name='file',
    data,
    withCredentials,
    accept,
    multiple,
    children,
    drag
  }=props
  const fileInput=useRef<HTMLInputElement>(null)
  const [fileList,setFileList]=useState<UploadFile[]>(defaultFileList||[])
    
    // const updateFileList=(updateFile:UploadFile,updateObj:Partial<UploadFile>)=>{
    //   setFileList((prevList)=>{
    //     return prevList.map(item=>item.uid===updateFile.uid? {...item,...updateObj}:item)
    //   })
    // }
  const handleRemove = (file: UploadFile) => {
    setFileList((prevList) => {
      return prevList.filter(item => item.uid !== file.uid)
    })
    if (onRemove) {
      onRemove(file)
    }
  }
    
   const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
    setFileList(prevList => {
      return prevList.map(file => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateObj }
        } else {
          return file
        }
      })
    })
  }

    const handleClick=()=>{
      if(fileInput.current){
        fileInput.current.click()
      }
    }
    const handleFileChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
      const files=e.target.files
      if(!files){
        return
      }
       uploadFile(files)
       if(fileInput.current){
        fileInput.current.value=''
       }
      }
     
      const uploadFile=(files:FileList)=>{
      let postFiles=Array.from(files)
      postFiles.forEach((file)=>{
        if(!beforeUpload){
          post(file)
        }else{
           const result=beforeUpload(file)
           if(result&&result instanceof Promise){
               result.then(processFile=>{post(processFile)})
           }else if(result!==false){
            post(file)
           }
        }
      })
    } 

   const post=(file:File)=>{
     let _file:UploadFile={
          uid:Date.now()+'upload-file',
          size:file.size,
          name:file.name,
          status:'ready',
          percent:0,
          raw:file,
        }
    //  setFileList( [_file, ...fileList])
        setFileList(prevList => {
      return [_file, ...prevList]
    })
        const formdata=new FormData()
        // formdata.append(file.name,file)
        formdata.append(name||'file',file)  
        if(data){
          Object.keys(data).forEach(key=>{
            formdata.append(key,data[key])
          })
        }
        axios.post(action,formdata,{
          headers:{
            ...headers,
            'Content-Type': 'multipart/form-data'
          },
          withCredentials,
          onUploadProgress:(e:AxiosProgressEvent)=>{
            const percentage=Math.round((e.loaded*100)/(e.total||1))||0
            if(percentage<100){   
                console.log(percentage)
                updateFileList(_file,{percent:percentage,status:'uploading'})
              if(onProgress){ 
                onProgress(percentage,file)
              }
            }
        }
        }).then(res=>{
          console.log(res)
          updateFileList(_file,{status:'success',response:res.data})
          if(onSuccess){
            onSuccess(res.data,file)
          }
        }).catch(err=>{
          console.log(err)
          updateFileList(_file,{status:'error',error:err})
          if(onError){
            onError(err,file)
          }
          if(onChange){
            onChange(file)
          }
        })
    }
     console.log(fileList)
    return (
      <div 
      className="viking-upload-component"
      >
        {/* <Button 
        btnType='primary' 
        onClick={handleClick}>Upload File</Button> */}
     <div className="viking-upload-input"
       
        onClick={handleClick}>
          {drag ? 
            <Dragger onFile={(files) => {uploadFile(files)}}>
              {children}
            </Dragger>:
            children
          }

        <input 
          title='file'
          className='viking-file-input'
       
          ref={fileInput}
          type='file' 
          onChange={handleFileChange}
          accept={accept}
          multiple={multiple}
          />
         </div>
        <UploadList
          fileList={fileList}
          onRemove={handleRemove}
        />
      </div>
    )
 }
 export default Upload