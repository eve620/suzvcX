"use client"

import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import Input from "@/components/Input";
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod";
import {signIn} from "next-auth/react";
import {redirect, useRouter} from "next/navigation";
import showMessage from "@/components/Message";

const schema = z.object({
    name: z.string().min(1, {message: "required"}).max(10, {message: "<=10"}),
    password: z.string().min(6, {message: ">=6"}).max(16, {message: "<=16"})
})

export default function LoginPage() {
    // todo：重定向逻辑：修改的时候需要抽离client组件，获取session，如果有session直接重定向
    // todo：未登录不允许查看逻辑：使用next-auth middleware
    const router = useRouter()
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
        const response = await signIn('credentials', {
            ...data,
            redirect: false
        })
        if (!response?.error) {
            router.push("/")
            router.refresh()
            showMessage("登陆成功！")
        }
    }
    return (
        <main className="font-bold w-48">
            <div>login page</div>
            <Input label={"用户名"} id={"name"} register={register} errors={errors}/>
            <Input label={"密码"} id={"password"} register={register} errors={errors}/>
            <button onClick={handleSubmit(onSubmit)}>submit</button>
        </main>
    );
}
