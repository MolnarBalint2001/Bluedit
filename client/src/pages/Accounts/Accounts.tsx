import {Divider} from "primereact/divider";
import {AccountListItem} from "./components/AccountListItem.tsx";
import {IconField} from "primereact/iconfield";
import {InputIcon} from "primereact/inputicon";
import {InputText} from "primereact/inputtext";
import {useAccounts} from "./hooks/useAccounts.ts";
import {AccountListItemType} from "./@types/accountListItem.type.ts";
import {AccountsListSkeleton} from "./components/AccountsListSkeleton.tsx";
import {Button} from "primereact/button";


const Accounts = () => {


    const {
        data, isLoading, error, refetch,
        setQuery, filtered
    } = useAccounts();


    return <>
        <div className={"bg-secondary rounded-2xl shadow-md border-[1px] border-border p-4 w-full"}>
            <div className={"flex items-center justify-between"}>
                <div className={"font-semibold text-2xl"}>Accounts on Bluedit</div>
                <Button size={"small"} text onClick={()=>refetch()} icon={"pi pi-sync"} tooltip={"Sync accounts"}/>
            </div>

            <Divider/>
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search"></InputIcon>
                <InputText placeholder="Search" className={"w-full"} onChange={(e)=>setQuery(e.target.value)}/>
            </IconField>
            {isLoading ? <AccountsListSkeleton/> :
                <div className={"flex flex-col gap-4 mt-4"}>
                    {
                        filtered?.map((item: AccountListItemType) => {
                            return <AccountListItem key={item._id} data={item}/>
                        })
                    }
                </div>}
        </div>
    </>

}


export default Accounts;