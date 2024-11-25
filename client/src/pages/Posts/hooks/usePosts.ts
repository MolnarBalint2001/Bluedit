import {useCallback, useEffect, useState} from "react";
import {PostType} from "../@types/post.type.ts";
import {getApi} from "../../../config/api.ts";


export const usePosts = () =>{

    const [posts, setPosts] = useState<PostType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);



    const fetchPosts = useCallback(async ()=>{
        try{
            const response = await getApi().get("/posts");
            setPosts(response.data);
        }
        catch (e){

        }
        finally {
            setLoading(false);
        }
    },[]);


    useEffect(()=>{
        fetchPosts();
    },[]);

    return {
        posts,
        loading
    }
}