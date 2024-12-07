import {memo, useCallback, useState} from "react";
import {PostType} from "../../../../@types/post.type.ts";
import {Panel, PanelFooterTemplateOptions, PanelHeaderTemplateOptions} from "primereact/panel";
import {Button} from "primereact/button";
import {ConfirmPopup, confirmPopup} from "primereact/confirmpopup";
import {getApi} from "../../../../config/api.ts";
import {useAppDispatch} from "../../../../store/hooks.ts";
import {deletePost} from "../../../../store/manageAccount/manageAccount.slice.ts";
import {UpdatePost} from "../UpdatePost/UpdatePost.tsx";


type PostCardProps = {
    data: PostType
}

export const PostCard = ({data}: PostCardProps) => {

    const [postData, setPostData] = useState<PostType>(data);

    console.log(postData)
    const dispatch = useAppDispatch();

    const accept = useCallback(async () => {
        try {
            const response = await getApi().delete(`/posts/${postData._id}`);
            const id = response.data;
            dispatch(deletePost(id));
        } catch (e) {
            throw e;
        }
    }, [postData._id]);
    const reject = () => console.log("Reject")

    const confirm = (event: any) => {
        confirmPopup({
            target: event.currentTarget,
            message: 'Do you want to delete this record?',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept,
            reject
        })


    };

    const footerTemplate = (options: PanelFooterTemplateOptions) => {
        return <div className={options.className + " flex justify-between"}>
            <div className={"flex gap-2"}>
                <span><i className={"pi pi-heart me-1"}/>{postData.likes}</span>
                <span><i className={"pi pi-star me-1"}/>{postData.superlikes}</span>
            </div>
            {new Date(postData.createdAt).toDateString()}
        </div>
    }

    const headerTemplate = (options: PanelHeaderTemplateOptions) => {
        return <div className={options.className + " flex items-center justify-between w-full"}>
            <div className={"font-semibold"}>{postData.title}</div>

            <div className={"flex items-center"}>
                <UpdatePost id={postData._id} setPostData={setPostData}/>
                <Button rounded text icon={"pi pi-trash"} severity={"danger"} onClick={confirm}/>
            </div>

            <ConfirmPopup/>
        </div>
    }

    return <Panel footerTemplate={footerTemplate} headerTemplate={headerTemplate}>
            <p>{postData.content}</p>
        </Panel>




}