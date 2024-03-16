"use client"
import {useRouter} from "next/navigation";
import Back from "@/components/Back";

export default function Page() {
    const router = useRouter()
    return (
        <div className={"flex flex-col flex-1 w-full"}>
            <Back url={"/note"}></Back>
            <div className={"bg-white flex-1"}>edit</div>
        </div>
    )
}