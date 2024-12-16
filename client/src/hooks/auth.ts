import {useEffect} from "react";
import {useCookies} from "react-cookie";
import {routes} from "../config/routes.ts";
import {getApi} from "../config/api.ts";
import {useAppSelector} from "../store/hooks.ts";


export const useAuth = () =>{


    const [cookie, setCookie] = useCookies(["AUTH_TOKEN"]);
    const user = useAppSelector(state=>state.auth.user)

    useEffect(()=>{
        console.log("Lefutok")
        console.log(cookie)
        console.log(user);
        if (!cookie["AUTH_TOKEN"]){
            window.location.href = routes.signin;
        }

        getApi().defaults.headers.common["Authorization"] = "Bearer " + cookie.AUTH_TOKEN;

        console.log(getApi().defaults)
    },[cookie]);



}