import mongoose from "mongoose"
import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import { createError } from "../error.js"
import jwt from "jsonwebtoken"

export const signup = async (req,res,next) =>{
    try{
        const salt= bcrypt.genSaltSync(10)
        const hashPsw= bcrypt.hashSync(req.body.password , salt)
        const newUser = new User({...req.body ,password:hashPsw });
        await newUser.save();
        const token = jwt.sign({id : newUser._id} , process.env.JWT_KEY);
        res.cookie("access_token" , token ,{
            httpOnly:true
        }).status(200).json(newUser)
    }
    catch(err)
    {
        next(err)
    }
}

export const signin = async (req,res, next) =>{
    try{
        const fetchedUser = await User.findOne({name : req.body.name})
        if(!fetchedUser)
           return next(createError(404 ,"User not found"))
        else 
        {
            const checkPassword = await bcrypt.compare(req.body.password , fetchedUser.password)
            if(!checkPassword)
                next(createError(404 , "Incorrect password"))
            else 
            {
             const { password , ...otherDetails} = fetchedUser._doc
            const token = jwt.sign({id : fetchedUser._id} , process.env.JWT_KEY);
            res.cookie("access_token" , token ,{
                httpOnly:true
            }).status(200).json(otherDetails)
            }
        }
    }
    catch(err)
    {
        next(err)
    }
}

export const googleAuth = async (req,res,next)=>{
    try{
       const user = await User.findOne({email:req.body.email})
       if(user)
       {
            console.log('user exists')
            const token = jwt.sign({id : user._id} , process.env.JWT_KEY);
            res.cookie("access_token" , token ,{ httpOnly:true})
            .status(200).json(user._doc)
       }
       else
       {
        console.log('creating user')
        const newUser = new User({
            ...req.body,
            fromGoogle:true
        });
        const savedUser=await newUser.save();
        const token = jwt.sign({id : savedUser._id} , process.env.JWT_KEY);
            res.cookie("access_token" , token ,{
                httpOnly:true
            }).status(200).json(savedUser._doc)
       }
    }
    catch(err)
    {
        next(err);
    }
}