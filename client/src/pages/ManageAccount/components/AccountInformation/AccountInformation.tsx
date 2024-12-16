import {Divider} from "primereact/divider";
import {InputText} from "primereact/inputtext";
import {useCallback, useEffect, useRef, useState} from "react";
import {getApi} from "../../../../config/api.ts";
import {Button} from "primereact/button";
import AnimateHeight from "react-animate-height";
import {ColorPicker} from "primereact/colorpicker";
import {AccountAvatar} from "../../../../components/AccountAvatar/AccountAvatar.tsx";
import {useAppDispatch} from "../../../../store/hooks.ts";


export const AccountInformation = () =>{


    const [accountInfo, setAccountInfo] = useState<any>(null);
    const [opened, setOpened] = useState<boolean>(false);
    const [color, setColor] = useState<any>(accountInfo?.profileColor);



    const dispatch = useAppDispatch();

    const colorRef = useRef<ColorPicker>(null);
    const usernameRef = useRef<HTMLInputElement>(null);


    const updateProfile = useCallback(async () =>{
        const username = usernameRef.current?.value;

        const data = JSON.stringify(
            {username:username, profileColor:`#${color}`}
        );
        try{
            const response = await getApi().put(`account?accountId=${accountInfo._id}`, data);
            setAccountInfo(response.data);
            dispatch(updateUserData({username:response.data.username, profileColor:response.data.profileColor}));
        }
        catch (e){

        }
    },[color, accountInfo])


    const getCurrentAccount = useCallback(async () =>{
        try{
            const response = await getApi().get("account/logged-in-account");
            setAccountInfo(response.data);
        }
        catch (e){

        }
    },[]);


    useEffect(()=>{
        getCurrentAccount();
    },[]);




    return  <div className={"w-full"}>

        <div className={"flex items-center gap-10 w-full"}>
            <AccountAvatar username={accountInfo?.username || ""} size={"xlarge"} color={accountInfo?.profileColor}/>
            <div>
                <div className="text-2xl font-semibold">{accountInfo?.username}</div>
                <div>{accountInfo?.email}</div>
                <div className={"text-secondaryText text-sm"}>Member since {new Date(accountInfo?.created).toDateString()}</div>
            </div>
        </div>


        <div className={"flex items-center mt-4"}>
            <Button icon={`pi ${opened ? "pi-chevron-up" : "pi-chevron-down"}`} text rounded severity={"secondary"} onClick={()=>{
                setOpened(prevState => !prevState)
            }}/>
            <div className={"font-semibold text-xl"}>Account information</div>
        </div>

        <Divider/>
        <AnimateHeight height={opened ? "auto" : 0} duration={300}>
            <div className={"flex gap-3"}>

                <div className={"w-[50%] flex flex-col gap-2"}>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="email">Email</label>
                        <InputText id="email" aria-describedby="email-help" readOnly={true} defaultValue={accountInfo?.email}/>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="username">Username</label>
                        <InputText ref={usernameRef} id="username" aria-describedby="username-help" defaultValue={accountInfo?.username}/>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="profileColor">Profile color</label>
                        <ColorPicker ref={colorRef} format={"hex"} value={color} onChange={(e)=>setColor(e.value)}/>
                    </div>
                    <Button label={"Update profile"} icon={"pi pi-pencil"} size={"small"} className={"w-[200px]"} onClick={updateProfile}/>
                </div>

            </div>
        </AnimateHeight>


    </div>

}