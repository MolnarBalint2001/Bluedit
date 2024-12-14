import {AccountAvatar} from "../../../../components/AccountAvatar/AccountAvatar.tsx";
import {memo} from "react";
import {useNavigate} from "react-router-dom";
import {routes} from "../../../../config/routes.ts";

type LikesItemProps = {
    data:any
}

export const LikesItem = memo(({data}:LikesItemProps) =>{

    const navigate = useNavigate();


    return <div className={"flex gap-2 hover:bg-hovered p-1 cursor-pointer rounded-md"} onClick={()=>navigate(routes.accounts + `/${data._id}`)}>
        <AccountAvatar username={data.username} color={data.profileColor || ""} size={"small"}/>
        <div className={"flex flex-col "}>
            <div className={"text-sm"}>{data.username}</div>
            <div className={"text-sm"}>{data.email}</div>
        </div>
    </div>
});