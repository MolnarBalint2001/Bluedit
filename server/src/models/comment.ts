
import mongoose, {model, Schema} from "mongoose";


interface IComment extends Document {
    _id:mongoose.Types.ObjectId,
    postId:mongoose.Types.ObjectId,
    content:string,
    creatorUserId:mongoose.Types.ObjectId,
    createdAt:Date,
}



const commentSchema = new Schema<IComment>({

    postId:{
        required:true,
        type:Schema.Types.ObjectId,
        ref:"Post",
    },
    content:{
        type:String,
        required:true,
    },
    creatorUserId:{
        required:true,
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    createdAt:{
        type:Date,
        default:new Date()
    }

}, {
    timestamps:true
})


const Comment = model<IComment>("Comment", commentSchema);
export default Comment;