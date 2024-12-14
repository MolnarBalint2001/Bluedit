import {AccountListItemType} from "../@types/accountListItem.type.ts";
import {memo} from "react";
import {Button} from "primereact/button";
import {useNavigate} from "react-router-dom";
import {AccountAvatar} from "../../../components/AccountAvatar/AccountAvatar.tsx";

type AccountListItemProps = {
    data:AccountListItemType
}

export const AccountListItem = memo(({data}:AccountListItemProps) =>{

    const navigate = useNavigate();




    return <div className={"flex w-full justify-between hover:bg-hovered p-2 cursor-pointer rounded-xl items-center"}>
        <div className={"flex gap-2"}>
            <AccountAvatar username={data.username} size={"small"} color={data.profileColor}/>
            <div>
                <div className={"font-semibold"}>{data.username}</div>
                <div className={"text-secondaryText"}>{data.email}</div>
            </div>
        </div>

        <Button
            onClick={()=>navigate(`${data._id}`)}
            size={"small"}
            text icon="pi pi-arrow-right"
            tooltip={`See ${data.username}`}
            tooltipOptions={{position:"right"}}
        />
    </div>
});