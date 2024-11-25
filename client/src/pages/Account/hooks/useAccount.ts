import {useCallback, useEffect, useState} from "react";
import {AccountType} from "../@types/account.type.ts";
import {useParams} from "react-router-dom";
import {getApi} from "../../../config/api.ts";


export const useAccount = () =>{

    //States
    const [account, setAccount] = useState<AccountType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);


    //Params
    const {id} = useParams();

    const getAccountInfo = useCallback(async ()=>{
        try{
            const response = await getApi().get(`/account/${id}`);
            setAccount(response.data);
        }
        catch (e){

        }
        finally {
            setTimeout(()=>{
                setLoading(false);
            }, 500);

        }

    }, [id]);


    useEffect(()=>{
        getAccountInfo();
    },[id]);

    return {
        account,
        loading
    }


}