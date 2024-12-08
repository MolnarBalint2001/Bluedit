import {Badge} from "primereact/badge";
import {Divider} from "primereact/divider";
import {useAccount} from "./hooks/useAccount.ts";
import {AccountSkeleton} from "./AccountSkeleton.tsx";
import {Button} from "primereact/button";


const Account = () =>{

    const {account, loading} = useAccount();

    if (loading){
        return <AccountSkeleton/>
    }

    return <>
        <div className={"w-full h-full flex flex-col items-center"}>
            <div className={"flex items-center gap-10 w-[50%]"}>
                <img src={"https://megaport.hu/media/king-include/uploads/2023/10/906363-female-avatar-profile-picture-013.jpg"} className={"rounded-full"} width={200}/>
                <div>
                    <div className="text-2xl font-semibold">{account?.username}</div>
                    <div>{account?.email}</div>
                    <Button icon={"pi pi-user-plus"} size={"small"} text label={"Follow"}/>
                    <div className={"flex gap-2 mt-5"}>
                        <Badge value={`${account?.followers.length} followers`}/>
                        <Badge value={`${account?.posts.length} shared posts`} severity={"secondary"}/>
                        <Badge value={`${3000} likes`} severity={"success"}/>
                    </div>
                </div>


            </div>


            <Divider className={"w-[50%]"}/>
        </div>
    </>

}




export default Account;