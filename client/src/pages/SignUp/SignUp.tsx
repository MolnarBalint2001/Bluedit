import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {routes} from "../../config/routes.ts";
import {useNavigate} from "react-router-dom";
import {Card} from "primereact/card";
import {useRef, useState} from "react";
import {useFormik} from "formik";
import validator from "validator";
import {getApi} from "../../config/api.ts";
import {Toast} from "primereact/toast";


const SignUp = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [confirmVisible, setConfirmVisible] = useState<boolean>(false);
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

    const navigate = useNavigate();
    const toastRef = useRef<Toast>(null);


    const formik:any = useFormik({
        initialValues: {
            email: '',
            username:'',
            password: '',
            confirm: '',

        },
        validate: (data) => {
            let errors:any = {};

            if (!data.username){
                errors["username"] = 'Username is required.';
            }
            else{
                if (data.username.length < 4 || data.username.length > 50){
                    errors["username"] = "Username must be between 8 and 50 characters."
                 }
            }

            if (!data.email) {
                errors["email"] = 'Email is required.';
            }
            else{
                const emailIsValid = validator.isEmail(data.email);
                if (!emailIsValid){
                    errors["email"] = "Email is not valid."
                }
            }

            if (!data.password){
                errors["password"] = 'Password is required.';
            }
            else{
                if (data.password.length < 8 || data.password.length > 50){
                    errors["password"] = "Password must be between 8 and 50 characters.";
                }
            }

            if (data.confirm !== data.password){
                errors["confirm"] = "Password does not match.";
            }





            return errors;
        },
        onSubmit: async (data) => {
            setLoading(true);
            try{
                const response = await getApi().post("/auth/signup", JSON.stringify(data));
                if (response.status === 200) navigate(routes.posts)
            }
            catch (e:any){
                const message = e.response.data.message;
                toastRef.current?.show({
                    detail:message,
                    severity:"error",
                    summary:"Sign up"
                });
            }
            finally {
                setLoading(false)
            }
        }
    })

    const isFormFieldValid = (name:string) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name:string) => {
        return isFormFieldValid(name) && <small className="p-invalid">{formik.errors[name]}</small>;
    };

    return <>
        <div className={"w-full h-[100vh] flex items-center justify-center"}>

            <Card className={"w-[95%] sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[30%] border-[1px] border-gray-200"}>
                <div className={"flex flex-col gap-6 items-center"} >

                    <div className={"w-full rounded-lg p-4 flex flex-col text-white gap-4 items-center "} style={{backgroundImage: "url(https://st5.depositphotos.com/1000633/61687/i/450/depositphotos_616877634-stock-photo-antelope-canyon-sunny-day-page.jpg)"}}>
                        <i className={"pi pi-user-plus text-4xl"}/>
                        <div className={"text-2xl"}>Sign up</div>
                    </div>

                    <form className={"w-full flex flex-col gap-4"} onSubmit={formik.handleSubmit} >
                        <div className="p-inputgroup flex-1">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-user"></i>
                        </span>
                            <InputText name={"username"} placeholder="Username" required={true} value={formik.values.username} onChange={formik.handleChange}/>
                        </div>
                        {getFormErrorMessage("username")}

                        <div className="p-inputgroup flex-1">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-at"></i>
                        </span>
                            <InputText name={"email"} placeholder="Email" required={true}  value={formik.values.email} onChange={formik.handleChange}/>
                        </div>
                        {getFormErrorMessage("email")}

                        <div className="p-inputgroup flex-1">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-lock"></i>
                        </span>
                            <InputText name={"password"} type={passwordVisible ? "text" : "password"} placeholder="Password" required={true}  value={formik.values.password} onChange={formik.handleChange}/>
                            <Button icon={"pi pi-eye"} severity={"secondary"} onClick={()=>setPasswordVisible(prevState => !prevState)} />
                        </div>
                        {getFormErrorMessage("password")}

                        <div className="p-inputgroup flex-1">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-lock"></i>
                        </span>
                            <InputText name={"confirm"} type={confirmVisible ? "text" : "password"} placeholder="Confirm password" required={true}  value={formik.values.confirm} onChange={formik.handleChange}/>
                            <Button icon={"pi pi-eye"} severity={"secondary"} onClick={()=>setConfirmVisible(prevState => !prevState)} />
                        </div>
                        {getFormErrorMessage("confirm")}

                        <Button label={"Sign up"} icon={"pi pi-user-plus"} className={"w-full"} severity={"warning"} type={"submit"} loading={loading}/>
                    </form>

                    <Button label={"Already have an account? Sign in."} icon={"pi pi-question-circle"} link
                            onClick={() => navigate(routes.signin)}/>
                </div>
            </Card>
        </div>

        <Toast ref={toastRef}/>
    </>

}


export default SignUp;