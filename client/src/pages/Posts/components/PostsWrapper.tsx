import {PostCard} from "./PostCard.tsx";
import {Button} from "primereact/button";
import {useNavigate} from "react-router-dom";
import {routes} from "../../../config/routes.ts";
import {usePosts} from "../hooks/usePosts.ts";

export const PostsWrapper = () => {

    const navigate = useNavigate();

    const {
        loading,
        posts
    } = usePosts();

    return <div className={"flex flex-col items-center gap-4"}>
            <div>
                <Button icon={"pi pi-pencil"} label={"New post"} size={"small"} onClick={()=>{
                    navigate(routes.newPost);
                }}/>
            </div>

            {
                posts.map((e) => {
                    return <PostCard key={e._id} data={e}/>
                })
            }
        </div>

}