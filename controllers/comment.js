import { createError } from "../error.js"
import Comment from '../models/Comment.js'

export const addComment = async (req,res,next) =>{
    try{
        const cmnt = new Comment({ userId : req.user.id , ...req.body })
        await cmnt.save();
        res.status(200).json(cmnt)
    }
    catch(err)
    {
        next(err)
    }
}
 
export const deleteComment = async (req,res,next) =>{
    try{
        const cmnt = await Comment.findById(req.params.id);
        if(cmnt.userId !== req.user.id)
           return next(createError(403 , "can't delete other's comment"))
        else
        {
            await Comment.findByIdAndDelete(req.params.id)
            res.status(200).send("comment deleted successfully")
        }
    }
    catch(err)
    {
        next(err)
    }
}
export const editComment = async (req,res,next) => {
    try{
       const c = await Comment.findByIdAndUpdate( req.params.id,
        { $set: { text: req.body.text }},
        { new :true ,  runValidators: true })
       res.status(200).json(c)
    }
    catch(err)
    {
       next(err)
    }
}

export const getComment = async (req,res,next) =>{
    try{
        const c=await Comment.findById(req.params.id)
        res.status(200).json(c)
    }
    catch(err)
    {
        next(err)
    }
}
export const getAllComments = async (req,res,next) =>{
    try{
        const allComments =await Comment.find({videoId : req.params.videoId})
        res.status(200).json(allComments)
    }
    catch(err)
    {
        next(err)
    }
}