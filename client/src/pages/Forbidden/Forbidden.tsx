import {Button} from "primereact/button";
import {routes} from "../../config/routes.ts";
import {useNavigate} from "react-router-dom";


const Forbidden = () =>{

    const navigate = useNavigate();

    return <>
        <div className={"h-full w-full flex items-center justify-center"}>
            <div className={"flex flex-col items-center gap-4 h-full mt-[30vh]"}>
                <div className={"text-6xl font-bold text-red-500"}>403</div>
                <div className={"text-4xl font-semibold"}>Page Is Forbidden</div>
                <Button icon={"pi pi-arrow-left"} link={true} label={"Go back home"} onClick={()=>navigate(routes.posts)}/>
            </div>
        </div>
    </>

}

export default Forbidden;