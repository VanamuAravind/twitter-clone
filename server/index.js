import mongoose from "mongoose"
import express from 'express'
import {userRouter}  from "./routes/userRoute.js"
import cors from 'cors'
import { postRouter } from "./routes/Posts.js"
import { followRouter } from "./routes/Follow.js"
const app=express()
app.use(cors())
app.use(express.json())

const DB="mongodb+srv://aravind:1234@twitter.plbqs1w.mongodb.net/main"
mongoose.connect(DB).then(()=>{
    console.log("database connected")
})

app.use("/",userRouter)
app.use("/",postRouter)
app.use("/",followRouter)
app.listen(3001,()=>{
    console.log("server is up")
})