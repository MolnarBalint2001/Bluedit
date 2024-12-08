import {Divider} from "primereact/divider";
import {FollowerCard} from "./FollowerCard.tsx";
import {Button} from "primereact/button";
import {useState} from "react";
import AnimateHeight from "react-animate-height";


export const ManageFollowers = () => {
    const [opened, setOpened] = useState<boolean>(false);

    return <div className={"w-full mt-4"}>

        <div className={"flex items-center gap-2"}>
            <Button icon={`pi ${opened ? "pi-chevron-up" : "pi-chevron-down"}`} text rounded severity={"secondary"} onClick={()=>{
                setOpened(prevState => !prevState)
            }}/>
            <div className={"font-semibold text-xl"}>Manage followers</div>
        </div>

        <Divider/>
        <AnimateHeight height={opened ? "auto" : 0} duration={300}>
            <div className={"flex flex-col gap-2"}>
                {
                    Array.from([1,2,3,4,5]).map((e)=>{
                        return <FollowerCard key={e}/>
                    })
                }
            </div>
        </AnimateHeight>


    </div>

}