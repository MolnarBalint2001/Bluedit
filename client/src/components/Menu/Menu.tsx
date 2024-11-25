import {memo} from "react";
import {Sidebar} from "primereact/sidebar";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {toggleMenu} from "../../store/menu/menu.slice.ts";
import {routes} from "../../config/routes.ts";
import {Button} from "primereact/button";
import {useNavigate} from "react-router-dom";



const nodes = [
        {
                key:1,
                displayName:"Posts",
                route: routes.posts
        },
        {
                key:2,
                displayName:"Manage account",
                route: routes.manageAccount,
        }
]

export const Menu = memo(() =>{


        const navigate = useNavigate();

        const dispatch = useAppDispatch();
        const opened = useAppSelector(state=>state.menu.opened);

        return <Sidebar visible={opened} onHide={()=>dispatch(toggleMenu())} position={"left"}>
                <div className={"flex flex-col items-start w-full h-[95%] py-2 gap-2"}>
                        {
                                nodes.map((e)=>{
                                        return <Button
                                            key={e.key}
                                            text={true}
                                            label={e.displayName}
                                            severity={"secondary"}
                                            onClick={()=>navigate(e.route)}
                                        />
                                })
                        }


                </div>
                <div className={""}>
                        Bluedit - Version 1.0.0
                </div>
        </Sidebar>

});