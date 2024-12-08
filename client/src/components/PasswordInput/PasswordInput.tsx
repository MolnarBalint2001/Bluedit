import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {memo, useState} from "react";


type PasswordInputProps = {
    value: any,
    onChange:any,
    invalid:boolean

}
export const PasswordInput = memo((props:PasswordInputProps) =>{


    const [visible, setVisible] = useState<boolean>(false);

    return <>
        <InputText
            name={"password"}
            placeholder="Password"
            type={visible ? "text" : "password"}
            value={props.value}
            onChange={props.onChange}
            required
            invalid={props.invalid}/>
        <Button
            icon={"pi pi-eye"}
            tooltip={"Show password"}
            severity={"secondary"}
            onClick={()=>setVisible(prevState => !prevState)}/>
    </>

});