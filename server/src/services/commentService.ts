import {JwtPayload} from "../middlewares/authenticationToken";
import Comment from "../models/comment";


export const commentService = {

    findComments:async (postId:string)=>{
        const comments = await Comment
            .find({
                postId:postId
            })
            .populate("creatorUserId", "username email profilePicture")


        return comments;
    },

    createComment:async (data:any, user?:JwtPayload)=>{

        const newComment = new Comment({...data, creatorUserId:user?.userId});
        const savedComment = await newComment.save();

        return savedComment.populate("creatorUserId", "_id username email profilePicture");

    },

    deleteComment:async (commentId:string)=>{

        const deletedComment = await Comment.findByIdAndDelete(commentId);

        if (!deletedComment)
            throw new Error("Delete failed!");

        return deletedComment._id;

    }
}