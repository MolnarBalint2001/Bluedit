import Post from "../models/post";
import Comment from "../models/comment";
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
            followerId: user.userId
        })
            .select("followedId").exec().then((x) => x.map((e: any) => {
                const mappedId = new mongoose.Types.ObjectId();
                return mappedId;
            }));

        followedIdList.push(new mongoose.Types.ObjectId(user.userId))


        const posts =  await Post.aggregate([
            {
                $lookup: {
                    from: "comments",
                    localField: "_id",
                    foreignField: "postId",
                    as: "comments",
                },
            },
            {
                $addFields: {
                    commentCount: { $size: "$comments" },
                },
            },
            {
                $project: {
                    comments: 0,
                },
            },
            {
                $sort:{
                    "createdAt":-1
                }
            }
        ]);

        const populatedPosts = await Post.populate(posts, {
            path: "creatorUserId",
            select: "_id username email profilePicture profileColor",
        });

        logger.debug(`Post count: ${populatedPosts.length}`);
        return populatedPosts;
    },

    findById: async (id: string) => {
        logger.debug(`Get post by id in the BLL layer. id=${id}`)
        const post = await Post.findById(id).populate("creatorUserId");

        if (!post)
            throw new Error("Post not found!");

        return post;
    },

    createPost: async (data: any, user: any) => {

        logger.debug(`Create post in the BLL layer. title=${data.title} contentLength=${data.content.length} userId=${user.userId}`);
        if (!validatePost(data))
            throw new Error("Validation failed!");

        const newPost = new Post({...data, creatorUserId: user.userId});
        const savedPost = newPost.save();

        return savedPost;

    },

    updatePost: async (data: any) => {
        logger.debug(`Update post in the BLL layer. title=${data.title} contentLength=${data.content?.length}`);

        const updatedPost = await Post.findByIdAndUpdate(data._id, {...data}, {
            new:true,
            runValidators: true,
        });

        logger.debug("Updated post" + updatedPost?._id)
        if (!updatedPost)
            throw new Error("Update failed!");

        return updatedPost;
    },


    deletePost: async (id:string) => {

        logger.debug(`Delete post in the BLL layer. id=${id}`)
        const deletedPost = await Post.findByIdAndDelete(id);
        if (!deletedPost)
            throw new Error("Post nof found!");

        return deletedPost._id;
    },

    like: async (postId: any) => {
        logger.debug(`Like post in the BLl layer. postId=${postId}`);

        if (!postId)
            throw new Error("PostId not found!")

        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            {$inc: {likes: 1}},
            {new: true}
        );

        if (!updatedPost)
            throw new Error("Post not found!");

        return updatedPost;
    },


    getStatistics:async () =>{


        const startDate = new Date(new Date().getFullYear(),  new Date().getMonth()+1, - 1, 1);
        const endDate = new Date(new Date().getFullYear(), new Date().getMonth()+1, 1);


        let startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        let endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);



        const monthPostCountProm =   Post.find({
            createdAt: {
                $gte: startDate,
                $lt: endDate,
            }
        }).countDocuments();

        const todayPostsCountProm = Post.find({
            createdAt:{
                $gte: startOfDay,
                $lt: endOfDay,
            }
        }).countDocuments();

        const [monthCount, todayCount] = await Promise.all([monthPostCountProm, todayPostsCountProm] as Promise<number>[]);

        logger.debug(`Statistics count: MC=${monthCount}, TC=${todayCount}`);
        return {
            todayPostsCount:todayCount,
            monthPostsCount:monthCount
        }


    }


}