"use client"
import Link from "next/link";
import Back from "@/app/components/Back";
import Button from "@/app/components/Button";
import {useEffect, useRef, useState} from "react";
import {useOnClickOutside} from "next/dist/client/components/react-dev-overlay/internal/hooks/use-on-click-outside";
import showMessage from "@/app/components/Message";
import {router} from "next/client";
import {useRouter} from "next/navigation";

interface NotesProps {
    dir: string | undefined
    id: string | undefined
    dirMenu: any[]
    menu: any[]
}

const Notes: React.FC<NotesProps> = ({dir, id, dirMenu, menu}) => {
    const [isAdd, setIsAdd] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [dirName, setDirName] = useState("")
    const [dirList, setDirList] = useState<any[]>(dirMenu)
    const [contentList, setContentList] = useState<any[]>(menu)
    const addRef = useRef<HTMLDivElement | null>(null)
    const inputRef = useRef<HTMLInputElement | null>(null)
    const router  = useRouter()
    useEffect(() => {
        if (isAdd && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isAdd]);
    useOnClickOutside(addRef.current, (event) => {
        if (addRef.current && !addRef.current.contains(event.target as Node)) {
            setDirName("")
            setIsAdd(false)
        }
    })
    const refreshDir = async () => {
        const dirResponse = await fetch("/api/note/dir")
        if (dirResponse.ok) {
            setDirList(await dirResponse.json().then(data => data.data))
        }
    }
    const onAdd = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            const addDir = await fetch(`/api/note/dir`, {
                method: "POST",
                body: JSON.stringify(dirName.trim())
            })
            if (addDir.ok) {
                const res = await addDir.json()
                await refreshDir()
                showMessage(res.message)
                setDirName("")
                setIsAdd(false)
            } else {
                const res = await addDir.json()
                showMessage(res.message)
            }
        }
    }
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
        <div className={"flex flex-wrap w-full"}>
            <div className={"w-1/4 min-w-fit flex flex-col py-8"}>
                {dirList.map((item, index) => {
                    return (
                        <div key={item.id} style={{zIndex: `${30 - index}`, transitionProperty: "margin"}}
                             className={`relative duration-300 first:mt-0 hover:mt-0 ${index !== 0 && 'hover:pt-1'} ${index !== 0 && item.id === Number(dir) ? "pt-1 mt-0" : "-mt-3"} 
                                    mx-auto text-center`}>
                            <Link
                                className={"block py-2 w-28 font-bold bg-slate-700 text-gray-200 border-2 border-blue-500/80 dark:bg-slate-700 rounded-full"}
                                href={{pathname: "/note", search: `dir=${item.id}`}}>{item.name}</Link>
                            {isEdit &&
                                <div onClick={async () => {
                                    await onDelete(item.id)
                                }}
                                     className="absolute cursor-pointer hover:size-4 duration-200 size-3 bg-red-700 top-1/2 right-2 rounded-full -translate-y-1/2 translate-x-1/2"/>}
                        </div>
                    )
                })}
                {(isEdit || dirList.length === 0) &&
                    <div style={{transitionProperty: "margin"}} ref={addRef}
                         className={`duration-300 first:mt-0 hover:mt-0 hover:pt-1 ${isAdd ? "pt-1 mt-0" : "-mt-3"} 
                                    mx-auto text-center`}>

                        <div
                            className={`block ${isAdd ? "w-28" : "w-20"} duration-200 font-bold bg-slate-700 text-gray-200 border-2 border-blue-500/80 dark:bg-slate-700 ${!isAdd && "cursor-pointer"} rounded-full`}>
                            {isAdd ? <input ref={inputRef} value={dirName} onKeyDown={async (e) => {
                                    await onAdd(e)
                                }} onChange={(e) => {
                                    setDirName(e.target.value)
                                }} className={"w-full my-2 px-3 bg-transparent mr-2 text-center outline-none"}/> :
                                <button className={"w-full py-2 h-full"} onClick={() => {
                                    setIsAdd(true)
                                }}>add</button>}
                        </div>
                    </div>}
            </div>
            <div className={"w-3/4 bg-pink-100 p-4"}>
                <div className={"flex justify-end gap-3"}>
                    {!id && <>
                        {isEdit ?
                            <Button label={"取消"} onClick={() => setIsEdit(false)
                            }/> :
                            <Button label={"编辑"} onClick={() => setIsEdit(true)}/>}
                    </>}
                    {dir && !id && <Button label={"添加笔记"}/>}
                </div>
                {dir ?
                    <div className={""}>
                        {id ?
                            <>
                                <Back url={`/note/?dir=${dir}`}/>
                                {contentList.find(item => item.id === Number(id))?.content}
                            </> :
                            <>
                                <div className={"space-x-5 text-wrap"}>
                                    {contentList.filter(item => item.parent === Number(dir)).map((item) => {

                                        return (
                                            <Link key={item.id}
                                                  className={"inline-block bg-pink-50 py-2 rounded px-4"}
                                                  href={{
                                                      pathname: "/note",
                                                      search: `dir=${dir}&id=${item.id}`
                                                  }}>{item.name}</Link>
                                        )
                                    })}
                                </div>
                            </>
                        }
                    </div> :
                    <div>
                        click to show SESSION
                    </div>}
            </div>
        </div>
    )
}

export default Notes