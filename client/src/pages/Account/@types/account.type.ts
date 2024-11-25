import {PostType} from "../../../@types/post.type.ts";
import {FollowersType} from "../../../@types/followers.type.ts";


export type AccountType = {
    _id:string,
    username:string,
    email:string,
    posts:PostType[],
    followers:FollowersType[]
}