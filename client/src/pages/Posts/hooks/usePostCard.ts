import {useCallback, useState} from "react";
import {getApi} from "../../../config/api.ts";
import {PostType} from "../@types/post.type.ts";
import {useNavigate} from "react-router-dom";


export const usePostCard = (data:PostType) =>{

    //States
    const [post, setPost] = useState<PostType>(data);
    const [commentVisible, setCommentVisible] = useState<boolean>(false);


    //Navigate
    const navigate = useNavigate();


    const superlike = useCallback(async () =>{
        try{
            const response = await getApi().put(`/posts/like?postId=${post._id}`);
            setPost(response.data);
        }
        catch (e){

        }
    },[post._id]);


    return {
        navigate,
        setCommentVisible,
        commentVisible,
        post,
        setPost
    }


}