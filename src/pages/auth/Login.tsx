import {useAuth} from "../../store/context/AuthProvider.tsx";
import {useLogin} from "../../hooks/mutation/useAuthentication.tsx";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {notification} from "antd";
import Input from "../../components/Input.tsx";
import Button from "../../components/Button.tsx";

export default function Login() {

    const navigate = useNavigate();

    const {login} = useAuth();

    const {mutate: userLogin, isPending} = useLogin();

    const initialFormData = {
        'email': '',
        'password': '',
    };

    const [formData, setFormData] = useState(initialFormData);

    const onHandleChange = (key: string, value: string) => {
        setFormData({...formData, [key]: value});
    }

    const onSubmit = (e: any) => {
        e.preventDefault();
        userLogin(formData, {
            onSuccess: (data) => {
                login(data.data.token, data.data.user)
                notification.success({message: "Account created successfully"})
                navigate('/');
            },
            onError: (error) => {
                notification.error({message: error?.message || "An error occurred accessing account. Kindly try again"})
            }
        });
    }

    return (
        <>
            <div className={"w-full  flex justify-center mt-[30px] max-md:p-[0_16px]"}>
                <div className={"lg:w-[30%] w-full p-[24px]  rounded-[10px] bg-white"}>

                    <h3 className="text-[#101928] leading-[38.4px] text-[32px] font-bold font-[Lato] text-center">
                        Log In
                    </h3>

                    <p className="text-[#667185] font-[Lato] text-[16px] font-normal text-center ">
                        Enter your Login credentials to access your account
                    </p>

                    <form
                        className="w-full flex flex-col gap-[24px] justify-center h-full"
                        onSubmit={onSubmit}
                    >

                        <Input
                            type={"email"}
                            placeholder={"Enter Email Address"}
                            onChange={(value) => onHandleChange("email", value.target.value)}
                            label={""}
                            value={formData.email}
                            name={"email"}
                            required={true}
                            inputStyle="!border-[1px] !border-[#D0D5DD] !rounded-[12px] !h-[56px]"
                            customStyle="!h-[56px] !rounded-[12px] !placeholder:text-[#98A2B3] !text-[14px] !text-[#101928] !font-[Inter] !font-[400]"
                        />


                        <Input
                            type={"password"}
                            placeholder={"Enter password"}
                            onChange={(value) => onHandleChange("password", value.target.value)}
                            label={""}
                            value={formData.password}
                            name={"password"}
                            required={true}
                            inputStyle="!border-[1px] !border-[#D0D5DD] !rounded-[12px] !h-[56px]"
                            customStyle="!h-[56px] !rounded-[12px] !placeholder:text-[#98A2B3] !text-[14px] !text-[#101928] !font-[Inter] !font-[400]"
                        />

                        <a className={"text-black text-[12px] font-semibold text-primary"} href={"/register"}>Already
                            have an
                            account?
                            Proceed to Register
                        </a>

                        <Button
                            label={"Login into Account"}
                            loading={isPending}
                            disabled={isPending}
                            customStyle="!h-[55px] !rounded-[100px]"
                        />

                    </form>

                </div>
            </div>
        </>
    )
}
