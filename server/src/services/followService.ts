
import Follow from "../models/follow";
import {JwtPayload} from "../middlewares/authenticationToken";


export const followService = {



    findFollowersByUser:async (user?:JwtPayload)=>{

        if (!user)
            throw new Error("Unauthorized!")

        const followers = await Follow.find({
            followedId:user.userId,
            active:true
        }).populate("followerId", "_id username email");

        return followers;

    },

    follow:async (followedId:any, user?:JwtPayload)=>{

        if (!followedId || !user)
            throw new Error("Unauthorized or followedId is null.");



        const follow =  await Follow.findOne({
            followerId:user.userId,
            followedId:followedId,
            active:false
        });

        if (follow){
            const refollowed = await Follow.findByIdAndUpdate(follow._id, {
                active:true
            });

            return refollowed;
        }


        const newFollow = new Follow(
            {
                followerId:user.userId,
                followedId:followedId,
            }
        )
        const savedFollow = newFollow.save();
        return savedFollow;
    },


    unfollow:async (followedId:any, user?:JwtPayload) =>{
        if (!followedId || !user)
            throw new Error("Unauthorized or followedId is null.");

        const follow = await Follow.findOne({
            followerId:user.userId,
            followedId:followedId,
            active:true
        });


        if (!follow)
            throw new Error("Follow not found.");


        const deletedFollow = Follow.findByIdAndUpdate(follow._id, {
            active:false
        });


    }

}