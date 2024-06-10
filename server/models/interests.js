import mongoose from "mongoose";

const interestSchema=mongoose.Schema({
    user_id:{
        type:String,
        required:true
    },
    interests:[
        {
            type:String
        }
    ]
})

const Interests=mongoose.model("interests",interestSchema)
export {Interests}