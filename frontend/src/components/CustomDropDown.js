import React, { useState } from 'react'
import './CustomDropDown.css'
const CustomDropDown = ({label,values,changeValue,width,height}) => {
    const [vis,setVis]=useState(false)
    const [value,setValue]=useState("")
  return (
    <div className='dropdown-main-container' onClick={()=>{
        setVis(!vis)
    }} style={{width:width,height:height}}>
        <label className='label'>{label}</label>
        <label className='dd-value'>{value}</label>
        <div className='down-arrow'>
            <i class="fa-solid fa-chevron-down " style={{rotate:(vis)?"-180deg":"0deg"}}></i>
        </div>
        {vis && <div className='values-container'>
            {
                values.map((item,i)=>{
                    return <div key={i} onClick={()=>{
                        setValue(item)
                        changeValue(item)
                    }}>
                        <label>{item}</label>
                    </div>
                })
            }
        </div>}
    </div>
  )
}

export default CustomDropDown
