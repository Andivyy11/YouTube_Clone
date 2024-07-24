import { createError } from "../error.js";
import Video from '../models/Video.js'
import User from '../models/User.js'

export const uploadVideo = async ( req,res,next) =>
{
    try{
        const newVideo = new Video({ userId: req.user.id , ...req.body})
        await newVideo.save();
        res.status(200).json({ success : true , mssg : "video uploaded successfully" , ...newVideo._doc})
    }
    catch(err)
    {
        next(err)
    }
}

export const deleteVideo = async ( req,res,next) =>
{
    try{
        const video = await Video.findById(req.params.videoId)
        if(video.userId === req.user.id)
        {
            await Video.findByIdAndDelete(req.params.videoId)
            res.status(200).json("Video deleted successfully ")
        }
        else
            return next(createError(403 , "Cannot delete other user video"))
        
    }
    catch(err)
    {
        next(err)
    }
}

export const getVideo = async ( req,res,next) =>
{
   try{
    const video = await Video.findById(req.params.videoId)
    res.status(200).json(video)
   }
   catch(err)
   {
    next(err)
   }
}
 
export const getUserVideos = async ( req,res,next) =>
{
   try{
    const allVideo = await Video.find({ userId : req.params.userId})
    res.status(200).json(allVideo)
   }
   catch(err)
   {
    next(err)
   }
}

export const incView = async ( req,res,next) =>
{
   try{
      const v= await Video.findByIdAndUpdate( req.params.videoId , { $inc : { views : 1 }})
      res.status(200).json(v)
    }
   catch(err)
   {
    next(err)
   }
}

export const random = async (req, res, next) => {
    try {
      const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
      res.status(200).json(videos);
    } catch (err) {
      next(err);
    }
  };

export const trending = async ( req,res,next) =>
{
   try{
    const videos = await Video.find().sort( { views : -1 })
    res.status(200).json(videos)
   }
   catch(err)
   {
    next(err)
   }
}

export const getSubVideos = async ( req,res,next) =>
{
   try{
    const me = await User.findById(req.user.id)
    const subs = me.subscribed
    let videos = await Promise.all(
        subs.map( async (s) => {
            return (await Video.find({ userId : s}))
        })
    )
    res.status(200).json(videos.flat())
   }
   catch(err)
   {
    next(err)
   }
}

export const search = async (req,res,next) =>
{
    try{
        const q = req.params.q;
        console.log("query ",q) 
        const videos = await Video.find( {title : { $regex : q  , $options : "i" }})
        res.status(200).json(videos)
    }
    catch(err)
    {
        next(err)
    }
}
export const tags = async (req,res,next) =>
{
    try{
        const q = req.query.tags.split(",") 
        const videos = await Video.find( { tags : { $in : q }}).limit(30)
        res.status(200).json(videos)
    }
    catch(err)
    {
        next(err)
    }
}
