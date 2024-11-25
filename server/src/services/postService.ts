import Post from "../models/post";
import User from "../models/user";
import {logger} from "../logger";
import Follow from "../models/follow";
import mongoose from "mongoose";

const validatePost = (data: any): boolean => {

    if (!data)
        return false;

    if (!data.title || data.title.length === 0 || !data.content || data.content.length === 0)
        return false;

    return true;

}

export const postService = {


    findActives: async (user: any) => {
        logger.debug("Get posts in the BLL layer.");

        if (!user)
            throw new Error("Unathorized!");

        const followedIdList = await Follow.find({
            followerId:user.userId
        })
            .select("followedId").exec().then((x)=>x.map((e:any)=>{
            const mappedId = new mongoose.Types.ObjectId();
            return mappedId;
        }));

        followedIdList.push(new mongoose.Types.ObjectId(user.userId))


        const posts = await Post
            .find({
                active: true,
                creatorUserId: {$in: followedIdList}
            })
            .populate("creatorUserId");

        logger.debug(`Post count: ${posts.length}`);

        return posts;
    },

    findById: async (id?: string) => {

    },

    createPost: async (data: any, user: any) => {

        logger.debug(`Create post in the BLL layer. title=${data.title} contentLength=${data.content.length} userId=${user.userId}`);
        if (!validatePost(data))
            throw new Error("Validation failed!");

        const newPost = new Post({...data, creatorUserId: user.userId});
        const savedPost = newPost.save();

        return savedPost;

    },

    updatePost: async (data: any, user: any) => {

    },


    deletePost: async (id?: string) => {

    }


}