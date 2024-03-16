"use client"
import {useState} from "react";
import {useRouter} from "next/navigation";

export default function Page() {
    const router = useRouter()
    const list = [
        {name: "第一个笔记", id: "1"},
        {name: "第二个笔记", id: "2"}
    ]
    const [items, setItems] = useState(list);
    const [selectedIds, setSelectedIds] = useState([""]);
    const handleSelect = (itemId: string) => {
        if (selectedIds.includes(itemId)) {
            setSelectedIds(selectedIds.filter(id => id !== itemId));
        } else {
            setSelectedIds([...selectedIds, itemId]);
        }
    };

    const handleDelete = () => {
        const updatedItems = items.filter(item => !selectedIds.includes(item.id));
        setItems(updatedItems);
        setSelectedIds([]);
    };
    return (
        <div className={""}>
            <div className={"flex flex-col bg-white"}>
                { <div className={"flex border-b justify-end space-x-3 md:space-x-10 py-1 pr-5"}>
                    <button className={"option-button"} onClick={()=>{router.push("/note/add")}}>添加</button>
                    <button className={"option-button"}>编辑</button>
                    <button className={"option-button"}  onClick={()=>{router.push("/note/1/edit")}}>修改</button>
                    <button className={"option-button"}>删除</button>
                </div>}
                <div className="flex flex-col items-center pb-36">
                    {items.map(item => {
                        return (
                            <div key={item.id}  onClick={()=>{router.push(`/note/${item.id}`)}}
                                 className="w-1/2 m-2 p-2 text-center rounded-xl border hover:bg-amber-500 hover:border-2 hover:border-amber-700">
                                {item.name}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}
