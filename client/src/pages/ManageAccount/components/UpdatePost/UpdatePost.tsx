import {Dispatch, SetStateAction, memo, useCallback, useRef, useState} from "react";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {InputText} from "primereact/inputtext";
import {InputTextarea} from "primereact/inputtextarea";
import {getApi} from "../../../../config/api.ts";
import {PostType} from "../../../../@types/post.type.ts";

type UpdatePostProps = {
    id: string,
    setPostData: Dispatch<SetStateAction<PostType>>;
}
export const UpdatePost = memo(({id, setPostData}: UpdatePostProps) => {

    const [visible, setVisible] = useState<boolean>(false);
    const titleRef = useRef<HTMLInputElement>(null);
    const contentRef = useRef<HTMLTextAreaElement>(null);

    const updatePost = async () => {
        const title = titleRef.current?.value;
        const content = contentRef.current?.value;
        if (!title || title.length === 0)
            return;

        const formData = {
            _id:id,
            title:title,
            content:content
        }

        try{
            const response = await getApi().put("posts", JSON.stringify(formData));
            const data = response.data;
            console.log("Updated", data)
            setPostData(data);

            setTimeout(()=>{
                setVisible(false);
            },100);
        }
        catch (e){
            console.error(e);
        }
    };

    const getPostDetailed = useCallback(async () => {

        try {
            const response = await getApi().get(`posts/${id}`);
            const data = response.data;
            const element = titleRef.current;
            const contentElement = contentRef.current;
            if (element)
                element.value = data.title;

            if (contentElement)
                contentElement.value = data.content;
        } catch (e) {
            console.error(e)
        }
    }, []);


    const footerContent = (
        <Button label="Update" icon="pi pi-save" size={"small"} severity={"success"} onClick={updatePost}
                autoFocus/>
    );

    return <div>
        <Button icon={"pi pi-pencil"} text size={"small"} onClick={() => setVisible(true)}/>
        <Dialog onShow={getPostDetailed} footer={footerContent} header={`Update post ${""}`}
                onHide={() => setVisible(false)} className={"w-[38%]"} visible={visible}>
            <div className={"flex flex-col gap-2"}>
                <InputText ref={titleRef} title={""}></InputText>
                <InputTextarea ref={contentRef} className={"h-[400px]"}/>
            </div>

        </Dialog>
    </div>

});