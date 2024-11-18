import {memo} from "react";
import {Sidebar} from "primereact/sidebar";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {toggleMenu} from "../../store/menu/menu.slice.ts";
import {Tree} from "primereact/tree";



const nodes = [
        {
                key: "0",
                label: 'Posts',
                icon: 'pi pi-fw pi-share-alt',
                children: [
                        {
                                key:"0-0",
                                label:"Nature",
                                icon: 'pi pi-fw pi-globe',
                        },
                        {
                                key:"0-1",
                                label:"Financial",
                                icon: 'pi pi-fw pi-euro',
                        },
                        {
                                key:"0-2",
                                label:"Tech",
                                icon: 'pi pi-fw pi-microchip-ai',
                        },
                        {
                                key:"0-3",
                                label:"Culture",
                                icon: 'pi pi-fw pi-building-columns',
                        },
                        {
                                key:"0-4",
                                label:"Gastronomy",
                                icon: 'pi pi-fw pi-book',
                        }
                ]

        },
        {
                key: "1",
                label: 'Manage own posts',
                icon: 'pi pi-fw pi-pencil',
        },
        {
                key: "2",
                label: 'Account settings',
                icon: 'pi pi-fw pi-cog',

        },
        {
                key: "3",
                label: 'Followers',
                icon: 'pi pi-fw pi-users',
                children:[
                        {
                                key:"3-0",
                                imgSrc:"",

                        }

                ]
        },

]

export const Menu = memo(() =>{


        const dispatch = useAppDispatch();
        const opened = useAppSelector(state=>state.menu.opened);

        return <Sidebar visible={opened} onHide={()=>dispatch(toggleMenu())} position={"left"}>
                <Tree value={nodes} className="w-full h-full"/>
        </Sidebar>

});