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
import {SafeUser} from "@/types";
import Breadcrumb from "@/app/(frontend)/note/Breadcrumb";
import {constructor} from "autoprefixer";

interface NotesProps {
    dir: string | undefined
    id: string | undefined
    dirMenu: any[]
    menu: any[]
    currentUser: SafeUser
    test: any
}


const Notes: React.FC<NotesProps> = ({dir, id, dirMenu, menu, currentUser, test}) => {
    const [isEdit, setIsEdit] = useState(false)
    const [isAddNote, setIsAddNote] = useState(false)
    const [dirList, setDirList] = useState<any[]>(dirMenu)
    const [contentList, setContentList] = useState<any[]>(menu)
    const router = useRouter()
    const refreshDir = async () => {
        const dirResponse = await fetch(`/api/note/dir?id=${currentUser.id}`)
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

    const renderContent = () => {
        if (!dir) {
            return (
                <div className="flex justify-center items-center h-full text-3xl font-bold">
                    Please add and select a directory first.
                </div>
            )
        }

        if (id) {
            const note = contentList.find(item => item.id === Number(id))
            return <Viewer value={note?.content}/>
        }

        if (isAddNote) {
            return <AddNote onSubmit={() => {
            }} onCancel={() => setIsAddNote(false)}/>
        }

        const notes = contentList.filter(item => item.parent === Number(dir))

        if (notes.length === 0) {
            return (
                <div className="flex flex-col justify-center items-center h-full">
                    <svg viewBox="0 0 1024 1024" width="148" height="148" fill="#cdcdcd">
                        <path
                            d="M469.333333 234.666667V106.666667h85.333334v128h-85.333334z m-161.834666-94.165334l85.333333 85.333334-60.330667 60.330666-85.333333-85.333333 60.330667-60.330667z m469.333333 60.330667l-85.333333 85.333333-60.330667-60.330666 85.333333-85.333334 60.330667 60.330667z m-548.693333 182.826667A85.333333 85.333333 0 0 1 301.845333 341.333333H722.133333a85.333333 85.333333 0 0 1 73.706667 42.346667l131.2 224.853333A85.333333 85.333333 0 0 1 938.666667 651.541333V832a85.333333 85.333333 0 0 1-85.333334 85.333333H170.666667a85.333333 85.333333 0 0 1-85.333334-85.333333v-180.48a85.333333 85.333333 0 0 1 11.626667-42.986667l131.178667-224.853333zM722.133333 426.666667H301.866667l-99.562667 170.666666h255.146667l9.6 28.8a58.602667 58.602667 0 0 0 2.133333 4.778667c1.92 3.84 4.906667 8.896 8.96 13.781333 7.829333 9.408 18.133333 16.64 33.877333 16.64 15.744 0 26.026667-7.232 33.898667-16.64a72.469333 72.469333 0 0 0 11.050667-18.453333l0.021333-0.106667 9.6-28.8h255.146667l-99.562667-170.666666zM853.333333 682.666667H623.509333a154.730667 154.730667 0 0 1-12.074666 16.64C592.64 721.92 560.256 746.666667 512 746.666667c-48.256 0-80.64-24.768-99.434667-47.36a154.730667 154.730667 0 0 1-12.074666-16.64H170.666667v149.333333h682.666666v-149.333333z"></path>
                    </svg>
                    <span className="text-gray-300 font-bold">Empty</span>
                </div>
            )
        }
        return (
            <div className="space-x-5 h-full text-wrap">
                {notes.map(note => (
                    <Link
                        key={note.id}
                        className="inline-block text-sm font-bold border-2 py-1 rounded-xl px-2"
                        href={{pathname: "/note", search: `dir=${dir}&id=${note.id}`}}
                    >
                        {note.name}
                    </Link>
                ))}
            </div>
        )
    }
    return (
        <div className={"flex flex-col w-full flex-nowrap min-h-[65vh]"}>
            <div className={"flex items-center gap-3 h-10 pl-20 pr-6"}>
                <Breadcrumb dir={dir} id={id} dirMenu={dirMenu} menu={menu}/>
                {/*{dir && id && <Back url={`/note/?dir=${dir}`}/>}*/}
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
            <div className={"flex flex-1"}>
                <div className={"w-1/5 min-w-fit flex flex-col py-8 px-2"}>
                    <DirList dirList={dirList} isEdit={isEdit} onDelete={onDelete}/>
                    {(isEdit || dirList.length === 0) && <AddDirButton refreshDir={refreshDir}/>}
                </div>
                <div className={"w-4/5 min-w-fit p-4 border"}>
                    <div className="h-full ">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Notes