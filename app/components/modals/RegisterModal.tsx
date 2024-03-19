"use client"
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "@/app/components/modals/Modal";
import Input from "@/app/components/Input";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import showMessage from "@/app/components/Message";

const schema = z.object({
    name: z.string().min(1, {message: "required"}).max(10, {message: "<=10"}),
    password: z.string().min(6, {message: ">=6"}).max(16, {message: "<=16"})
})

const RegisterModal = () => {
    const registerModal = useRegisterModal()
    const {
        register,
        handleSubmit,
        formState: {errors,}
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            password: ""
        },
        resolver: zodResolver(schema)
    });
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const user = await fetch("http://localhost:3000/api/auth/register", {
            method: "POST",
            body: JSON.stringify(data)
        })
        if (user.ok) {
            showMessage("注册成功")
            registerModal.onClose()
        }
    }
    const bodyContent = (
        <div className={"flex flex-col items-center gap-8"}>
            <Input label={"用户名"} id={"name"} register={register} errors={errors}/>
            <Input label={"密码"} id={"password"} register={register} errors={errors}/>
        </div>
    )
    return (<Modal isOpen={registerModal.isOpen}
                   onClose={registerModal.onClose}
                   onSubmit={handleSubmit(onSubmit)}
                   body={bodyContent}
                   actionLabel={"注册"}/>
    )
}
export default RegisterModal