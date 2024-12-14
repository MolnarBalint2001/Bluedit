import {getApi} from "../../../config/api.ts";
import {useQuery} from "react-query";
import {useMemo, useState} from "react";
import {AccountType} from "../../../@types/account.type.ts";

export const useAccounts = () =>{


    const [query, setQuery] = useState<string>("");

    const fetchAccounts = async () =>{
        const response = await getApi().get("/account");
        return response?.data;
    }

    const {data, isLoading, error, refetch} = useQuery("accounts", {
        queryFn:fetchAccounts
    });


    const filtered = useMemo(()=>{
        return data?.filter((x:AccountType)=>{
            return (x.username.includes(query) || x.email.includes(query));
        })
    },[query, data]);


    return {
        data,
        isLoading,
        error,
        refetch,
        filtered,
        setQuery
    }
}