import {useCallback, useState} from "react";
import {getApi} from "../../../../../config/api.ts";
import {SuperlikesType} from "../../../../../@types/superlikes.type.ts";
import {useAppSelector} from "../../../../../store/hooks.ts";
import {PostType} from "../../../../../@types/post.type.ts";


export const useSuperLikes = (postId:string, setPost:any) =>{


    const [superlikes, setSuperlikes] = useState<SuperlikesType[]>([]);

    const user = useAppSelector(state=>state.auth.user);

    const superlike = useCallback(async () =>{
        try{
            const response = await getApi().post(`posts/superlikes?postId=${postId}`);
            if (response.data.opDelete){
                setPost((prevState:PostType)=>{
                    return {...prevState, superlikes:prevState.superlikes - 1}
                });
                return;
            }
            setSuperlikes(prevState => [...prevState, response.data.like]);
            setPost((prevState:PostType)=>{
                return {...prevState, superlikes:prevState.superlikes + 1}
            });

        }
        catch (e){
            console.error(e);
        }
    },[postId]);



    const getPostSuperlikes = useCallback(async () =>{
        try{
            const response = await getApi().get(`posts/superlikes/${postId}`);
            setSuperlikes(response.data);
        }
        catch (e){
            console.error(e);
        }
    },[postId]);


    const isAlreadyLiked = superlikes.find((x)=>x.userId._id === user?.id) !== undefined;

    return {
        superlike,
        getPostSuperlikes,
        superlikes,
        isAlreadyLiked
    }
}