import {Panel, PanelHeaderTemplateOptions} from "primereact/panel";
import {PostType} from "../@types/post.type.ts";
import {memo} from "react";
import {Avatar} from "primereact/avatar";
import Profile from "../../../assets/avatar1.jpg";
import {Button} from "primereact/button";
import {routes} from "../../../config/routes.ts";
import {usePostCard} from "../hooks/usePostCard.ts";
import "./PostCard.css";
import {Comments} from "./Comments/Comments.tsx";

type PostCardProps = {
    data: PostType
}

export const PostCard = memo(({data}: PostCardProps) =>{
    const {
        like,
        navigate,
        post
    } = usePostCard(data);



    const headerTemplate = (options:PanelHeaderTemplateOptions) =>{
        return <div className={options.className}>
            <p className={"hover:underline font-semibold text-xl cursor-pointer"} onClick={()=>{
                window.open(routes.post + `/${post._id}`, "_blank");
            }}>{post.title}</p>
        </div>
    }


    return <>
        <Panel headerTemplate={headerTemplate} className={"w-full post-card hover:brightness-125 cursor-pointer"}>
            <p className="m-0">{post.content.slice(0,400)}...</p>
            <div className={"flex w-full mt-4 justify-between"}>
                <div className={"flex gap-4"}>
                    {
                        post.creatorUserId.profilePicture ?  <Avatar image={Profile} shape={"circle"}/> : <Avatar shape={"circle"} label={post.creatorUserId.username.slice(0,2).toUpperCase()}/>
                    }

                    <div>
                        <p className={"font-semibold hover:underline cursor-pointer"} onClick={() => {
                            navigate(routes.accounts + "/" + post.creatorUserId._id)
                        }}>{post.creatorUserId.username}</p>
                        <p className={"text-secondaryText"}>{post.creatorUserId.email}</p>
                    </div>

                </div>

                <div className={"flex items-center gap-2"}>
                    <Comments postId={post._id} postTitle={post.title} commentCount={post.commentCount} />

                    <Button icon="pi pi-heart" size={"small"} text severity={"help"} tooltip={"Like"}
                            tooltipOptions={{position: "bottom"}} label={`${post.likes}`} onClick={like}/>

                    <Button icon="pi pi-star" size={"small"} text severity={"warning"} tooltip={"Superlike"}
                            tooltipOptions={{position: "bottom"}} label={`${post.superlikes}`}/>
                </div>

            </div>

        </Panel>
    </>


})