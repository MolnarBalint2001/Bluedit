import {PostCard} from "./PostCard.tsx";
import {Button} from "primereact/button";
import {useNavigate} from "react-router-dom";
import {routes} from "../../../config/routes.ts";
import {usePosts} from "../hooks/usePosts.ts";
import {InputText} from "primereact/inputtext";
import {PostCardSkeleton} from "./PostCardSkeleton.tsx";

export const PostsWrapper = () => {

    const navigate = useNavigate();

    const {
        posts,
        loading,
        queryRef,
        timeoutSearch
    } = usePosts();

    return <div className={"flex flex-col items-center py-4"}>
        <div className={"w-full flex gap-2 mb-4"}>
            <InputText ref={queryRef} placeholder={"Search in posts"} className={"w-[90%]"} onChange={timeoutSearch}/>
            <Button icon={"pi pi-pencil"} label={"New"} size={"small"} severity={"success"} onClick={() => {
                navigate(routes.newPost);
            }}/>
        </div>

        {
            loading ? <div className={"w-full flex flex-col gap-2"}>
                {Array.from([0,1,2]).map((e)=>{
                    return <PostCardSkeleton key={e}/>
                })}

            </div> : <div className={"w-full"}>
                {
                    posts.map((e) => {
                        return <PostCard key={e._id} data={e}/>
                    })
                }
                <div className={"w-full text-2xl"}>Incoming posts soon</div>
            </div>
        }



    </div>

}