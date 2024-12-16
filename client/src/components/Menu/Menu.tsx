import {memo} from "react";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {routes} from "../../config/routes.ts";
import {useNavigate} from "react-router-dom";
import {SpeedDial} from "primereact/speeddial";
import {Tooltip} from "primereact/tooltip";





const nodes = [
    {
        key: 1,
        displayName: "Posts",
        route: routes.posts
    },
    {
        key: 2,
        displayName: "Manage account",
        route: routes.manageAccount,
    }
]

export const Menu = memo(() => {

    const navigate = useNavigate();

    const items = [
        {
            label: 'Accounts',
            icon: 'pi pi-users',
            command: () => {
                navigate(routes.accounts);
            }
        },

        {
            label: 'Manage account',
            icon: 'pi pi-user',
            command: () => {
                navigate(routes.manageAccount)
            }
        },
        {
            label: 'Create new post',
            icon: 'pi pi-plus',
            command: () => {
                navigate(routes.newPost);
            }
        },
        {
            label: 'Posts',
            icon: 'pi pi-book',
            command: () => {
                navigate(routes.posts)
            }
        },

    ];

    const dispatch = useAppDispatch();
    const opened = useAppSelector(state => state.menu.opened);

    return <>
        <SpeedDial
            id={"speed-dial-menu"}
            className={"fixed m-4"}
            model={items}
            direction="right"
            style={{left: '0', top: "50%"}}
            type="semi-circle"
        />
        <Tooltip target="#speed-dial-menu .p-speeddial-action"/>
    </>
});