"use client"
import {useRouter} from "next/navigation";
import Editor from "@/components/quill/Editor";
import Back from "@/components/Back";

export default function Page() {
    const router = useRouter()
    return (
        <div className={"flex flex-col flex-1 w-full"}>
            <Back url={"/note"}></Back>
            <div className={"bg-white flex-1 relative"}>
                <Editor/>
                <button className={"absolute right-0 bottom-0 m-5 p-1 bg-pink-500"}>保存</button>
            </div>
        </div>
    )
}