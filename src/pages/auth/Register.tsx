import Button from "../../components/Button.tsx";
import {useState} from "react";
import Input from "../../components/Input.tsx";
import {useRegister} from "../../hooks/mutation/useAuthentication.tsx";
import {notification} from "antd";
import {useAuth} from "../../store/context/AuthProvider.tsx";
import {useNavigate} from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();

    const {login} = useAuth();

    const {mutate: register, isPending} = useRegister();

    const initialFormData = {
        'email': '',
        'name': '',
        'password': '',
        'password_confirmation': ''
    };

    const [formData, setFormData] = useState(initialFormData);

    const onHandleChange = (key: string, value: string) => {
        setFormData({...formData, [key]: value});
    }

    const onSubmit = (e: any) => {
        e.preventDefault();
        register(formData, {
            onSuccess: (data) => {
                login(data.data.token, data.data.user)
                notification.success({message: "Account created successfully"})
                navigate('/');
            },
            onError: (error) => {
                notification.error({message: error?.message || "An error occurred creating account. Kindly try again"})
            }
        });
    }

    return (
        <>
            <div className={"w-full  flex justify-center mt-[30px] max-md:p-[0_16px]"}>
                <div className={"lg:w-[30%] w-full p-[24px]  rounded-[10px] bg-white"}>

                    <h3 className="text-[#101928] leading-[38.4px] text-[32px] font-bold font-[Lato] text-center">
                        Register
                    </h3>

                    <p className="text-[#667185] font-[Lato] text-[16px] font-normal text-center ">
                        Fill form to create account.
                    </p>

                    <form
                        className="w-full flex flex-col gap-[24px] justify-center h-full"
                        onSubmit={onSubmit}
                    >

                        <Input
                            type={"text"}
                            placeholder={"Enter Full Name"}
                            onChange={(value) => onHandleChange("name", value.target.value)}
                            label={""}
                            value={formData.name}
                            name={"name"}
                            required={true}
                            inputStyle="!border-[1px] !border-[#D0D5DD] !rounded-[12px] !h-[56px]"
                            customStyle="!h-[56px] !rounded-[12px] !placeholder:text-[#98A2B3] !text-[14px] !text-[#101928] !font-[Inter] !font-[400]"
                        />

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

                        <Input
                            type={"password"}
                            placeholder={"Enter Confirm Password"}
                            onChange={(value) => onHandleChange("password_confirmation", value.target.value)}
                            label={""}
                            value={formData.password_confirmation}
                            name={"password"}
                            required={true}
                            inputStyle="!border-[1px] !border-[#D0D5DD] !rounded-[12px] !h-[56px]"
                            customStyle="!h-[56px] !rounded-[12px] !placeholder:text-[#98A2B3] !text-[14px] !text-[#101928] !font-[Inter] !font-[400]"
                        />
                        <a className={"text-black text-[12px] font-semibold text-primary"} href={"/login"}>Already
                            have an
                            account?
                            Proceed to Login
                        </a>
                        <Button
                            label={"Create Account"}
                            loading={isPending}
                            disabled={isPending}
                            customStyle="!h-[55px] !rounded-[100px]"
                        />

                    </form>

                </div>
            </div>
        </>
    );
}
