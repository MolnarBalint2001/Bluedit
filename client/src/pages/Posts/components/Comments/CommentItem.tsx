import {CommentType} from "../../../../@types/comment.type.ts";
import {Avatar} from "primereact/avatar";
import {Button} from "primereact/button";
import {useAppSelector} from "../../../../store/hooks.ts";
import {useCallback} from "react";
import {getApi} from "../../../../config/api.ts";
import {AccountAvatar} from "../../../../components/AccountAvatar/AccountAvatar.tsx";


type CommentItemProps = {
    commentData:CommentType,
    setComments:any
}

export const CommentItem =({commentData, setComments}:CommentItemProps) =>{


    const user = useAppSelector(state=>state.auth.user);

    const deleteComment = useCallback(async () =>{
        try{
            const response = await getApi().delete(`comments/${commentData._id}`);
            setComments((prevState:CommentType[])=>{
                return prevState.filter((x:CommentType)=>x._id !== response.data);
            })
        }
        catch (e){
            console.error(e);
        }
    },[commentData._id])


    return <div className={"flex flex-col gap-1"}>

        <div className={"flex justify-between"}>

            <div className={"flex gap-2"}>
                <AccountAvatar username={commentData.creatorUserId.username} size={"small"} color={commentData.creatorUserId.profileColor}/>
                <div className={"flex items-center gap-2"}>
                    <div className={"font-semibold text-sm"}>{commentData.creatorUserId.username}</div>
                    &middot;
                    <div className={"text-sm"}>{new Date(commentData.createdAt).toDateString()}</div>
                </div>
            </div>

            <Button
                visible={user?.id === commentData.creatorUserId._id}
                icon={"pi pi-trash"}
                severity={"danger"}
                size={"small"}
                text
                onClick={deleteComment}
            />
        </div>

        <div className={"ms-4 text-sm"}>
            {commentData.content}
        </div>
    </div>

};