import {useEffect} from "react";
import {useCookies} from "react-cookie";
import {routes} from "../config/routes.ts";
import {getApi} from "../config/api.ts";


export const useAuth = () =>{


    const [cookie, setCookie] = useCookies(["AUTH_TOKEN"]);


    useEffect(()=>{
        console.log("Lefutok")
        console.log(cookie)
        if (!cookie["AUTH_TOKEN"]){
            window.location.href = routes.signin;
        }

        getApi().defaults.headers.common["Authorization"] = "Bearer " + cookie.AUTH_TOKEN;

        console.log(getApi().defaults)
    },[cookie]);



}