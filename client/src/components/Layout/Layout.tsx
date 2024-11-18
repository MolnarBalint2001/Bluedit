import {Outlet} from "react-router-dom";
import {Navbar} from "../Navbar/Navbar.tsx";
import {Menu} from "../Menu/Menu.tsx";
import {useAuth} from "../../hooks/auth.ts";


const Layout = () =>{


    useAuth();

    return <>
        <Navbar/>
        <Menu/>
        <div className={"translate-y-[80px]"}>
            <Outlet/>
        </div>


    </>
}



export default Layout;