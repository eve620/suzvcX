"use client"
import {useRouter} from "next/navigation";
import Editor from "@/app/components/quill/Editor";
import Back from "@/app/components/Back";
import {FieldValues, useController, useForm} from "react-hook-form";
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
    const { field } = useController({
        name: 'value', // 表单字段名
        control,
    });
    const value = watch("value")
    return (
        <div className={"flex flex-col flex-1 w-full"}>
            <Back url={"/note"}></Back>
            <div className={"bg-white flex-1 relative"}>
                <ReactQuill className={"w-full"}
                    ref={field.ref}
                    onChange={(content, delta, source, editor) => {
                        field.onChange(content);
                    }}
                />
                <Viewer value={value}/>
                <button className={"absolute right-0 bottom-0 m-5 p-1 bg-pink-500"}>保存</button>
            </div>
        </div>
    )
}