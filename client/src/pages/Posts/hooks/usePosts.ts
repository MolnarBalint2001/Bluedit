import {useCallback, useEffect, useRef, useState} from "react";
import {PostType} from "../@types/post.type.ts";
import {getApi} from "../../../config/api.ts";
import {toast} from "react-toastify";
import {ZIndexUtils} from "primereact/utils";
import set = ZIndexUtils.set;


export const usePosts = () =>{

    const [posts, setPosts] = useState<PostType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const queryRef = useRef<HTMLInputElement>(null)



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


    const timeoutSearch = (event:any)=>{

        const query = event.target.value;
        setTimeout(async ()=>{
            try{
                console.log(query)
                const response = await getApi().post("/posts/search", JSON.stringify({query:query}));
                setPosts(response.data);
            }
            catch (e){
                toast.error("Something went wrong.")
            }
            finally {
                setLoading(false);
            }
        }, 1000)
    }



    return {
        posts,
        loading,
        queryRef,
        timeoutSearch
    }
}