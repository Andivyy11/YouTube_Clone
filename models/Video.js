import mongoose from "mongoose"
const VideoSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    thumbnail:{
        type:String,
        required:true
    },
    videoUrl:{
        type:String,
        required:true
    },
    tags:{
        type: [String],
        default : []
    },
    likes:{
        type:[String],
        default:[]
    },
    dislikes:{
        type:[String],
        default:[]
    },
    comments:{
        type:[String],
        default:[]
    },
    views:{
        type:Number,
        default:0
    }
   },
    {timestamps: true}
)

export default mongoose.model("Video" , VideoSchema)