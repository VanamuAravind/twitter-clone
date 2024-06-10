import React, { useEffect, useState } from 'react'
import '../common.css'
import '../commonlabel.css'
import './UserInput.css'
import twitterlogo from '../images/twitter-logo.jpg'
import CustomDropDown from '../components/CustomDropDown'
import axios from 'axios'
import UserInterests from './UserInterests'
const UserInput = ({auth,vis,changeVis}) => {
    const [year,setYear]=useState("")
    const [month,setMonth]=useState("")
    const [day,setDay]=useState("")
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")

    const [atuser,setAtuser]=useState(false)
    const [gotointerst,setgotointerest]=useState(false)


    const [years,setYears]=useState([])
    function fillYears(){
        for(let i=2024;i>=1904;i--){
            setYears(prev=>[...prev,i])
        }
    }
    const [days,setDays]=useState([])
    function fillDays(){
        for(let i=1;i<=31;i++){
            setDays(prev=>[...prev,i])
        }
    }
    const months=["January","February","March","April","May","June","July","August","September","October","November","December"]
    useEffect(()=>{
        fillDays()
        fillYears()
    },[vis])
  return (
    <div className='userinput-main-container w-100 h-100 blur-medium flex align-center jus-center'>
      {(auth==="create")?
        (!gotointerst && !localStorage.getItem("user_token"))?
        <div className='auth create'>
            <i class="fa-solid fa-xmark close-btn" onClick={()=>{
                changeVis()
            }}></i>
            <div className='twit-mini-logo'>
                <img src={twitterlogo}/>
            </div>
            {!atuser && <label className='font-medium auth-label' style={{fontWeight:"600",marginTop:"0px"}}>Create your account</label>}
            {atuser && <label className='font-medium auth-label' style={{fontWeight:"600",marginTop:"0px",height:"20px"}}>What should we call you?</label>}
            {!atuser && <input type='text' placeholder='Name' className='input-field' onChange={(e)=>{
                setName(e.target.value)
                // check()
            }}/>}
            {!atuser && <input type='text' placeholder='email' className='input-field' onChange={(e)=>{
                setEmail(e.target.value)
                // check()
            }}/>}
            {!atuser && <input type='text' placeholder='password' className='input-field' onChange={(e)=>{
                setPassword(e.target.value)
                // check()
            }}/>}

            {!atuser && <label className='auth-label' style={{marginTop:"10px",height:"10px",fontWeight:"600"}}>Date of birth</label>}
            {!atuser && <label className='auth-label' style={{fontSize:"12px",height:"25px",color:"rgba(143, 143, 143, 0.704)",marginTop:"0px"}}>This will not be shown publicly. Confirm your own age, even if this account is for a business, a pet, or something else.</label>}
            {atuser && <label className='auth-label' style={{fontSize:"13px",height:"25px",color:"rgba(143, 143, 143, 0.704)",marginTop:"0px"}}>your @username is unique. You can always change it later.</label>}
            {atuser && <div className='username-field'>
                <input type='text' placeholder='username' className='input-field' onChange={(e)=>{
                    setUsername(e.target.value)
                }}/>
                <label>@</label>
            </div>}
            {!atuser && <div className='flex align-center jus-between w-100' style={{width:"95%"}}>
                <CustomDropDown changeValue={setMonth} values={months} label="Month" width="45%" height="40px"/>
                <CustomDropDown changeValue={setDay} values={days} label="Day" width="20%" height="40px"/>
                <CustomDropDown changeValue={setYear} values={years} label="Year" width="100px" height="40px"/>
            </div>}
            {
                (name!=="" && email!=="" && year!="" && month!="" && day!="" && password!="")?
                <button className='nxt-btn cp' style={{backgroundColor:"white"}}
                onClick={()=>{
                    if(!atuser){
                        axios.post("http://localhost:3001/user/searchEmail",{email:email})
                        .then(res=>{
                            if(res.status===200){
                                alert("user with email already exists")
                            }
                            else{
                                setAtuser(true)
                            }
                        })
                        .catch(error=>{
                            alert("internal server error")
                        })
                    }
                    else{
                        if(username){
                            axios.post("http://localhost:3001/user/register",{
                                name:name,
                                username:username,
                                email:email,
                                dob:month+"-"+day+"-"+year,
                                password:password
                            })
                            .then(res=>{
                                if(res.status===200){
                                    const token=res.data.token
                                    console.log(token)
                                    localStorage.setItem("user_token",token)
                                    setgotointerest(true)
                                }
                                else if(res.status===201){
                                    alert("nani")
                                }
                            })
                            .catch(error=>{
                                console.log(error)
                            })
                        }
                    }
                }}>Next</button>:
                <button className='nxt-btn' disabled>Next</button>
            }
        </div>:
        <div>
            <UserInterests/>
        </div>
        :
        <div className='auth login'>
            <i class="fa-solid fa-xmark close-btn" onClick={()=>{
                changeVis()
            }}></i>
        </div>
        }
    </div>
  )
}

export default UserInput
