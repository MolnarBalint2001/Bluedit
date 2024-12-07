import {OverlayPanel} from "primereact/overlaypanel";
import {forwardRef} from "react";
import {useAppSelector} from "../../store/hooks.ts";
import {Button} from "primereact/button";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";
import {routes} from "../../config/routes.ts";


type UserProfileProps = {

}

export const UserProfile = forwardRef<OverlayPanel, UserProfileProps>((props, ref) => {

    //Cookie
    const [cookie, setCookie, removeCookie] = useCookies(["AUTH_TOKEN"]);

    //Redux
    const user = useAppSelector(state=>state.auth.user);

    //Navigation
    const navigate = useNavigate();

    const signout = () =>{
        removeCookie("AUTH_TOKEN");
    }

    return <OverlayPanel ref={ref} style={{height:"auto", width:300}} className={"flex flex-col"}>
        <div className={"font-semibold"}>Account information</div>
        <div className={"flex flex-col items-center gap-4 mt-5 h-full"}>
            <img src={"https://megaport.hu/media/king-include/uploads/2023/10/906363-female-avatar-profile-picture-013.jpg"} className={"rounded-full"} width={100} height={100}/>
            <div className={"flex-col flex items-center"}>
                <div className={"font-semibold"}>{user?.username}</div>
                <div>{user?.email}</div>
            </div>
        </div>
        <div className={"mt-4"}>
            <Button
                icon={"pi pi-cog"}
                size={"small"}
                label={"Manage your account"}
                text
                onClick={()=>navigate(routes.manageAccount)}
            ></Button>
            <Button
                icon={"pi pi-chevron-right"}
                size={"small"}
                severity={"danger"}
                label={"Sign out"}
                text onClick={signout}
            ></Button>
        </div>

    </OverlayPanel>

});