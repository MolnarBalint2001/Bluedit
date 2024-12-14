import {logger} from "../logger";
import User from "../models/user";
import Post from "../models/post";
import Follow from "../models/follow";
import {JwtPayload} from "../middlewares/authenticationToken";


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
            .select("_id, username email");

        if (!accountInformation)
            throw new Error("User not found!")

        const posts = await Post.find({
            creatorUserId: id
        });

        const followers = await Follow.find({
            followedId:id
        }).populate("followerId", "_id username email profileColor");


        const account = {
            _id:accountInformation._id,
            username:accountInformation.username,
            email:accountInformation.email,
            posts:posts,
            followers:followers,
            isFollowed:true
        }
        return account;
    },


    uploadImage:async (data:any, user:JwtPayload | undefined) =>{
        const fileContent = data.fileContent;

        logger.debug("Upload profile image in the BLL layer.")
        if (!fileContent ||fileContent.length === 0 )
            throw new Error("File not found!");

        const uploaded = await User.findByIdAndUpdate(user?.userId, {
            profilePicture:fileContent
        });

        if (!uploaded)
            throw new Error();

        return uploaded.profilePicture;
    },


    topAccounts:async ()=>{
        const accounts = await User.find().select("username profileColor");
        return accounts.slice(0,5);
    }


}