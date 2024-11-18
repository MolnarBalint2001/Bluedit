import {Panel} from "primereact/panel";
import {PostType} from "../@types/post.type.ts";
import {memo, useRef, useState} from "react";
import {Avatar} from "primereact/avatar";
import Profile from "../../../assets/avatar1.jpg";
import {Button} from "primereact/button";
import {Toast} from "primereact/toast";
import {Dialog} from "primereact/dialog";
import {InputText} from "primereact/inputtext";



type PostCardProps = {
    data:PostType
}

export const PostCard = memo(({data}:PostCardProps) =>{

    const [commentVisible, setCommentVisible] = useState<boolean>(false);

    const shareToastRef = useRef<Toast>(null);


    const share = () =>{
        shareToastRef.current?.show({ severity: 'success', summary: 'Post', detail: 'You successfully shared this post!' });
    }

    const like = () =>{


    }

    const comment = () =>{
        setCommentVisible(true);
    }

    return <>
        <Panel header={data.title} className={"w-[30%]"}>
            <p className="m-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <div className={"flex w-full mt-4 justify-between"}>
                <div className={"flex gap-4"}>
                    <Avatar image={Profile} shape={"circle"}/>
                    <div>
                        <p className={"font-semibold"}>Jordan Belfort</p>
                        <p className={"text-sm"}>CEO of Wall Street</p>
                    </div>

                </div>

                <div className={"flex items-center gap-2"}>
                    <Button icon={"pi pi-comment"}  size={"small"} text severity={"secondary"} tooltip={"Comment"} tooltipOptions={{position:"bottom"}} label={"100"} onClick={comment}/>
                    <Button icon="pi pi-heart" size={"small"} text severity={"help"} tooltip={"Like"} tooltipOptions={{position:"bottom"}} label={"9k"} />
                    <Button icon="pi pi-share-alt" size={"small"} text severity={"info"} tooltip={"Share"} tooltipOptions={{position:"bottom"}} label={"4k"} onClick={share}/>
                </div>

            </div>

        </Panel>
        <Toast ref={shareToastRef}/>
        <Dialog header={data.title + " comments"} visible={commentVisible} style={{ width: '30vw' }} onHide={() => {setCommentVisible(false)}}>

            <div className={"flex items-center gap-2 w-full mt-2"}>
                <InputText placeholder={"Write your thoughts..."} className={"w-full"}/>
                <Button icon={"pi pi-send"} size={"small"}/>
            </div>

        </Dialog>
    </>


})