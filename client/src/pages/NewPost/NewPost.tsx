import {InputText} from "primereact/inputtext";
import { InputTextarea } from 'primereact/inputtextarea';
import {Button} from "primereact/button";
import {useNewPost} from "./hooks/useNewPost.ts";
import {Toast} from "primereact/toast";

const NewPost = () =>{


    const {
        opInProgress,
        saveNewPost,
        contentRef,
        titleRef,
        errorToastRef
    } = useNewPost();


    return <>
        <div className={"flex flex-col items-center w-full"}>
            <div className={"text-xl font-semibold"}>New Post</div>
            <div className={"flex flex-col w-full gap-2 mt-2"}>
                <InputText ref={titleRef} placeholder={"Enter your post title..."}/>
                <InputTextarea ref={contentRef} style={{height:500}} placeholder={"Enter your post content..."}/>
                <Button  onClick={saveNewPost} severity={"success"} icon={"pi pi-save"} size={"small"} label={"Save"} className={"self-end"} loading={opInProgress}/>
            </div>

        </div>
        <Toast ref={errorToastRef}>
            Hello
        </Toast>
    </>


}


export default NewPost;