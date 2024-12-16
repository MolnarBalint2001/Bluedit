import {Divider} from "primereact/divider";
import {FollowerCard} from "./FollowerCard.tsx";
import {Button} from "primereact/button";
import {useCallback, useEffect, useState} from "react";
import AnimateHeight from "react-animate-height";
import {useAppSelector} from "../../../../store/hooks.ts";
import {getApi} from "../../../../config/api.ts";


export const ManageFollowers = () => {
    const [opened, setOpened] = useState<boolean>(false);
    const [followers, setFollowers] = useState<any[]>([]);
    const user = useAppSelector(state=>state.auth.user);


    const getFollowers = useCallback(async () =>{
        try{
            const response = await getApi().get("follow");
            setFollowers(response.data);
        }
        catch (e){

        }
    },[]);


    useEffect(()=>{
        getFollowers();
    },[]);


    const accepted = followers.filter((x)=>x.status === "accepted");
    const pending = followers.filter((x)=>x.status === "pending");
    return <div className={"w-full mt-4"}>

        <div className={"flex items-center gap-2"}>
            <Button icon={`pi ${opened ? "pi-chevron-up" : "pi-chevron-down"}`} text rounded severity={"secondary"} onClick={()=>{
                setOpened(prevState => !prevState)
            }}/>
            <div className={"font-semibold text-xl"}>Manage followers</div>
        </div>

        <Divider/>
        <AnimateHeight height={opened ? "auto" : 0} duration={300}>
            <div className={"flex flex-col gap-2"}>
                {
                    accepted.map((e)=>{
                        return <FollowerCard key={e._id} data={e} setFollowers={setFollowers}/>
                    })
                }

                {
                    pending.length > 0 ? <div className={"font-semibold"}>Pending requests</div> : null
                }

                {
                   pending.map((e)=>{
                        return <FollowerCard key={e._id} data={e} setFollowers={setFollowers}/>
                    })
                }
            </div>
        </AnimateHeight>


    </div>

}