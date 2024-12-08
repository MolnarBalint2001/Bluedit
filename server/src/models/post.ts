





import mongoose, {model, Schema} from "mongoose";


interface IPost extends Document {
    title:string,
    content:string,
    createdAt:Date,
    creatorUserId:mongoose.Types.ObjectId,
    active:boolean,
    likes?:number,
    superlikes?:number
}



const postSchema = new Schema<IPost>({

    title:{
        type:String,
        maxlength:200,
        required:true
    },
    content:{
        type:String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    creatorUserId:{
        type:Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    active:{
        type:Boolean,
        default:true
    },
    likes:{
        type:Number,
        default:0
    },
    superlikes:{
        type:Number,
        default:0
    }



}, {
    timestamps:true
})


const Post = model<IPost>("post", postSchema);
export default Post;