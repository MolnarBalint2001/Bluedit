import {routes} from "../../../../config/routes.ts";
import {AccountAvatar} from "../../../../components/AccountAvatar/AccountAvatar.tsx";
import {useNavigate} from "react-router-dom";

type SuperLikesItemProps = {
    data:any
}
export const SuperLikesItem = ({data}:SuperLikesItemProps) =>{


    const navigate = useNavigate();

    return <div className={"flex gap-2 hover:bg-hovered p-1 cursor-pointer rounded-md"} onClick={()=>navigate(routes.accounts + `/${data._id}`)}>
        <AccountAvatar username={data.username} color={data.profileColor || ""} size={"small"}/>
        <div className={"flex flex-col "}>
            <div className={"text-sm"}>{data.username}</div>
            <div className={"text-sm"}>{data.email}</div>
        </div>
    </div>
}