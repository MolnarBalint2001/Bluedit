import {AccountListItemType} from "../@types/accountListItem.type.ts";
import {memo} from "react";
import {Avatar} from "primereact/avatar";
import {Button} from "primereact/button";
import {useNavigate} from "react-router-dom";

type AccountListItemProps = {
    data:AccountListItemType
}

const colors:string[] = [
    "#FF5733", "#33FF57", "#3357FF", "#FF33A8", "#33FFF4",
    "#FFA833", "#57FF33", "#FF3357", "#33A8FF", "#A833FF"
];

export const AccountListItem = memo(({data}:AccountListItemProps) =>{

    const navigate = useNavigate();
    const rndInt = Math.floor(Math.random() * colors.length) + 1



    return <div className={"flex w-full justify-between hover:bg-hovered p-2 cursor-pointer rounded-xl items-center"}>
        <div className={"flex gap-2"}>
            {data.profilePicture ?
                <Avatar image={"https://www.gravatar.com/avatar/05dfd4b41340d09cae045235eb0893c3?d=mp"} shape={"circle"}/> :
                <Avatar shape={"circle"} style={{backgroundColor:colors[rndInt]}} label={data.username.slice(0,2).toUpperCase()}/>
            }
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