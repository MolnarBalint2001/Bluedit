import {useCallback, useEffect} from "react";
import {getApi} from "../../../config/api.ts";
import {useAppDispatch, useAppSelector} from "../../../store/hooks.ts";
import {setManageAccount} from "../../../store/manageAccount/manageAccount.slice.ts";


export const useManageAccount = () =>{

    const user = useAppSelector(state=>state.auth.user);
    const dispatch = useAppDispatch();

    const getAccount = useCallback(async () =>{
        try{
            const response = await getApi().get(`/account/${user?.id}`);
            dispatch(setManageAccount(response.data));
        }
        catch (e){

        }
        finally {

        }
    },[user]);


    useEffect(()=>{
        getAccount();
    },[]);

    return {

    }
}