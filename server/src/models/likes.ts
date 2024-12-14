import mongoose, {Mongoose, Schema} from "mongoose";




export interface ILikes extends Document{
    userId:mongoose.Types.ObjectId,
    postId:mongoose.Types.ObjectId,
    createdAt:Date
}

const likesSchema = new Schema<ILikes>({

    userId:{
        required:true,
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    postId:{
        required:true,
        type:Schema.Types.ObjectId,
        ref:"Post"
    },
    createdAt:{
        type:Date,
        default:new Date()
    }
});

likesSchema.index({ userId: 1, postId: 1 }, { unique: true });

likesSchema.index({ userId: 1 });
likesSchema.index({ postId: 1 });


const Likes = mongoose.model<ILikes>("Likes", likesSchema);


export default Likes;