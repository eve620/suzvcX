"use client"
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "@/app/components/modals/Modal";
import FormInput from "@/app/components/FormInput";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import showMessage from "@/app/components/Message";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";

const schema = z.object({
    username: z.string()
        .min(1, {message: "请输入用户名"})
        .max(10, {message: "用户名长度需小于10位"})
        .regex(/^[^\s<>{}\[\]]+$/, {message: "用户名不能包含特殊符号"}),
    account: z.string()
        .min(1, {message: "请输入账号"})
        .max(12, {message: "账号长度需小于12位"})
        .regex(/^[a-zA-Z0-9]+$/, {message: "账号只能包含字母和数字"}),
    password: z.string().min(6, {message: "密码需大于6位"}).max(16, {message: "密码需小于16位"})
})

const RegisterModal = () => {
    const registerModal = useRegisterModal()
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            username: "",
            account: "",
            password: ""
        },
        resolver: zodResolver(schema)
    });
    // 注册并登录
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const user = await fetch("http://localhost:3000/api/auth/user"
            , {
                method: "POST",
                body: JSON.stringify(data)
            })
        if (user.ok) {
            showMessage("注册成功")
            registerModal.onClose()
            const response = await signIn('credentials', {
                name: data.account,
                password: data.password,
                redirect: false
            })
            if (!response?.error) {
                router.push("/")
                router.refresh()
            }
        } else {
            const message = await user.json()
            showMessage(message.error)
        }
    }
    const bodyContent = (
        <form className={"space-y-6"}>
            <FormInput label={"用户名"} id={"username"} register={register} errors={errors}/>
            <FormInput label={"账号"} id={"account"} register={register} errors={errors}/>
            <FormInput label={"密码"} id={"password"} register={register} errors={errors}/>
        </form>
    )
    return (<Modal isOpen={registerModal.isOpen}
                   onClose={() => {
                       registerModal.onClose()
                       reset()
                   }}
                   onSubmit={handleSubmit(onSubmit)}
                   body={bodyContent}
                   actionLabel={"注册"}/>
    )
}
export default RegisterModal