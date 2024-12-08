import {Avatar} from "primereact/avatar";
import {memo} from "react";


type AccountAvatarProps = {
    username:string,
    size:any,
    color?:string
}

export const AccountAvatar = memo(({username, size, color}:AccountAvatarProps) =>{

    const label = username.slice(0,2).toUpperCase();

    return <Avatar style={{background:color || ""}} label={label} shape={"circle"} size={size}/>
});