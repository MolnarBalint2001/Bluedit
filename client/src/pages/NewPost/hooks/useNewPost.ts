import {useCallback, useRef, useState} from "react";
import {getApi} from "../../../config/api.ts";
import {Toast} from "primereact/toast";


export const useNewPost = () =>{

    //State
    const [opInProgress, setOpInProgress] = useState<boolean>(false);

    //Ref
    const titleRef = useRef<HTMLInputElement>(null);
    const contentRef = useRef<HTMLTextAreaElement>(null);
    const errorToastRef = useRef<Toast>(null);


    const saveNewPost = useCallback(async ()=>{

        const title = titleRef.current?.value;
        const content = contentRef.current?.value;

        if (!title || title?.length === 0){
            errorToastRef.current?.show({severity:"error", detail: "Post title is required!"});
            return;
        }

        if (!content || content?.length ===0){
            errorToastRef.current?.show({severity:"error", detail:"Post content is required!"});
            return;
        }


        const data = {
            title:title,
            content:content
        }

        console.log(data);
        try{
            const response = await getApi().post("posts", JSON.stringify(data));
        }
        catch (e){

        }
        finally {
            setOpInProgress(false);
        }

    },[]);

    return {
        saveNewPost,
        opInProgress,
        contentRef,
        titleRef,
        errorToastRef
    }

}