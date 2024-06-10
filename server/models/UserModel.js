import mongoose from "mongoose";
const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    dob:{
        type:String,
        requried:true
    },
    password:{
        type:String,
        required:true
    }
})

const User=mongoose.model('users',userSchema)
export {User}