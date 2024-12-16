import {useAppSelector} from "../../store/hooks.ts";
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
            <AccountInformation/>
            <ManageFollowers/>
            <ManagePosts/>
        </div>
    </>

}


export default ManageAccount;