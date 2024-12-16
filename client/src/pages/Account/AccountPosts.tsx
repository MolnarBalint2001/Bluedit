import {PostType} from "../../@types/post.type.ts";
import {AccountPostCard} from "./AccountPostCard.tsx";


type AccountPostsProps = {
    posts:PostType[]
}
export const AccountPosts = ({posts}:AccountPostsProps) =>{



    return <div className={"flex flex-col  w-full"}>
        {
            posts.map((e)=>{
                return <AccountPostCard key={e._id} postData={e}/>
            })

        }
        <div className={"w-full text-2xl"}>Incoming posts soon</div>
    </div>
}