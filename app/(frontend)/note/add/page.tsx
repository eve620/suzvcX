"use client"
import {useRouter} from "next/navigation";
import Editor from "@/app/components/quill/Editor";
import Back from "@/app/components/Back";
import {FieldValues, SubmitHandler, useController, useForm} from "react-hook-form";
import ReactQuill from "react-quill";
import Viewer from "@/app/components/quill/Viewer";
import 'react-quill/dist/quill.snow.css';

export default function Page() {
    const router = useRouter()
    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: {errors,}
    } = useForm<FieldValues>({
        defaultValues: {
            value: ""
        }
    })
    const {field} = useController({
        name: 'value', // 表单字段名
        control,
    });
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log(data)
    }
    const value = watch("value")
    return (
        <div className={"flex flex-col flex-1 w-full"}>
            <Back url={"/note"}></Back>
            <form className={"flex flex-1 gap-2 flex-col bg-white p-5 border-2 border-black rounded"}>
                <div>
                    <div className={"text-sm font-bold"}>标题</div>
                    <input className={"border-2 rounded pl-1"}/>
                </div>
                <div>
                    <div className={"text-sm"}>内容</div>
                    <div className={"flex w-full"}>
                        <div className={"w-1/2"}>
                            <Editor field={field}/>
                        </div>
                        <div className={"p-4 pt-2 w-1/2 border-2"}>
                            <div className={"font-bold text-sm italic underline pb-1"}>Preview</div>
                            <Viewer value={value}/>
                        </div>
                    </div>
                </div>
                <button className={"m-5 p-1 bg-pink-500"}
                        onClick={handleSubmit(onSubmit)}>保存
                </button>
            </form>
        </div>
    )
}