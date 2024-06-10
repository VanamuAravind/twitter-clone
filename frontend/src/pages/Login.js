import React, { useState } from 'react'
import './Login.css'
import logo from '../images/twitter-logo.jpg'
import '../common.css'
import '../commonlabel.css'
import googlelogo from '../images/google-logo.png'
import applelogo from '../images/apple-logo.png'
import UserInput from './UserInput'
const Login = () => {
    const [auth,setAuth]=useState("")
    const [vis,setVis]=useState(false)
    function changeVis(){
        setVis(!vis)
    }
  return (
    <div className='login-main-contianer flex jus-center align-center w-100'>
      <div className='login-left flex jus-center align-center w-50 overflow-hidden'>
        <img src={logo} alt='no image' className='img-width-100'/>
      </div>
      <div className='login-right w-50 flex flex-column align-start jus-center height-100 pl-mid gap-10'>
        <label className='font-large '>Happening now</label>
        <label className='font-medium ' style={{marginTop:"20px"}}>join today.</label>
        <div className='vis-third-party' style={{marginTop:"20px"}}>
            <div>
                <img src={googlelogo} className='img-width-100'/>
            </div>
            <label className='label-grey font-small'>Sign up with google</label>
        </div>
        <div className='vis-third-party'>
            <div>
                <img src={applelogo} className='img-width-100'/>
            </div>
            <label className='label-black font-small'>Sign up with Apple</label>
        </div>
        <div className='divider flex align-center jus-center'>
            <label className='font-small' style={{fontWeight:"400"}}>or</label>
        </div>
        <button className='create-account' onClick={()=>{
            setAuth("create")
            setVis(true)
        }}>Create account</button>
        <div className='disclaimer'>
            <label>By signing up, you aggree to the </label>
            <a>Terms of Service</a>
            <label> and </label>
            <a>Privacy Policy</a>
            <label>, including </label>
            <a>Cookie Use.</a>
        </div>

        <label className='font-small' style={{marginTop:"20px"}}>Already have an account?</label>
        <button className='signin-btn' onClick={()=>{
            setAuth("login")
            setVis(true)
        }}>Sign in</button>
        {vis && <UserInput auth={auth} vis={vis} changeVis={changeVis}/>}
      </div>
    </div>
  )
}

export default Login
