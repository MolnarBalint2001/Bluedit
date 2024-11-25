





import mongoose, {model, Schema} from "mongoose";


interface IPost extends Document {
    title:string,
    content:string,
    createdAt:Date,
    creatorUserId:mongoose.Types.ObjectId,
    active:boolean
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
    }



}, {
    timestamps:true
})


const Post = model<IPost>("post", postSchema);
export default Post;