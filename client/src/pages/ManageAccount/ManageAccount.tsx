import {useAppSelector} from "../../store/hooks.ts";
import {Badge} from 'primereact/badge';
import {InputText} from "primereact/inputtext";
import {Divider} from "primereact/divider";
import {FileUpload} from "primereact/fileupload";
import {getApi} from "../../config/api.ts";
import {useEffect} from "react";


const items = [
    {title: "Post1"},
    {title: "Post2"},
    {title: "Post3"},
    {title: "Post4"},
    {title: "Post5"},
    {title: "Post6"},
    {title: "Post7"},
    {title: "Post8"},
    {title: "Post9"},
    {title: "Post10"}
]

const ManageAccount = () =>{

    const user = useAppSelector(state=>state.auth.user);


    useEffect(()=>{
        getFollowers();
    },[]);

    const getFollowers = async () =>{
        try{
            const response = await getApi().get("/follow");
            console.log(response)
        }
        catch (e){
            console.error(e);
        }
    }

    return <>
        <div className={"w-full h-full flex flex-col items-center"}>
            <div className={"flex items-center gap-10 w-[50%]"}>
                <img src={"https://megaport.hu/media/king-include/uploads/2023/10/906363-female-avatar-profile-picture-013.jpg"} className={"rounded-full"} width={200}/>
                <div>
                    <div className="text-2xl font-semibold">{user?.username}</div>
                    <div>{user?.email}</div>
                    <div className={"flex gap-2 mt-5"}>
                        <Badge value={"10 followers"}/>
                        <Badge value={"30 shared posts"} severity={"secondary"}/>
                        <Badge value={"3600 likes"} severity={"success"}/>
                    </div>
                </div>
            </div>

            <div className={"w-[50%] mt-4"}>
                <div className={"font-semibold text-xl"}>Account information</div>
                <Divider/>
                <div className={"flex gap-2"}>
                    <form className={"w-[50%]"}>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="username">Username</label>
                            <InputText id="username" aria-describedby="username-help" defaultValue={user?.username}/>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="username">Current password</label>
                            <InputText id="username" aria-describedby="username-help"/>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="username">New password</label>
                            <InputText id="username" aria-describedby="username-help" />
                        </div>

                    </form>

                    <div>
                        <div>Change profile picture</div>
                        <FileUpload mode="basic" name="demo[]" className={"mt-2"} url="/api/upload" accept="image/*" maxFileSize={1000000} />
                    </div>
                </div>

            </div>

            <div className={"w-[50%] mt-4"}>
                <div className={"font-semibold text-xl"}>Manage followers</div>
                <Divider/>
            </div>

        </div>
    </>

}



export default ManageAccount;