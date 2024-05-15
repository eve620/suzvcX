import {useEffect, useRef, useState} from "react";
import {useOnClickOutside} from "next/dist/client/components/react-dev-overlay/internal/hooks/use-on-click-outside";
import showMessage from "@/app/components/Message";

interface AddButtonProps {
    refreshDir: () => void;
}

const AddDirButton: React.FC<AddButtonProps> = ({refreshDir}) => {
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
            if (!dirName) {
                showMessage("文件夹名称不能为空")
                return
            }
            const addDir = await fetch(`/api/note/dir`, {
                method: "POST",
                body: JSON.stringify(dirName.trim())
            })
            if (addDir.ok) {
                const res = await addDir.json()
                refreshDir()
                showMessage(res.message)
                setDirName("")
                setIsAdd(false)
            } else {
                const res = await addDir.json()
                showMessage(res.message)
            }
        }
    }
    return (
        <div
            ref={addRef}
            className={`duration-300 first:mt-0 hover:mt-0 hover:pt-1 mx-auto ${isAdd ? "pt-1 mt-0" : "-mt-1"}`}
        >
            <div
                className={`block ${isAdd ? "w-28" : "w-20"} duration-200 bg-gradient-to-br from-slate-800 via-slate-800 to-slate-400 text-sm font-bold text-gray-100 dark:text-gray-300 ${!isAdd && "cursor-pointer"} rounded-3xl`}
            >
                {isAdd ? (
                    <input
                        ref={inputRef}
                        value={dirName}
                        onKeyDown={onAdd}
                        onChange={(e) => setDirName(e.target.value)}
                        className="w-full my-2 px-3 bg-transparent mr-2 text-center outline-none"
                    />
                ) : (
                    <button
                        className="w-full py-2 h-full"
                        onClick={() => setIsAdd(true)}
                    >
                        add
                    </button>
                )}
            </div>
        </div>
    );
};

export default AddDirButton