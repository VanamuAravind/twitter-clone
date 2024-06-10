import mongoose from "mongoose";

const tagsSchema=mongoose.Schema({
    tag:{
        type:String,
        required:true
    },
    posts:[
        {
            user_id:{
                type:String,
                requried:true
            },
            post_id:{
                type:String,
                required:true
            }
        }
    ]
})
const Tags=mongoose.model("tags",tagsSchema)
export {Tags}