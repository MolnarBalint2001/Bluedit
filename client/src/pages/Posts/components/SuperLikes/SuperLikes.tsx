import {useRef} from "react";
import {Button} from "primereact/button";
import {OverlayPanel} from "primereact/overlaypanel";
import {Divider} from "primereact/divider";
import {SuperLikesItem} from "./SuperLikesItem.tsx";
import {useSuperLikes} from "./hooks/useSuperLikes.ts";


type SuperLikesProps = {
    postId:string,
    superlikeCount:number,
    setPost:any
}

export const SuperLikes = ({postId, superlikeCount, setPost}:SuperLikesProps) =>{


    const {
        getPostSuperlikes,
        superlike,
        superlikes,
        isAlreadyLiked
    } = useSuperLikes(postId, setPost);

    const superOpRef = useRef<OverlayPanel>(null);

    return  <>

        <Button icon="pi pi-star" size={"small"} text severity={"warning"} tooltip={"Like"}
                tooltipOptions={{position: "bottom"}} label={`${superlikeCount}`} onClick={(e)=>superOpRef.current?.show(e, e.target)}/>

        <OverlayPanel
            ref={superOpRef}
            onShow={getPostSuperlikes}
            showCloseIcon
        >
            <div className={"font-semibold"}>Superlikes</div>
            <Divider/>
            <div  className={"flex flex-col gap-2"}>
                {
                    superlikes.map((e)=>{
                        return <SuperLikesItem key={e.userId._id} data={e.userId}/>
                    })
                }
            </div>

            <Button size={"small"} severity={isAlreadyLiked ? "warning" : "secondary"} icon={"pi pi-star"} label={`${isAlreadyLiked ? "Don't like it" : "Superlike it"}`} className={"w-full mt-4"} onClick={superlike}/>
        </OverlayPanel>
    </>
};