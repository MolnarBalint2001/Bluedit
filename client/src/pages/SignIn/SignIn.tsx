import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {useNavigate} from "react-router-dom";
import {routes} from "../../config/routes.ts";
import {Card} from "primereact/card";
import {useRef, useState} from "react";
import validator from 'validator';
import {getApi} from "../../config/api.ts";
import {useFormik} from "formik";
import {Toast} from "primereact/toast";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {setUser} from "../../store/auth/auth.slice.ts";
import {useCookies} from "react-cookie";
import {PasswordInput} from "../../components/PasswordInput/PasswordInput.tsx";
import {toast} from "react-toastify";

const SignIn = () => {

    const [cookie, setCookie] = useCookies(["AUTH_TOKEN"]);

    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

    const emailRef = useRef<HTMLInputElement>(null);
    const toastRef = useRef<Toast>(null);

    const dispatch = useAppDispatch();

    const user = useAppSelector(state=>state.auth.user);



    const formik:any = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate: (data) => {
            let errors:any = {};

            if (!data.email || data.email?.length === 0) {
                errors["email"] = 'Email is required.';
            }
            else{
                const emailIsValid = validator.isEmail(data.email);
                if (!emailIsValid){
                    errors["email"] = "Email is not valid."
                }
            }

            if (!data.password || data.password?.length === 0){
                errors["password"] = 'Password is required.';
            }

            return errors;
        },
        onSubmit: async (data) => {
            setLoading(true);
            try{
                const response = await getApi().post("/auth/signin", JSON.stringify(data));
                if (response.status === 200){
                    toast.success("Authenticated successfully.")
                    const data = response.data;
                    dispatch(setUser(data));
                    setTimeout(()=>toast.success("Redictering..."), 100)
                    setTimeout(()=>{
                        navigate(routes.posts);
                    }, 500);
                }
            }
            catch (e:any){
                const message = e.response.data.message;
                toastRef.current?.show({
                    detail:message,
                    severity:"error",
                    summary:"Sign in"
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

            <Card className={"w-[95%] sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[20%] border-[1px] border-border"}>
                <div className={"flex flex-col gap-6 items-center"}>

                    <div
                        className={"w-full p-4 rounded-lg gap-4 flex flex-col items-center text-white"}
                        style={{backgroundImage: "url(https://img.freepik.com/free-photo/botanical-leaves_23-2148121707.jpg?size=626&ext=jpg&ga=GA1.1.553209589.1729555200&semt=ais_hybrid)"}}
                    >
                        <i className={"pi pi-user text-4xl"}/>
                        <div className={"text-2xl"}>Sign In</div>
                    </div>

                    <form onSubmit={formik.handleSubmit} className={"w-full flex flex-col gap-8"}>
                        <div className="p-inputgroup flex-1">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-at"></i>
                        </span>
                            <InputText placeholder="Email" name={"email"} value={formik.values.email} onChange={formik.handleChange} inputMode={"email"} ref={emailRef} required/>
                        </div>
                        {getFormErrorMessage("email")}

                        <div className="p-inputgroup flex-1">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-lock"></i>
                        </span>
                            <PasswordInput
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                invalid={isFormFieldValid("password")}/>
                        </div>
                        {getFormErrorMessage("password")}

                        <Button loading={loading}
                                type={"submit"}
                                label={"Sign in"}
                                icon={"pi pi-sign-in"}
                                className={"w-full"}
                        />
                    </form>


                    <Button label={"Do not have an account yet? Sign up."} icon={"pi pi-question-circle"} link
                            onClick={() => navigate(routes.signup)}/>
                </div>
            </Card>


        </div>

        <Toast ref={toastRef}/>
    </>


}


export default SignIn;