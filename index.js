import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import userRoutes from './routes/user.js'
import videoRoutes from './routes/video.js'
import commentRoutes from './routes/comment.js'
import authRoutes from './routes/auth.js'

dotenv.config();
const connect = ()=>{
    // const mongoURI = process.env.MONGO;
    mongoose.connect("mongodb+srv://andivyy2508:andi@atlascluster.rqmoj99.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster").then(()=> console.log("connected")).catch( err => console.log('error occured ',err) )
}

const app= express();
app.use(express.json())
app.use(cookieParser())
app.use("/api/user" ,userRoutes)
app.use("/api/video" ,videoRoutes)
app.use("/api/comment",commentRoutes)
app.use("/api/auth" ,authRoutes)

app.use((err,req,res,next)=>{
    const status = err.status || 500;
    const message = err.message || "Something went wrong"
    return res.status(status).json({
        "success":false,
        status,
        message
    })
})

app.listen(8000 , ()=> {
    connect();
    console.log("server is running on port 8000")
})

