import {Button} from "primereact/button";
import {memo} from "react";


export const ScrollTopButton = memo(() =>{


    const scrollTop = () =>{
        window.scrollTo({
            top:0,
            behavior:"smooth"
        });
    }

    return <Button icon={"pi pi-arrow-up"} rounded size={"small"} severity={"secondary"} tooltip={"Scroll top"} className={"fixed bottom-0 m-8 right-0"} tooltipOptions={{position:"left"}} onClick={scrollTop}/>

})