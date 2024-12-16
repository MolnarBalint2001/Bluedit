import {Outlet,} from "react-router-dom";
import {routes} from "../../config/routes.ts";
import {useCookies} from "react-cookie";
import {useEffect} from "react";

export const ProtectedRoute = () =>{

    const [token] = useCookies(["AUTH_TOKEN"]);


    useEffect(()=>{
        if (!token) window.location.href = routes.signin;
    },[token])



    return <Outlet/>


}