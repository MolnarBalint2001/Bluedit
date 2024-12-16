
import Follow from "../models/follow";
import {JwtPayload} from "../middlewares/authenticationToken";
import {logger} from "../logger";


export const followService = {



    findFollowersByUser:async (user?:JwtPayload)=>{

        if (!user)
            throw new Error("Unauthorized!")

        const followers = await Follow.find({
            followedId:user.userId,
        }).populate("followerId", "_id username email");




        return followers;

    },

    follow:async (followedId:any, user?:JwtPayload)=>{

        logger.debug(`Follow in the BLL layer. followedId=${followedId}, followerId=${user?.userId}`);

        const existFollow = await Follow.findOne({followedId:followedId, followerId:user?.userId});


        //Unfollow case
        if (existFollow){
            logger.debug(`Unfollow case. _id=${existFollow._id}`);
            await Follow.findByIdAndDelete(existFollow._id);
            return;
        }



        //Follow case
        const newFollow = new Follow({followedId:followedId, followerId:user?.userId, status:"pending"});
        await newFollow.save();
    },



    acceptFollow:async (followId:any)=>{
        logger.debug("Accept follow in the BLL layer.");


        const pendingFollow = await Follow.findById(followId);

        if (!pendingFollow)
            throw new Error("Follow not found.");


        pendingFollow.status = "accepted";

        await pendingFollow.save();

        return pendingFollow;
    },

    removeFollower:async (followId:any) =>{

        const deletedFollow = await Follow.findByIdAndDelete(followId);
        if (!deletedFollow)
            throw new Error("Follow not found.");


        return deletedFollow._id;
    }

}