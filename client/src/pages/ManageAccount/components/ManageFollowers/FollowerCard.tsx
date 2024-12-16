import {memo, useCallback} from "react";
import {Button} from "primereact/button";
import {AccountAvatar} from "../../../../components/AccountAvatar/AccountAvatar.tsx";
import {getApi} from "../../../../config/api.ts";
import {toast} from "react-toastify";


type FollowerCardProps = {
    data:any,
    setFollowers:any
}

export const FollowerCard = memo(({data, setFollowers}:FollowerCardProps) =>{

    const acceptFollow = useCallback(async () =>{
        try{
            const response = await getApi().put(`follow/accept/${data._id}`);

            setFollowers((prevState:any)=>{
                return prevState.map((e)=>{
                    if (e._id === response.data._id){
                        return {...e, status:"accepted"}
                    }

                    return e;
                })
            })
            toast.success("You accepted the follow request. ")
        }
        catch (e){
            toast.error("Something went wrong.")
        }

    },[data._id])


    const rejectFollow = useCallback(async () =>{
        try{
            const response = await getApi().delete(`follow/reject/${data._id}`);
            setFollowers((prevState:any)=>{
               return prevState.filter((x)=>x._id !== response.data);
            })

            toast.info("You rejected the follow request. ");
        }
        catch (e){
            toast.error("Something went wrong.")
        }
    },[data._id]);



    const removeFollow = useCallback(async () =>{
        try{
            const response = await getApi().delete(`follow/reject/${data._id}`);
            setFollowers((prevState:any)=>{
                return prevState.filter((x)=>x._id !== response.data);
            })

            toast.info("You deleted the follow.");
        }
        catch (e){
            toast.error("Something went wrong.")
        }
    },[data._id]);

    return <div className={"flex items-center justify-between w-full"}>
        <div className={"flex items-center gap-2"}>
            <AccountAvatar username={data.followerId.username} size={"small"}/>
            <div>
                <div className={"font-semibold"}>{data.followerId.username}</div>
                <div>{data.followerId.email}</div>
            </div>
        </div>

        <div className={"flex items-center"}>
            <Button icon={"pi pi-check"} severity={"success"} text tooltip={"Accept follow request"} tooltipOptions={{position:"bottom"}} onClick={acceptFollow} visible={data.status !== "accepted"}/>
            <Button icon={"pi pi-times"} severity={"danger"} text tooltip={"Reject follow request"} tooltipOptions={{position:"bottom"}} onClick={rejectFollow} visible={data.status === "pending"}/>
            <Button icon={"pi pi-ban"} severity={"danger"} text tooltip={"Remove follower"} tooltipOptions={{position:"bottom"}} onClick={removeFollow} visible={data.status !== "pending"}/>
        </div>

    </div>


});