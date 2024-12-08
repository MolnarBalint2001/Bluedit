import {useAppSelector} from "../../store/hooks.ts";
import {Badge} from 'primereact/badge';
import {ManageFollowers} from "./components/ManageFollowers/ManageFollowers.tsx";
import {ManagePosts} from "./components/ManagePosts/ManagePosts.tsx";
import {AccountInformation} from "./components/AccountInformation/AccountInformation.tsx";
import {useManageAccount} from "./hooks/useManageAccount.tsx";


const ManageAccount = () => {

    const user = useAppSelector(state => state.auth.user);

    const {

    } = useManageAccount();

    return <>
        <div className={"w-full h-full flex flex-col items-center"}>
            <div className={"flex items-center gap-10 w-full"}>
                <img
                    src={"https://megaport.hu/media/king-include/uploads/2023/10/906363-female-avatar-profile-picture-013.jpg"}
                    className={"rounded-full"} width={200}/>
                <div>
                    <div className="text-2xl font-semibold">{user?.username}</div>
                    <div>{user?.email}</div>
                    <div className={"flex gap-2 mt-5"}>
                        <Badge value={"10 followers"}/>
                        <Badge value={"30 shared posts"} severity={"secondary"}/>
                        <Badge value={"3600 likes"} severity={"success"}/>
                    </div>
                </div>
            </div>


            <AccountInformation/>
            <ManageFollowers/>
            <ManagePosts/>
        </div>
    </>

}


export default ManageAccount;