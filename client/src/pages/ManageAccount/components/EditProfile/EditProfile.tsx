import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {useState} from "react";
import {InputText} from "primereact/inputtext";


type EditProfileProps = {
    username:string,
    title:string,
}

export const EditProfile = ({username, title}:EditProfileProps) =>{


    const [visible, setVisible] = useState<boolean>(false);

    const editProfile = async ()=>{
        try{

        }
        catch (e){

        }
        finally {

        }
    };


    return <>
        <Button
            icon={"pi pi-pencil"}
            size={"small"}
            text
            tooltipOptions={{position:"bottom"}}
            tooltip={"Edit profile"}
            onClick={()=>setVisible(true)}
        />
        <Dialog header={"Edit account information"} className={"w-[50%]"} visible={visible} onHide={()=>{
            setVisible(false);
        }}>
            <div className={"flex flex-col gap-4"}>
                <InputText/>
                <InputText/>
                <Button icon={"pi pi-save"} severity={"success"} label={"Save"} className={"self-end"}/>
            </div>

        </Dialog>
    </>
}