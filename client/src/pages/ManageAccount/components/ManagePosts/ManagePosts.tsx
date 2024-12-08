import {Divider} from "primereact/divider";
import {memo, useState} from "react";
import AnimateHeight from 'react-animate-height';
import {Button} from "primereact/button";
import {useAppSelector} from "../../../../store/hooks.ts";
import {PostCard} from "../PostCard/PostCard.tsx";



export const ManagePosts = memo(() =>{

    const posts = useAppSelector(state=>state.manageAccount.accountData?.posts);
    console.log(posts)
    const [opened, setOpened] = useState<boolean>(false);

    return <div className={"w-full mt-4"}>
        <div className={"flex items-center gap-2"}>
            <Button icon={`pi ${opened ? "pi-chevron-up" : "pi-chevron-down"}`} text rounded severity={"secondary"} onClick={()=>{
                setOpened(prevState => !prevState)
            }}/>
            <div className={"font-semibold text-xl"}>Manage posts</div>
        </div>

        <Divider/>

        <AnimateHeight duration={300} height={opened ? "auto" : 0}>
            <div className={"flex flex-col gap-4"}>
                {posts?.map((e)=>{
                    return <PostCard key={e._id} data={e}/>
                })}
            </div>
        </AnimateHeight>
    </div>

});
