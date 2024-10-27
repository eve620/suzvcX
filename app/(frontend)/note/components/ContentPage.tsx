"use client"
import Button from "@/app/components/Button";
import {useRouter} from "next/navigation";
import {createContext} from "react";
interface ContentPageProps{
    note:NoteContent
}
type NoteContent = {
    id:number,
    content:string,
    title:string,
    tags:string[]
}
const ContentPage:React.FC<ContentPageProps> = ({note}) => {
    const router = useRouter()
    return(
        <div>
            <div className="flex gap-4">
                        <span  className="flex flex-wrap text-gray-500 dark:text-gray-300 font-mono items-center gap-1.5 break-words text-2xl text-muted-foreground sm:gap-2.5">
                            <span className={"cursor-pointer"} onClick={()=>{router.push("/note")}}>Home</span><span className={"cursor-default select-none"}>/</span><span>aa</span>
                        </span>
                <div className={"flex-1"}></div>
                <Button label={"编辑"} onClick={() => {router.push("/note/1/edit")}}/>
                <Button label={"分享"} onClick={() => {}}/>
                <Button label={"删除"} type={"outline"} onClick={() => {}}/>
                <Button label={"返回"} type={"outline"} onClick={() => {router.push("/note")}}/>
            </div>
            <div>
                {note.id}
                {note.title}
                {note.content}
            </div>
        </div>
    )
}

export default ContentPage