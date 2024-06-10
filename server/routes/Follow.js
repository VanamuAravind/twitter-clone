import express from 'express'
import { Tags } from '../models/Tags.js'
import { User } from '../models/UserModel.js'
const followRouter=express.Router()

followRouter.post("/follow/getRecommandation",async (req,res)=>{
    const {interests}=req.body
    let recommandations=[]
    let people=new Set()
    try{
        for(const interest of interests){
            const tag = await Tags.findOne({tag:interest})
            if(tag){
                // recommandations.push(...tag.posts)
                // console.log(tag)
                for(const user of tag.posts){
                    const person=await User.findOne({_id:user.user_id})
                    if(person && !people.has(person._id.toString())){
                        people.add(person._id.toString())
                        recommandations.push(person)
                    }
                }
            }
        }
        
        await res.json({recommandations:recommandations})
    }catch(error){
        res.json({message:"internal server error"})
    }
})


export {followRouter}