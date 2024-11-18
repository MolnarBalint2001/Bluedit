import {Button} from "primereact/button";
import {useNavigate} from "react-router-dom";
import {routes} from "../../config/routes.ts";


const NotFound = () =>{

    const navigate = useNavigate();


    return <>
        <div className={"h-full w-full flex items-center justify-center"}>
            <div className={"flex flex-col items-center gap-4 h-full mt-[30vh]"}>
                <div className={"text-6xl font-bold"}>404</div>
                <div className={"text-4xl font-semibold"}>Page Not Found</div>
                <Button icon={"pi pi-arrow-left"} link={true} label={"Go back home"} onClick={()=>navigate(routes.posts)}/>
            </div>
        </div>
    </>
}


export default NotFound;