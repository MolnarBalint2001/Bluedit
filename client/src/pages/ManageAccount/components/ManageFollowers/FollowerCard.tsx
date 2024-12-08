import {memo} from "react";
import {Button} from "primereact/button";


type FollowerCardProps = {
    data:any
}

export const FollowerCard = memo(() =>{


    return <div className={"flex items-center justify-between w-full"}>
        <div className={"flex items-center gap-2"}>
            <img
                src={"https://megaport.hu/media/king-include/uploads/2023/10/906363-female-avatar-profile-picture-013.jpg"}
                className={"rounded-full"} width={48}/>
            <div>
                <div className={"font-semibold"}>test1</div>
                <div>test1@gmail.com</div>
            </div>
        </div>


        <Button icon={"pi pi-ban"} severity={"danger"} text tooltip={"Remove follower"} tooltipOptions={{position:"bottom"}}/>
    </div>


});