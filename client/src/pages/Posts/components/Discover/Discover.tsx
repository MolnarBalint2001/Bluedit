import {memo, useCallback, useEffect, useState} from "react";
import {Button} from "primereact/button";
import {DiscoverAccountsType} from "../../../../@types/discoverAccounts.type.ts";
import {getApi} from "../../../../config/api.ts";
import {Avatar} from "primereact/avatar";
import {useNavigate} from "react-router-dom";
import {routes} from "../../../../config/routes.ts";
import {Skeleton} from "primereact/skeleton";


export const Discover = memo(() => {


    const [loading, setLoading] = useState<boolean>(true);
    const [accounts, setAccounts] = useState<DiscoverAccountsType[]>([]);
    const navigate = useNavigate();

    const topFiveAccounts = useCallback(async () => {

        try {
            const response = await getApi().get("account/top-accounts");
            setAccounts(response.data);
        } catch (e) {
            console.error(e);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 300);
        }
    }, []);


    useEffect(() => {
        topFiveAccounts();
    }, []);

    return <div className={"flex flex-col gap-2 w-full"}>
        <div className={"text-xl font-semibold"}>Discover members</div>
        <div className={"flex items-center"}>
            {
                loading ? Array.from([0, 1, 2, 3]).map((e, index) => {
                        const transAmount = index * -15;
                        return <Skeleton key={index} shape={"circle"} size={"48px"} className={"shadow-lg"}
                                         style={{transform:`translateX(${transAmount}px)`}}/>
                    }) :

                    (accounts.map((e, index) => {
                        const transAmount = index * -15;
                        if (!loading) {

                        }
                        return <Avatar key={index} style={{transform: `translateX(${transAmount}px)`}}
                                       label={e.username.slice(0, 2).toUpperCase()} size={"large"} shape={"circle"}
                                       className={"shadow-lg"}/>
                    }))
            }
            <Button label={"Discover"} style={{transform: `translateX(-${accounts.length * 10}px)`}}
                    severity={"secondary"} icon={"pi pi-search"} rounded size={"small"}
                    onClick={() => navigate(routes.accounts)}/>
        </div>

    </div>

});