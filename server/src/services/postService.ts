import Post from "../models/post";
import {logger} from "../logger";
import Follow from "../models/follow";
import mongoose from "mongoose";
import Likes from "../models/likes";
import {JwtPayload} from "../middlewares/authenticationToken";
import Superlikes from "../models/superlikes";

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


        const posts = await Post.aggregate([
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
                    commentCount: {$size: "$comments"},
                },
            },
            {
                $project: {
                    comments: 0,
                },
            },
            {
                $sort: {
                    "createdAt": -1
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
            new: true,
            runValidators: true,
        });

        logger.debug("Updated post" + updatedPost?._id)
        if (!updatedPost)
            throw new Error("Update failed!");

        return updatedPost;
    },


    deletePost: async (id: string) => {

        logger.debug(`Delete post in the BLL layer. id=${id}`)
        const deletedPost = await Post.findByIdAndDelete(id);
        if (!deletedPost)
            throw new Error("Post nof found!");

        return deletedPost._id;
    },

    like: async (postId: any, user?: JwtPayload) => {
        logger.debug(`Like post in the BLl layer. postId=${postId}`);


        const alreadyLiked = await Likes.findOne({postId: postId, userId: user?.userId});
        if (alreadyLiked) {
            await Likes.findByIdAndDelete(alreadyLiked._id);
            if (!alreadyLiked)
                throw new Error("Like nof found!");

            await postService.handleLikesCount(alreadyLiked.postId, true);
            return {
                like: alreadyLiked._id,
                opDelete: true
            }
        }


        logger.debug("Post is not liked yet.");

        const newLike = new Likes({postId: postId, userId: user?.userId});
        const savedLike = await newLike.save();


        await postService.handleLikesCount(savedLike.postId, false);

        return {
            like: await savedLike.populate("userId", "_id username email profileColor"),
            opDelete: false
        }
    },


    handleLikesCount:async (postId:mongoose.Types.ObjectId, decr:boolean) =>{

        const post = await Post.findById(postId);

        if (!post)
            throw new Error("Post not found.");

        if (decr){
            if (post.likes > 0){
                post.likes -=1;
                post.save();
                logger.debug("Post likes count successfully decremented!")
            }
            return;
        }

        post.likes +=1;
        post.save();

        logger.debug("Post likes count successfully incremented!")
    },


    getStatistics: async () => {


        const startDate = new Date(new Date().getFullYear(), new Date().getMonth() + 1, -1, 1);
        const endDate = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1);


        let startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        let endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);


        const monthPostCountProm = Post.find({
            createdAt: {
                $gte: startDate,
                $lt: endDate,
            }
        }).countDocuments();

        const todayPostsCountProm = Post.find({
            createdAt: {
                $gte: startOfDay,
                $lt: endOfDay,
            }
        }).countDocuments();

        const [monthCount, todayCount] = await Promise.all([monthPostCountProm, todayPostsCountProm] as Promise<number>[]);

        logger.debug(`Statistics count: MC=${monthCount}, TC=${todayCount}`);
        return {
            todayPostsCount: todayCount,
            monthPostsCount: monthCount
        }
    },


    findLikes: async (postId: string) => {

        logger.debug(`Get likes to a post in the BLL layer. postId=${postId}`);

        const likes = await Likes
            .find({postId: postId})
            .populate("userId", "_id username email profileColor");
        return likes;
    },



    superlike:async (postId:string, user?:JwtPayload)=>{
        logger.debug(`Superlike post in the BLl layer. postId=${postId}`);


        const alreadySuperliked = await Superlikes.findOne({postId: postId, userId: user?.userId});
        if (alreadySuperliked) {
            await Superlikes.findByIdAndDelete(alreadySuperliked._id);
            if (!alreadySuperliked)
                throw new Error("Like nof found!");

            await postService.handleSuperlikesCount(alreadySuperliked.postId, true);
            return {
                like: alreadySuperliked._id,
                opDelete: true
            }
        }


        logger.debug("Post is not liked yet.");

        const newSuperlike = new Superlikes({postId: postId, userId: user?.userId});
        const savedSuperlike = await newSuperlike.save();


        await postService.handleSuperlikesCount(savedSuperlike.postId, false);

        return {
            like: await savedSuperlike.populate("userId", "_id username email profileColor"),
            opDelete: false
        }
    },


    findSuperlikes:async (postId:string) =>{
        const superlikes = await Superlikes.find({postId:postId}).populate("userId", "_id username email profileColor");

        return superlikes;
    },


    handleSuperlikesCount:async (postId:mongoose.Types.ObjectId, decr:boolean) =>{

        const post = await Post.findById(postId);

        if (!post)
            throw new Error("Post not found.");

        if (decr){
            if (post.superlikes > 0){
                post.superlikes -=1;
                post.save();
                logger.debug("Post superlikes count successfully decremented!")
            }
            return;
        }

        post.superlikes +=1;
        post.save();

        logger.debug("Post superlikes count successfully incremented!")
    },


    findPostsByAccount:async (accountId:string)=>{
        logger.debug(`Get posts by accountId in the BLl layer. accountId=${accountId}`);

        const posts = await Post.find({creatorUserId:accountId});

        return posts;


    }


}