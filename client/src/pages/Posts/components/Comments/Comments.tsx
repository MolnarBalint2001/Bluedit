import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {memo, useCallback, useRef, useState} from "react";
import {InputText} from "primereact/inputtext";
import {getApi} from "../../../../config/api.ts";
import {CommentItem} from "./CommentItem.tsx";
import {CommentType} from "../../../../@types/comment.type.ts";
import {CommentsSkeleton} from "./CommentsSkeleton.tsx";


type CommentsProps = {
    postId: string,
    postTitle: string,
    commentCount:number,
}

export const Comments = memo(({postId, postTitle, commentCount}: CommentsProps) => {

    const [visible, setVisible] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const commentRef = useRef<HTMLInputElement>(null);


    const [comments, setComments] = useState<CommentType[]>([]);


    const comment = useCallback(async () => {
        const commentContent = commentRef.current?.value;

        if (!commentContent || commentContent.length === 0)
            return;


        const data = {
            postId: postId,
            content: commentContent
        }
        try {

            const response = await getApi().post("comments", JSON.stringify(data));
            setComments(prevState => [...prevState, response.data]);
        } catch (e) {
            console.error(e);
        }
        finally {
            (commentRef.current as any).value = "";
        }
    }, [postId])


    const fetchComments = useCallback(async () => {
        setLoading(true);
        try {
            const response = await getApi().get(`comments?postId=${postId}`);
            setComments(response.data);
        } catch (e) {
            console.error(e)
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 300);

        }
    }, [postId]);


    return <>
        <Button icon={"pi pi-comment"} size={"small"} text severity={"secondary"} tooltip={"Comment"}
                tooltipOptions={{position: "bottom"}} label={`${commentCount}`} onClick={() => setVisible(true)}/>
        <Dialog
            header={`${postTitle.slice(0, 300) + "..."} comments`}
            onHide={() => {
                setVisible(false);
                setComments([])
            }}
            visible={visible} className={"w-[30%]"} onShow={fetchComments}>


            <div className={"flex flex-col justify-between min-h-[350px] max-h-[40vh] overflow-x-hidden"}>
                {loading ? <CommentsSkeleton/> : <div className={"flex flex-col gap-2 w-full "}>
                    {comments?.map((e: CommentType) => {
                        return <CommentItem key={e._id} commentData={e} setComments={setComments}/>
                    })}
                </div>}

            </div>
            <div className={"flex items-center gap-2 w-full mt-2 justify-self-end"}>
                <InputText ref={commentRef} placeholder={"Write your thoughts..."} className={"w-full"} onKeyDown={(e)=>{

                    if (e.key === "Enter") comment();

                }}/>
                <Button icon={"pi pi-send"} size={"small"} onClick={comment}/>
            </div>

        </Dialog>

    </>
});