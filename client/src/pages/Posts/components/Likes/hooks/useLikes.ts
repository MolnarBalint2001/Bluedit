import {getApi} from "../../../../../config/api.ts";
import {LikesType} from "../../../../../@types/likes.type.ts";
import {useCallback, useState} from "react";
import {useAppSelector} from "../../../../../store/hooks.ts";
import {PostType} from "../../../../../@types/post.type.ts";
import {toast} from "react-toastify";

export const useLikes = (postId:string, setPost:any) =>{


    const [likes, setLikes] = useState<LikesType[]>([]);

    const user = useAppSelector(state=>state.auth.user);

    const getPostLikes = useCallback(async () =>{
        try{
            const response = await getApi().get(`/posts/likes/${postId}`);
            setLikes(response.data);
        }
        catch (e){
            console.error(e)
        }
    },[postId]);



    const like = useCallback(async () => {
        try{
            const response = await getApi().put(`/posts/likes?postId=${postId}`);
            const data = response.data;
            if (data.opDelete){
                setLikes(prevState => {
                    return prevState.filter((x)=>x._id !== data.like);
                });
                setPost((prevState:PostType) => {
                    return {...prevState, likes:prevState.likes - 1}
                });
                return;

            }

            setLikes(prevState => [...prevState, response.data.like]);
            setPost((prevState:PostType) => {
                return {...prevState, likes:prevState.likes + 1}
            });
            toast.success("You liked this post.")
        }
        catch (e){

        }
    },[postId]);



    const isAlreadyLiked = likes.find((x)=>x.userId._id === user?.id) !== undefined;



    return {
        getPostLikes,
        likes,
        like,
        isAlreadyLiked
    }
}