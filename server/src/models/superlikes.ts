



import mongoose, {Mongoose, Schema} from "mongoose";




export interface ISuperlikes extends Document{
    userId:mongoose.Types.ObjectId,
    postId:mongoose.Types.ObjectId,
    createdAt:Date
}

const superlikesSchema = new Schema<ISuperlikes>({

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



superlikesSchema.index(
    { userId: 1, postId: 1 },
    { unique: true, name: "superlike_user_post_unique" }
);

const Superlikes = mongoose.model<ISuperlikes>("Superlikes", superlikesSchema);


export default Superlikes;