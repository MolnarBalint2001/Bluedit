import {Button} from "primereact/button";
import {OverlayPanel} from "primereact/overlaypanel";
import {memo, useRef} from "react";
import {useLikes} from "./hooks/useLikes.ts";
import {LikesItem} from "./LikesItem.tsx";
import {Divider} from "primereact/divider";


type LikesPropsType = {
    postId:string
    likeCount:number,
    setPost:any
}

export const Likes = memo(({postId, likeCount, setPost}:LikesPropsType) =>{

    const {
        getPostLikes,
        likes,
        like,
        isAlreadyLiked
    } = useLikes(postId, setPost);

    const opRef = useRef<OverlayPanel>(null);



    return <>

        <Button icon="pi pi-heart" size={"small"} text severity={"help"} tooltip={"Like"}
                tooltipOptions={{position: "bottom"}} label={`${likeCount}`} onClick={(e)=>opRef.current?.show(e, e.target)}/>

        <OverlayPanel
            ref={opRef}
            onShow={getPostLikes}
            showCloseIcon
        >
            <div className={"font-semibold"}>Likes</div>
            <Divider/>
            <div  className={"flex flex-col gap-2"}>
                {
                    likes.map((e)=>{
                        return <LikesItem key={e.userId._id} data={e.userId}/>
                    })
                }
            </div>

            <Button size={"small"} severity={isAlreadyLiked ? "help" : "secondary"} icon={"pi pi-heart"} label={`${isAlreadyLiked ? "Don't like it" : "Like it"}`} className={"w-full mt-4"} onClick={like}/>
        </OverlayPanel>
    </>
});