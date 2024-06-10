import mongoose from "mongoose";

const FollowSchema=mongoose.Schema({
    user_id:{
        type:String,
        required:true
    },
    following:[
        {
            type:String
        }
    ],
    followers:[
        {
            type:String
        }
    ]
})
const Follows=mongoose.model("follows",FollowSchema)
export {Follows}