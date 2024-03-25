"use client"
import {useState} from "react";
import {useRouter} from "next/navigation";


export default function Page() {
    const router = useRouter()
    const list = [
        {name: "第一个项目", id: "1"},
        {name: "第二个项目", id: "2"}
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
        <div className={"flex flex-col"}>
            {<div className={"flex border-b justify-end space-x-3 md:space-x-10 py-1 pr-5"}>
                <button className={"option-button"}>添加</button>
            </div>}
            <div className="flex">
                {items.map(item => {
                    return (
                        <div key={item.id}
                             className="w-28 h-28 m-2 mb-36 p-2 rounded-xl border hover:bg-amber-500 hover:border-2 hover:border-amber-700">
                            {item.name}
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
