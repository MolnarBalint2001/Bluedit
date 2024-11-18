import {memo} from "react";
import {Button} from "primereact/button";
import {Avatar} from "primereact/avatar";
import Logo from "../../assets/logo.png";
import {InputText} from "primereact/inputtext";
import {IconField} from "primereact/iconfield";
import {InputIcon} from "primereact/inputicon";
import {useNavigate} from "react-router-dom";
import {routes} from "../../config/routes.ts";
import {useAppDispatch} from "../../store/hooks.ts";
import {toggleMenu} from "../../store/menu/menu.slice.ts";


export const Navbar = memo(() => {


    const navigate = useNavigate();
    const dispatch = useAppDispatch();


    return <div className={"flex items-center px-6 py-4 justify-between fixed w-full h-[60px] z-50 bg-gray-100 shadow-sm"}>
        <div className={"flex gap-2"}>
            <Button icon="pi pi-bars" size={"small"} severity={"secondary"} text={true} onClick={()=>dispatch(toggleMenu())}/>
            <img src={Logo} alt={"Logo"}/>
        </div>
        <IconField iconPosition={"left"} className={"w-[1000px]"}>
            <InputIcon className="pi pi-search"></InputIcon>
            <InputText placeholder={"Search on Bluedit"} className={"w-full"}/>
        </IconField>

        <div className={"flex gap-2"}>
            <Button icon="pi pi-sign-in" iconPos={"right"} label={"Sign in"} size={"small"} onClick={()=>navigate(routes.signin)}/>
            <Button icon="pi pi-user-plus" iconPos={"right"} label={"Sign up"} text={true} size={"small"} onClick={()=>navigate(routes.signup)}/>
            <Avatar label="P" size="large" shape="circle"/>
        </div>
    </div>


})