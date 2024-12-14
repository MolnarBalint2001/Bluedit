import {Panel, PanelHeaderTemplateOptions} from "primereact/panel";
import {PostType} from "../@types/post.type.ts";
import {memo} from "react";
import {routes} from "../../../config/routes.ts";
import {usePostCard} from "../hooks/usePostCard.ts";
import "./PostCard.css";
import {Comments} from "./Comments/Comments.tsx";
import {AccountAvatar} from "../../../components/AccountAvatar/AccountAvatar.tsx";
import {Likes} from "./Likes/Likes.tsx";
import {SuperLikes} from "./SuperLikes/SuperLikes.tsx";


type PostCardProps = {
    data: PostType
}

export const PostCard = memo(({data}: PostCardProps) =>{
    const {
        navigate,
        post,
        setPost
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
                    <AccountAvatar color={post.creatorUserId.profileColor} username={post.creatorUserId.username} size={"normal"}/>

                    <div>
                        <p className={"font-semibold hover:underline cursor-pointer"} onClick={() => {
                            navigate(routes.accounts + "/" + post.creatorUserId._id)
                        }}>{post.creatorUserId.username}</p>
                        <p className={"text-secondaryText"}>{post.creatorUserId.email}</p>
                    </div>

                </div>

                <div className={"flex items-center gap-2"}>
                    <Comments postId={post._id} postTitle={post.title} commentCount={post.commentCount} />
                    <Likes postId={post._id} likeCount={post.likes} setPost={setPost}/>
                    <SuperLikes postId={post._id} superlikeCount={post.superlikes} setPost={setPost}/>
                </div>

            </div>

        </Panel>
    </>


})