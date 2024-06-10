import express from 'express'
import { Posts } from '../models/Posts.js'
import { Tags } from '../models/Tags.js'
import { Follows } from '../models/Follow.js'

const postRouter=express.Router()

async function addPostToTags(tags,post_id,user_id){
    if(tags){
        tags.map(async (tag)=>{
            tag=tag.toLowerCase()
            try{
                const Tag=await Tags.findOne({tag:tag})
                if(Tag){
                    const newPost={user_id,post_id}
                    Tag.posts=[...Tag.posts,newPost]
                    await Tag.save()
                }
                else{
                    const newTag=await new Tags({tag:tag,posts:[
                        {user_id,post_id}
                    ]})
                    await newTag.save()
                }
                console.log("post has added to "+tag)
            }catch(error){
                console.log(`post has not saved for ${tag}`)
            }
        })
    }
}

postRouter.post("/post/addpost",async(req,res)=>{
    const {user_id,title,description,tags,images}=req.body
    try{
        const userPosts=await Posts.findOne({user_id:user_id})
        if(userPosts){
            const newPost={
                title,description,tags,images
            }
            const posts=[...userPosts.posts,newPost]
            userPosts.posts=posts,
            await userPosts.save()
            addPostToTags(tags,userPosts.posts[posts.length-1]._id,user_id)
        }
        else{
            console.log(req.body)
            const newPost=await new Posts({
                user_id:user_id,
                posts:[
                    {title,description,tags,images}
                ]
            })
            await newPost.save()
            addPostToTags(tags,newPost.posts[0]._id,user_id)
        }

        res.json({message:"post uploaded"})
    }catch(error){
        res.json({message:"internal server error"})
    }
})


postRouter.post("/post/comment",async (req,res)=>{
    const {user_id,post_admin_id,post_id,comment}=req.body
    try {
        const post_admin=await Posts.findOne({user_id:post_admin_id})
        const posts=post_admin.posts
        for(let i=0;i<posts.length;i++){
            if(posts[i]._id.toString()===post_id){
                // console.log(posts[i]._id)
                let comments=[...posts[i].comments,{
                    commenter_id:user_id,
                    comment:comment
                }]
                posts[i].comments=comments
                break
            }
        }
        post_admin.posts=posts
        await post_admin.save()
        res.json({message:"commented to post"})
    } catch (error) {
        res.json({message:"internal server error"})
    }
})

postRouter.post("/post/replyToComment",async (req,res)=>{
    const {user_id,post_admin_id,commenter_id,post_id,reply}=req.body
    //user_id   ---  id of the user who want to reply
    //post_admin_id   ---   id of the post  Posts.user_id
    //commenter_id   ---   id of the user comment for which you wan to give reply Posts.posts[some index].comments[some index].commenter_id
    //post_id   ----   id of the post Posts.posts[some index]._id
    //reply   ----   the reply you want to give
    try {
        const post_admin=await Posts.findOne({user_id:post_admin_id})
        const posts=post_admin.posts
        for(let i=0;i<posts.length;i++){
            if(posts[i]._id.toString()===post_id){
                const comments=posts[i].comments
                for(let j=0;j<comments.length;j++){
                    if(comments[j]._id.toString()===commenter_id){
                        console.log(comments[j]._id)
                        const replies=[...comments[j].replies,{
                            replier_id:user_id,
                            reply:reply
                        }]
                        comments[j].replies=replies
                        break
                    }
                }
                posts[i].comments=comments
                break
            }
        }
        post_admin.posts=posts
        await post_admin.save()
        res.json({message:"replied to the comment"})
    } catch (error) {
        res.json({message:"internal server error"})
    }
})

postRouter.post("/post/getPostsFromFollowing",async(req,res)=>{
    const {user_id}=req.body
    try {
        const user=await Follows.findOne({user_id})
        var allposts=[]
        if(user){
            const following = user.following
            for(let post_admin of following){
                const posts=await Posts.findOne({user_id:post_admin})
                if(posts){
                    allposts=[...allposts,...posts.posts]
                }
            }
            res.json({posts:allposts})
        }
        else{
            res.json({message:"follow some people"})
        }
    } catch (error) {
        res.json({message:"internal server error"})
    }
})

export {postRouter}