"use client"
import Link from "next/link";
import Back from "@/app/components/Back";
import Button from "@/app/components/Button";
import {useEffect, useRef, useState} from "react";
import {useOnClickOutside} from "next/dist/client/components/react-dev-overlay/internal/hooks/use-on-click-outside";

interface NotesProps{
    dir: string | undefined
    id: string | undefined
    dirMenu: any[]
    menu: any[]
}

const Notes: React.FC<NotesProps> = ({dir,id,dirMenu,menu}) => {
    const [isAdd, setIsAdd] = useState(false)
    const [dirName, setDirName] = useState("")
    const addRef = useRef<HTMLDivElement | null>(null)
    const inputRef = useRef<HTMLInputElement | null>(null)
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
    const onAdd = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            const addDir = await fetch(`/api/note/dir`, {
                method: "POST",
                body: JSON.stringify(dirName)
            })
        }
    }
    return (
        <div className={"flex flex-wrap w-full"}>
            <div className={"w-1/4 min-w-fit flex flex-col py-12"}>
                {dirMenu.map((item, index) => {
                    return (
                        <div key={item.id} style={{zIndex: `${30 - index}`, transitionProperty: "margin"}}
                             className={`duration-300 first:mt-0 hover:mt-0 ${index !== 0 && 'hover:pt-1'} ${index !== 0 && item.id === Number(dir) ? "pt-1 mt-0" : "-mt-3"} 
                                    mx-auto text-center`}>
                            <Link
                                className={"block py-2 w-28 font-bold bg-slate-700 text-gray-200 border-2 border-blue-500/80 dark:bg-slate-700 rounded-full"}
                                href={{pathname: "/note", search: `dir=${item.id}`}}>{item.name}</Link>
                        </div>
                    )
                })}
                <div style={{transitionProperty: "margin"}} ref={addRef}
                     className={`duration-300 first:mt-0 hover:mt-0 hover:pt-1 ${isAdd ? "pt-1 mt-0" : "-mt-3"} 
                                    mx-auto text-center`}>

                    <div
                        className={`block ${isAdd ? "w-28" : "w-20"} duration-200 font-bold bg-slate-700 text-gray-200 border-2 border-blue-500/80 dark:bg-slate-700 ${!isAdd && "cursor-pointer"} rounded-full`}>
                        {isAdd ? <input ref={inputRef} value={dirName} onKeyDown={(e) => {
                                onAdd(e)
                            }} onChange={(e) => {
                                setDirName(e.target.value)
                            }} className={"w-full my-2 px-3 bg-transparent mr-2 text-center outline-none"}/> :
                            <button className={"w-full py-2 h-full"} onClick={() => {
                                setIsAdd(true)
                            }}>add</button>}
                    </div>
                </div>
            </div>
            <div className={"w-3/4 bg-pink-100 p-4"}>
                {dir ?
                    <div className={""}>
                        {id ?
                            <>
                                <Back url={`/note/?dir=${dir}`}/>
                                {id}
                            </> :
                            <>
                                <Button right={true} label={"添加笔记"}/>
                                <div className={"space-x-5 text-wrap"}>
                                    {menu.filter(item => item.parentId === Number(dir)).map((item) => {

                                        return (
                                            <Link key={item.id}
                                                  className={"inline-block bg-pink-50 py-2 rounded px-4"}
                                                  href={{
                                                      pathname: "/note",
                                                      search: `dir=${dir}&id=${item.id}`
                                                  }}>{item.title}</Link>
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