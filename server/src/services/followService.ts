import {JwtPayload} from "jsonwebtoken";


const followService = {


    follow:async (user:JwtPayload, followedId?:string)=>{
        if (!followedId)
            throw new Error("Followed id not found.");


        const newFollow = new
    },


    unfollow:async (user:JwtPayload, followedId?:string) =>{
        if (!followedId)
            throw new Error("Followed id not found.");
    }

}