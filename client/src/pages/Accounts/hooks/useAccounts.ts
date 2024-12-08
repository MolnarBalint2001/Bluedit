import {getApi} from "../../../config/api.ts";
import {useQuery} from "react-query";

export const useAccounts = () =>{

    const fetchAccounts = async () =>{
        const response = await getApi().get("/account");
        return response?.data;
    }

    const {data, isLoading, error, refetch} = useQuery("accounts", {
        queryFn:fetchAccounts
    });





    return {
        data,
        isLoading,
        error,
        refetch
    }
}