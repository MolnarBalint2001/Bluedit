import {AccountAvatar} from "../AccountAvatar/AccountAvatar.tsx";
import {memo} from "react";
import {useNavigate} from "react-router-dom";
import {routes} from "../../config/routes.ts";



type AccountGlobalItemProps = {
    accountData:{
        _id:string
        username:string,
        email:string,
        profileColor?:string
    }
}

export const AccountGlobalItem = memo(({accountData}:AccountGlobalItemProps) =>{

    const navigate = useNavigate();

    return <div className={"flex items-start gap-2 p-2 rounded-lg hover:bg-hovered cursor-pointer"} onClick={()=>navigate("/" + routes.accounts + `/${accountData._id}`)}>
        <AccountAvatar username={accountData.username} size={"normal"} color={accountData.profileColor}/>
        <div className={"flex flex-col"}>
            <div>{accountData.username}</div>
            <div>{accountData.email}</div>
        </div>
    </div>
});