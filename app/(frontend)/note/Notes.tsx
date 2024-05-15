"use client"
import Link from "next/link";
import Back from "@/app/components/Back";
import Button from "@/app/components/Button";
import {useEffect, useState} from "react";
import showMessage from "@/app/components/Message";
import {useRouter} from "next/navigation";
import DirList from "@/app/(frontend)/note/components/DirList";
import AddDirButton from "@/app/(frontend)/note/components/AddDirButton";
import Viewer from "@/app/components/quill/Viewer";
import AddNote from "@/app/(frontend)/note/components/AddNote";

interface NotesProps {
    dir: string | undefined
    id: string | undefined
    dirMenu: any[]
    menu: any[]
}

const Notes: React.FC<NotesProps> = ({dir, id, dirMenu, menu}) => {
    const [isEdit, setIsEdit] = useState(false)
    const [isAddNote, setIsAddNote] = useState(false)
    const [dirList, setDirList] = useState<any[]>(dirMenu)
    const [contentList, setContentList] = useState<any[]>(menu)
    const router = useRouter()
    const refreshDir = async () => {
        const dirResponse = await fetch("/api/note/dir")
        if (dirResponse.ok) {
            setDirList(await dirResponse.json().then(data => data.data))
        }
    }
    useEffect(() => {
        setIsAddNote(false)
    }, [dir, id])
    const onDelete = async (id: number) => {
        const deleteDir = await fetch(`/api/note/dir?id=${id}`, {
            method: "DELETE",
        })
        if (deleteDir.ok) {
            if (dir === id.toString()) {
                router.push("/note")
            }
            const res = await deleteDir.json()
            await refreshDir()
            showMessage(res.message)
        } else {
            const res = await deleteDir.json()
            showMessage(res.message)
        }
    }
    return (
        <div className={"flex w-full flex-nowrap"}>
            <div className={"w-1/5 min-w-fit flex flex-col py-8 px-2"}>
                <DirList dirList={dirList} isEdit={isEdit} onDelete={onDelete}/>
                {(isEdit || dirList.length === 0) && <AddDirButton refreshDir={refreshDir}/>}
            </div>
            <div className={"w-4/5 min-w-fit border p-4"}>
                <div className={"flex gap-3 mb-2"}>
                    {dir && id && <Back url={`/note/?dir=${dir}`}/>}
                    <div className={"flex-1"}></div>
                    {!id && <>
                        {isEdit ?
                            <Button label={"取消"} onClick={() => setIsEdit(false)
                            }/> :
                            <Button label={"编辑"} onClick={() => setIsEdit(true)}/>}
                    </>}
                    {dir && !id && <Button onClick={() => {
                        setIsAddNote(true)
                    }} label={"添加笔记"}/>}
                </div>
                {dir ? (id ?
                        (<Viewer value={contentList.find(item => item.id === Number(id))?.content}/>) :
                        (isAddNote ? <AddNote onSubmit={() => {
                            }} onCancel={() => {
                                setIsAddNote(false)
                            }}/> :
                            <div className="space-x-5 text-wrap">
                                {contentList
                                    .filter(item => item.parent === Number(dir))
                                    .map(item => (
                                        <Link
                                            key={item.id}
                                            className="inline-block text-sm font-bold border-2 py-1 rounded-xl px-2"
                                            href={{pathname: "/note", search: `dir=${dir}&id=${item.id}`}}
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                            </div>)) :
                    (<div>click to show SESSION</div>)}
            </div>
        </div>
    )
}

export default Notes