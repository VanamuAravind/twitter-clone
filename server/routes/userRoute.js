import express from 'express'
import mongoose from 'mongoose'
import { User } from '../models/UserModel.js'
import { Interests } from '../models/interests.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Follows } from '../models/Follow.js'
import { Tags } from '../models/Tags.js'
const userRouter=express.Router()

userRouter.post("/user/register",async(req,res)=>{
    const {name,username,email,dob,password} = req.body
    try {
        const prevuser=await User.findOne({email:email})
        if(!prevuser){
            const hashedPassword=await bcrypt.hash(password,10)
            const user = await new User({name,userName:username,email,dob,password:hashedPassword})
            user.save()
            const token=jwt.sign({...user._doc,password:"********"},"secret_key")
            res.status(200).json({message:"user created successfully",token:token})
        }
        else{
            res.status(201).json({message:"user already exists with this email."})
        }
    } catch (error) {
        res.json({message:"internal server error"})
    }
})

userRouter.post("/user/login",async(req,res)=>{
    const {email,password}=req.body
    try {
        const user=await User.findOne({email:email})
        if(user){
            if(await bcrypt.compare(password,user.password)){
                // console.log({...user._doc,password:"********"})
                const token=jwt.sign({...user._doc,password:"********"},"secret_key")
                res.json({
                    message:"user logged in",
                token:token})
            }
            else{
                res.json({message:"incorrect credentials"})
            }
        }
        else{
            res.json({message:"incorrect credentials"})
        }
    } catch (error) {
        res.json({message:"internal server error"})
    }
})

userRouter.post("/user/searchEmail",async(req,res)=>{
    const {email}=req.body
    try {
        const user=await User.findOne({email:email})
        if(user){
            res.status(200).json({message:"user exists"})
        }
        else{
            res.status(201).json({message:"user doesn't exists"})
        }
    } catch (error) {
        res.json({message:"internal server error"})
    }
})


userRouter.post("/user/interests",async (req,res)=>{
    const {user_id,interests}=req.body
    try{
        const interest=await new Interests({user_id,interests})
        interest.save()
        res.json({message:"interests saved successfuly."})
    }
    catch(error){
        res.json({message:"internal server error."})
    }
})

userRouter.post("/user/addFollowings",async (req,res)=>{
    const {user_id,following}=req.body
    try {
        const user=await Follows.findOne({user_id:user_id})
        if(user){
            user.following=[...user.following,...following]
            await user.save()
        }
        else{
            const newuser=await new Follows({
                user_id:user_id,
                following:following
            })
            await newuser.save()
        }
        res.json({message:"started following"})
    } catch (error) {
        res.json({message:"internal server error"})
    }
})

userRouter.post("/user/getDataFromUserToken",async(req,res)=>{
    const {token}=req.body
    const userDataFromToken=jwt.verify(token,"secret_key")
    res.json({user_data:userDataFromToken})
})


userRouter.get("/user/getcatagories",async(req,res)=>{
    try {
        const tags=await Tags.find()
        const catagories=[]
        for(let tag of tags){
            catagories.push({_id:tag._id,tag:tag.tag})
        }
        setTimeout(()=>{
            res.status(200).json({catagories:catagories})
        },3000)
    } catch (error) {
        res.json({message:"internal server error"})
    }
})

export {userRouter}