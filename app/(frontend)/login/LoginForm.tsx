"use client"
import {useRouter} from "next/navigation";
import {useState} from "react";
import showMessage from "@/app/components/Message";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {signIn} from "next-auth/react";
import {z} from "zod";
import useRegisterModal from "@/app/hooks/useRegisterModal";

const schema = z.object({
    name: z.string().min(1, {message: "required"}).max(10, {message: "<=10"}),
    password: z.string().min(6, {message: ">=6"}).max(16, {message: "<=16"})
})

export default function LoginForm() {
    const [isPasswordShow, setIsPasswordShow] = useState(false)
    // todo：重定向逻辑：修改的时候需要抽离client组件，获取session，如果有session直接重定向
    // todo：未登录不允许查看逻辑：使用next-auth middleware
    const router = useRouter()
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
    const showPwd = () => {
        setIsPasswordShow(!isPasswordShow)
    }

    return (
        <div className={"h-[435px] w-[39rem] mx-auto flex rounded bg-white shadow-2xl"}>
            <div className={"w-60 bg-cover rounded-l bg-[url('/login_bg.png')]"}></div>
            <div className={"w-96 flex flex-col items-center justify-center px-6"}>
                <div className={""}>
                    <h4 className={"text-2xl font-bold mb-8"}>Welcome to <span
                        className={"text-amber-600"}>Glog</span></h4>
                    <p className={"mb-4"}>Login to your account to enter the page</p>
                </div>
                <div className={"my-3 text-gray-600"}>
                    <input {...register("name")}
                           className={"w-56 outline-0 border-b-2 px-2 py-1 focus:outline-1"}
                           placeholder="account"/>
                </div>
                <div className={"relative my-3 text-gray-600"}>
                    <input {...register("password")}
                           type={`${isPasswordShow ? "text" : "password"}`}
                           className={"w-56 outline-0 border-b-2 pl-2 pr-8 py-1 focus:outline-1"}
                           placeholder="password"/>
                    <button className={"absolute right-2 top-2"} onClick={showPwd}>
                        {isPasswordShow ?
                            <svg className="icon" viewBox="0 0 1024 1024" width="20" height="20">
                                <path
                                    d="M942.3 486.4l-0.1-0.1-0.1-0.1c-36.4-76.7-80-138.7-130.7-186L760.7 351c43.7 40.2 81.5 93.7 114.1 160.9C791.5 684.2 673.4 766 512 766c-51.3 0-98.3-8.3-141.2-25.1l-54.7 54.7C374.6 823.8 439.8 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0.1-51.3zM878.3 154.2l-42.4-42.4c-3.1-3.1-8.2-3.1-11.3 0L707.8 228.5C649.4 200.2 584.2 186 512 186c-192.2 0-335.4 100.5-430.2 300.3v0.1c-7.7 16.2-7.7 35.2 0 51.5 36.4 76.7 80 138.7 130.7 186.1L111.8 824.5c-3.1 3.1-3.1 8.2 0 11.3l42.4 42.4c3.1 3.1 8.2 3.1 11.3 0l712.8-712.8c3.1-3 3.1-8.1 0-11.2zM398.9 537.4c-1.9-8.2-2.9-16.7-2.9-25.4 0-61.9 50.1-112 112-112 8.7 0 17.3 1 25.4 2.9L398.9 537.4z m184.5-184.5C560.5 342.1 535 336 508 336c-97.2 0-176 78.8-176 176 0 27 6.1 52.5 16.9 75.4L263.3 673c-43.7-40.2-81.5-93.7-114.1-160.9C232.6 339.8 350.7 258 512 258c51.3 0 98.3 8.3 141.2 25.1l-69.8 69.8z"
                                    fill="#515151"></path>
                                <path
                                    d="M508 624c-6.4 0-12.7-0.5-18.8-1.6l-51.1 51.1c21.4 9.3 45.1 14.4 69.9 14.4 97.2 0 176-78.8 176-176 0-24.8-5.1-48.5-14.4-69.9l-51.1 51.1c1 6.1 1.6 12.4 1.6 18.8C620 573.9 569.9 624 508 624z"
                                    fill="#515151"></path>
                            </svg> :
                            <svg className="icon" viewBox="0 0 1024 1024" width="20" height="20">
                                <path
                                    d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3-7.7 16.2-7.7 35.2 0 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766z"
                                    fill="#515151"></path>
                                <path
                                    d="M508 336c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176z m0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z"
                                    fill="#515151"></path>
                            </svg>
                        }
                    </button>
                </div>
                <div className={"self-end mt-10 mr-8"}>
                    <button onClick={handleSubmit(onSubmit)}
                            className={"block font-bold bg-amber-700 py-2 px-6 rounded-3xl text-white"}>
                        Log in
                    </button>
                    <a onClick={registerModal.onOpen}
                       className={"text-center block cursor-pointer underline text-cyan-600 hover:text-cyan-800 mt-1"}>register</a>
                </div>
            </div>
        </div>
    );
}