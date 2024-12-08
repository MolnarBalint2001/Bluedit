import {Divider} from "primereact/divider";
import {InputText} from "primereact/inputtext";
import {FileUpload} from "primereact/fileupload";
import {useRef, useState} from "react";
import {getApi} from "../../../../config/api.ts";
import {useAppSelector} from "../../../../store/hooks.ts";
import {Button} from "primereact/button";
import AnimateHeight from "react-animate-height";


export const AccountInformation = () =>{


    const [opened, setOpened] = useState<boolean>(false);

    const user = useAppSelector(state => state.auth.user);

    const fileUploaderRef = useRef<FileUpload>(null)


    const customBase64Uploader = async (event: any) => {
        const file = event.files[0];
        const reader = new FileReader();
        let blob = await fetch(file.objectURL).then((r) => r.blob());

        reader.readAsDataURL(blob);

        reader.onloadend = function () {
            const base64Data = reader.result;
            const data = {
                fileContent: base64Data
            }
            getApi()
                .post("/account/upload-image", JSON.stringify(data))
                .then((res) => {
                    console.log(res)
                    fileUploaderRef.current?.clear();
                })
                .catch((e) => {

                });


        };


    }




    return   <div className={"w-full mt-4"}>
        <div className={"flex items-center"}>
            <Button icon={`pi ${opened ? "pi-chevron-up" : "pi-chevron-down"}`} text rounded severity={"secondary"} onClick={()=>{
                setOpened(prevState => !prevState)
            }}/>
            <div className={"font-semibold text-xl"}>Account information</div>
        </div>

        <Divider/>
        <AnimateHeight height={opened ? "auto" : 0} duration={300}>
            <div className={"flex gap-3"}>

                <form className={"w-[50%] flex flex-col gap-2"}>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="email">Email</label>
                        <InputText id="email" aria-describedby="username-help" readOnly={true} defaultValue={user?.email}/>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="username">Username</label>
                        <InputText id="username" aria-describedby="username-help" readOnly={true} defaultValue={user?.username}/>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="username">Title</label>
                        <InputText id="username" aria-describedby="username-help" readOnly={true} defaultValue={user?.title}/>
                    </div>

                </form>


                <div>
                    <div>Change profile picture</div>
                    <FileUpload
                        ref={fileUploaderRef}
                        mode="basic"
                        customUpload
                        className={"mt-2"}
                        accept="image/*"
                        maxFileSize={1000000}
                        uploadHandler={customBase64Uploader}
                    />
                </div>
            </div>
        </AnimateHeight>


    </div>

}