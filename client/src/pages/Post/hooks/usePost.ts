import {useParams} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import {getApi} from "../../../config/api.ts";
import {PostType} from "../../../@types/post.type.ts";


export const usePost = () =>{

    const {id} = useParams();
    const [loading, setLoading] = useState<boolean>(true);
    const [post, setPost] = useState<PostType | null>(null);


    const getPost = useCallback(async () =>{
        try{
            const response = await getApi().get(`/posts/${id}`);
            setPost(response.data);
        }
        catch (e){

        }
        finally {
            setLoading(false);
        }
    },[id]);

    useEffect(()=>{
        getPost();
    },[]);



    return {
        loading,
        post
    }

}