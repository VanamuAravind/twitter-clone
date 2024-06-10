import React, { useState } from 'react'
import './Catagory.css'
const Catagory = ({tag,onSelect,onDeselect}) => {
    const [selected,setSelected]=useState(false)
  return (
    <div className={(!selected)?"single-tag-container":'single-tag-after-select'}  onClick={()=>{
        setSelected(!selected)
        if(!selected){
            onSelect(tag)
        }
        else{
            onDeselect(tag)
        }
    }}>
        {selected && <div className='selected'>
            <i class="fa-solid fa-check"></i>
        </div>}
      <label>{tag.tag}</label>
    </div>
  )
}
var tagbeforeselected={
    backgroundColor:"black",
    border:"2px solid grey"
}
var tagstyleafterselected={
    backgroundColor:"blue",
    border:"2px solid blue"
}
export default Catagory
