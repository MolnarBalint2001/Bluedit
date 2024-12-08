import {usePost} from "./hooks/usePost.ts";
import {SpinnerIcon} from "primereact/icons/spinner";


const Post = () =>{

    const {
        loading,
        post,
    } = usePost();


    if (loading){
        return <SpinnerIcon/>
    }

    return <>
        <div className={"w-full h-full flex flex-col items-center"}>
            <div className={"w-full flex flex-col items-start gap-4"}>
                <div className={"flex justify-between items-center w-full"}>
                    <h3 className={"text-2xl font-bold"}>{post?.title}</h3>
                    <div>
                        <div className={"font-bold"}><i className={"pi pi-book text-blue-600 me-2"}/>{post?.creatorUserId.username}</div>
                        <div>{new Date(post?.createdAt || "").toDateString()}</div>
                    </div>
                </div>
                <p>{post?.content}</p>
            </div>
        </div>


    </>
}


export default Post;