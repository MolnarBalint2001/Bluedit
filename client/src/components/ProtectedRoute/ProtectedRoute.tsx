import {useAppSelector} from "../../store/hooks.ts";
import {
    Outlet,

} from "react-router-dom";
import {routes} from "../../config/routes.ts";

export const ProtectedRoute = () =>{

    const user = useAppSelector(state=>state.auth.user);


    if (!user) window.location.href = routes.signin;


    return <Outlet/>


}