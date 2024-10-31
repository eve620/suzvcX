"use client"
import {useRouter, useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import showMessage from "@/app/components/Message";
import {signIn} from "next-auth/react";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Input from "@/app/components/Input";
import Password from "@/app/components/Password";

export default function LoginForm({params}) {
    const searchParams = useSearchParams().get('redirect');
    // todo：重定向逻辑：修改的时候需要抽离client组件，获取session，如果有session直接重定向
    // todo：未登录不允许查看逻辑：使用next-auth middleware
    const router = useRouter()
    const registerModal = useRegisterModal()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    useEffect(() => {
        if (searchParams) {
            showMessage("请先登录");
            router.replace('/login');
        }
    }, [searchParams, router]);
    const onLogin = async (e: any) => {
        e.preventDefault()
        if (username === "" || password === "") {
            showMessage("用户名或密码不能为空")
            return
        }
        const response = await signIn('credentials', {
            name: username,
            password: password,
            redirect: false
        })
        if (!response?.error) {
            router.push("/")
            router.refresh()
            showMessage("登陆成功！")
        } else {
            showMessage("用户名或密码错误")
        }
    }

    return (
        <div className={"h-[435px] w-[39rem] mx-auto flex rounded bg-white shadow-2xl"}>
            <div className={"w-60 bg-cover rounded-l bg-[url('/login_bg.png')]"}></div>
            <form className={"w-96 flex space-y-4 flex-col items-center justify-center px-6"}>
                <div className={"px-12 w-full"}>
                    <h4 className={"text-2xl font-bold mb-8 text-gray-600"}>欢迎来到 <span
                        className={"text-amber-600"}>Glog</span></h4>
                    <p className={"mb-4 pl-2 text-black font-bold tracking-wider"}>登录你的账号</p>
                </div>
                <Input value={username} onChange={(e) => {
                    setUsername(e.target.value)
                }} label={"用户名"} type={"focus"}/>
                <Password value={password} onChange={(e) => {
                    setPassword(e.target.value)
                }}/>
                <div className={"self-end pt-6 pr-8"}>
                    <button onClick={onLogin}
                            className={"block w-full font-bold bg-amber-700 py-2 px-6 rounded-3xl text-white"}>
                        登录
                    </button>
                    <div className={"pt-3 text-sm"}>
                        还没有账号？
                        <span onClick={registerModal.onOpen}
                              className={"text-center cursor-pointer text-cyan-600 hover:text-cyan-800 mt-1"}>注册</span>
                    </div>
                </div>
            </form>
        </div>
    );
}