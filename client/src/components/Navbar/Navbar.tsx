import {memo, useRef} from "react";
import {Button} from "primereact/button";
import {Avatar} from "primereact/avatar";
import Logo from "../../assets/logo.png";
import {useNavigate} from "react-router-dom";
import {routes} from "../../config/routes.ts";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {OverlayPanel} from "primereact/overlaypanel";
import {UserProfile} from "../UserProfile/UserProfile.tsx";


export const Navbar = memo(() => {


    //Ref
    const userProfileRef = useRef<OverlayPanel>(null);

    //Redux
    const user = useAppSelector(state=>state.auth.user);

    // Navigation
    const navigate = useNavigate();

    //Redux
    const dispatch = useAppDispatch();


    return <div className={"flex items-center px-6 py-4 justify-between fixed w-full h-[60px] z-50 shadow-sm"}>
        <div className={"flex gap-2"}>
            <img src={Logo} alt={"Logo"} onClick={()=>navigate(routes.posts)} className={"cursor-pointer"}/>
        </div>
        <div className={"flex gap-2"}>

            <Button visible={user === null} icon="pi pi-sign-in" iconPos={"right"} label={"Sign in"} size={"small"} onClick={()=>navigate(routes.signin)}/>
            <Button visible={user === null} icon="pi pi-user-plus" iconPos={"right"} label={"Sign up"} text={true} size={"small"} onClick={()=>navigate(routes.signup)}/>
            <Avatar label={user?.username?.slice(0,2).toUpperCase()} size="normal" shape="circle" onClick={(e)=>userProfileRef.current?.toggle(e)}/>
            <UserProfile ref={userProfileRef}/>
        </div>
    </div>


})