import {useCallback, useEffect, useState} from "react";
import {getApi} from "../../../config/api.ts";
import {useParams} from "react-router-dom";


export const useAccountPosts = () =>{


    const [accountPosts, setAccountPosts] = useState<boolean>();

    const {id} = useParams();


    const getAccountPosts = useCallback(async () =>{
        try{
            const response = await getApi().get("posts/account-posts/" + id);
            setAccountPosts(response.data);
        }
        catch (e){

        }
        finally {

        }
    },[id]);


    useEffect(()=>{
        getAccountPosts();
    },[]);


    return {
        accountPosts
    }
}