"use client"

import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import Input from "@/app/components/Input";
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod";
import showMessage from "@/app/components/Message";

const schema = z.object({
    account: z.string().min(3, {message: "短了哥"}),
    password: z.string().min(6, {message: "短了哥"})
})

export default function RegisterPage() {
    const {
        register,
        handleSubmit,
        formState: {errors,}
    } = useForm<FieldValues>({
        defaultValues: {
            account: "",
            password: ""
        },
        resolver: zodResolver(schema)
    });
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const user = await fetch("api/auth/register", {
            method: "POST",
            body: JSON.stringify(data)
        })
        if (user.ok) {
            showMessage("注册成功")
        }
    }
    return (
        <main className="font-bold w-48">
            <div>register page</div>
            <Input label={"账户"} id={"account"} register={register} errors={errors}/>
            <Input label={"密码"} id={"password"} register={register} errors={errors}/>
            <button onClick={handleSubmit(onSubmit)}>submit</button>
        </main>
    );
}
