import {Outlet} from "react-router-dom";
import {Navbar} from "../Navbar/Navbar.tsx";
import {Menu} from "../Menu/Menu.tsx";
import {useAuth} from "../../hooks/auth.ts";
import {ScrollTopButton} from "../ScrollTopBtn/ScrollTopButton.tsx";
import { ToastContainer } from 'react-toastify';



const Layout = () => {


    useAuth();

    return <>
        <Navbar/>
        <Menu/>
        <div className={"translate-y-[80px]"}>
            <div className={"mx-auto w-[35%] 2xl:w-[25%]"}>
                <Outlet/>
            </div>
        </div>
        <ScrollTopButton/>
        <ToastContainer position={"bottom-right"} autoClose={5000} newestOnTop={true} theme={"dark"}/>
    </>
}


export default Layout;