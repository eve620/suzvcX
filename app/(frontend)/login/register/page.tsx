"use client"

import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import Input from "@/app/components/Input";
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod";
import showMessage from "@/app/components/Message";

const schema = z.object({
    name: z.string().min(1, {message: "required"}).max(10, {message: "<=10"}),
    password: z.string().min(6, {message: ">=6"}).max(16, {message: "<=16"})
})

export default function RegisterPage() {
    const {
        register,
        handleSubmit,
        formState: {errors,}
    } = useForm<FieldValues>({
        defaultValues: {
            name:"",
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
        }
    }
    return (
        <main className="font-bold w-48">
            <div>register page</div>
            <Input label={"用户名"} id={"name"} register={register} errors={errors}/>
            <Input label={"密码"} id={"password"} register={register} errors={errors}/>
            <button onClick={handleSubmit(onSubmit)}>submit</button>
        </main>
    );
}
