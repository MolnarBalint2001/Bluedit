import {PostType} from "./post.type.ts";
import {FollowersType} from "./followers.type.ts";


export type AccountType = {
    _id:string,
    username:string,
    email:string,
    posts:PostType[],
    followers:FollowersType[]
    profileColor?:string
}