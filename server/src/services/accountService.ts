import {logger} from "../logger";
import User from "../models/user";
import Post from "../models/post";
import Follow from "../models/follow";
import {JwtPayload} from "../middlewares/authenticationToken";
import {Types} from "mongoose";



export const accountService = {



    findAccounts:async ()=>{
        logger.debug(`Get accounts in the BLl layer.`);
        const accounts = await User.find().select(["username", "email", "profilePicture" , "profileColor"]);

        return accounts;
    },

    search:async (query:any) =>{
        logger.debug(`Search accounts in the BLl layer. query=${query}`);
        const searchResult = await User.find({
            $or: [
                { email: { $regex: query, $options: "i" } },
                { username: { $regex: query, $options: "i" } }
            ]
        });

        return searchResult;
    },

    findUserById: async (id?: string) => {
        logger.debug(`Get account information in the BLL layer. id=${id}`);

        if (!id)
            throw new Error("Id not found!");


        const accountInformation = await User.findOne({
            _id:id
        })
            .select("_id, username email profileColor");

        if (!accountInformation)
            throw new Error("User not found!")

        const posts = await Post.find({
            creatorUserId: id
        });

        const followers = await Follow.find({
            followedId:id,
            status:"accepted"
        }).populate("followerId", "_id username email profileColor");




        const account = {
            _id:accountInformation._id,
            username:accountInformation.username,
            email:accountInformation.email,
            posts:posts,
            followers:followers,
            isFollowed:true,
            profileColor:accountInformation.profileColor
        }
        return account;
    },


    topAccounts:async ()=>{
        const accounts = await User.find().select("username profileColor");
        return accounts.slice(0,5);
    },


    updateAccount:async (accountId:any, data:any)=>{
        const updatedUser = await User
            .findByIdAndUpdate(accountId, {...data}, {new:true})
            .select("_id username email profileColor");

        if (!updatedUser)
            throw new Error("Update failed");

        return updatedUser;
    },


    getLoggedInUser:async (user?:JwtPayload)=>{

        if (!user)
            throw new Error("Unathorized.");

        const currentUser = await User.findById(user.userId).select("_id username email profileColor created");

        logger.debug("Logged in user id: " + currentUser?._id)
        if (!currentUser)
            throw new Error("User not found.");
        return currentUser;
    }


}