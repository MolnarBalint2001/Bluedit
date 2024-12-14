import {Badge} from "primereact/badge";
import {Divider} from "primereact/divider";
import {useAccount} from "./hooks/useAccount.ts";
import {AccountSkeleton} from "./AccountSkeleton.tsx";
import {Button} from "primereact/button";
import {AccountPosts} from "./AccountPosts.tsx";
import {AccountAvatar} from "../../components/AccountAvatar/AccountAvatar.tsx";
import {AccountFollowers} from "./AccountFollowers.tsx";


const Account = () =>{

    const {account, loading, followAccount} = useAccount();

    if (loading){
        return <AccountSkeleton/>
    }

    return <>
        <div className={"w-full h-full flex flex-col items-center"}>
            <div className={"flex items-start gap-4 w-full"}>
                <AccountAvatar username={account?.username || ""} size={"xlarge"} color={""}/>
                <div>
                    <div className="text-2xl font-semibold">{account?.username}</div>
                    <div>{account?.email}</div>

                    <div className={"flex items-center gap-2 mt-5"}>
                        <AccountFollowers followers={account?.followers || []}/>
                        <Badge value={`${account?.posts.length} shared posts`} severity={"success"}/>
                        <Button icon={"pi pi-user-plus"}  size={"small"} text label={"Follow"} rounded onClick={followAccount}/>
                    </div>
                </div>


            </div>


            <Divider className={"w-full"}/>
            <AccountPosts posts={account?.posts || []}/>
        </div>
    </>

}




export default Account;