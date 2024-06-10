import React, { useEffect, useState } from 'react'
import '../common.css'
import '../commonlabel.css'
import './UserInput.css'
import twitterlogo from '../images/twitter-logo.jpg'
import axios from 'axios'
import './loader.css'
import Catagory from '../components/Catagory'
const UserInterests = () => {
    const [catagories,setCatagories]=useState([])
    useEffect(()=>{
        axios.get("http://localhost:3001/user/getcatagories")
        .then(res=>{
            setCatagories(res.data.catagories)
            // setCatagories(prev=>[...prev,...res.data.catagories])
        }).catch(error=>{
            alert("please refresh the page again")
        })
    },[])

    const [tags,setTags]=useState([])
    function addTag(tag){
        setTags(prev=>[...prev,tag])
        console.log(tags)
    }
    function removeTag(tag){
        setTags(prev=>prev.filter( (item) => item._id!==tag._id ))
    }
  return (
    <div className='auth'>
        <div className='twit-mini-logo'>
                <img src={twitterlogo}/>
        </div>
      <label className='font-medium' style={{fontWeight:"600"}}>What do you want to see on X?</label>
      <label className='auth-label' style={{fontSize:"13px",height:"25px",color:"rgba(143, 143, 143, 0.704)",textAlign:"start"}}>
        Select atleast one interest to personalize your X experience. They will be visible on your profile.</label>
        {(catagories.length>0)?<div className='catagory-container'>
            {
                catagories.map((catagory,i)=>{
                    return <Catagory tag={catagory} onSelect={addTag} onDeselect={removeTag}/>
                })
            }
        </div>:
        <span className='loader'></span>
        }
        {tags.length==0?<label style={{position:"absolute",left:"50px",bottom:"50px",color:"grey"}}>{tags.length} of 1 selected</label>
        :<label style={{position:"absolute",left:"50px",bottom:"50px",color:"grey"}}>great work🎉</label>}
        {(tags.length==0)?<button className='nxt-btn' style={{width:"20%",right:"50px"}} disabled>Next</button>:
        <button className='nxt-btn' style={{width:"20%",right:"50px",backgroundColor:"white"}}
        onClick={()=>{
            const user_id=localStorage.getItem("user_id")
            if(user_id){

            }else{
                axios.post("http://localhost:3001/user/getDataFromUserToken",{token:localStorage.getItem("user_token")})
                .then(res=>{
                    localStorage.setItem("user_id",res.data.user_data._id)
                    axios.post("http://localhost:3001/user/interests",{user_id:user_id,interests:tags})
                    .then(res=>{
                        
                    }).catch(error=>{
                        alert("please select interests again")
                    })
                })
            }
        }}>Next</button>}

    </div>
  )
}

export default UserInterests
