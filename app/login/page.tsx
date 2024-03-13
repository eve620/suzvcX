"use client"

import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import Input from "@/app/components/Input";
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod";
import {signIn} from "next-auth/react";
import {redirect, useRouter} from "next/navigation";

const schema = z.object({
    account: z.string().min(3, {message: "短了哥"}),
    password: z.string().min(6, {message: "短了哥"})
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
            account: "",
            password: ""
        },
        resolver: zodResolver(schema)
    });
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const response = await signIn('credentials', {
            ...data,
            redirect: false
        })
        console.log({response})
        if(!response?.error){
            router.push("/")
            router.refresh()
        }
    }
    return (
        <main className="font-bold w-48">
            <div>login page</div>
            <Input label={"账户"} id={"account"} register={register} errors={errors}/>
            <Input label={"密码"} id={"password"} register={register} errors={errors}/>
            <button onClick={handleSubmit(onSubmit)}>submit</button>
        </main>
    );
}
