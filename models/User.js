import mongoose from "mongoose"
const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
    },
    profile:{
        type:String
    },
    subscribers:{
        type:Number,
        default:0
    },
    subscribed:{
        type:[String],
        default:[]
    },
    fromGoogle:{
        type:Boolean,
        default:false 
    }
   },
    {timeStamps: true}
)

export default mongoose.model("User" , UserSchema)