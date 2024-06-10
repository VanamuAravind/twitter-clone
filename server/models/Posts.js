import mongoose from "mongoose";

const postsSchema=mongoose.Schema({
    user_id:{
        type:String,
        required:true
    },
    posts:[
        {
            title:{
                type:String,
                required:true
            },
            description:{
                type:String,
                default:""
            },
            time:{
                type:Date,
                default:Date.now()
            },
            tags:[
                {
                    type:String
                }
            ],
            images:[
                {
                    type:String
                }
            ],
            comments:[
                {
                    commenter_id:{
                        type:String,
                        required:true
                    },
                    comment:{
                        type:String,
                        required:true
                    },
                    replies:[
                        {
                            replier_id:{
                                type:String,
                                required:true
                            },
                            reply:{
                                type:String
                            }
                        }
                    ]
                }
            ],
            likes:[
                {
                    type:String
                }
            ],
            bookmarks:{
                type:Number
            }
        }
    ]
})

const Posts=mongoose.model("posts",postsSchema)
export {Posts}