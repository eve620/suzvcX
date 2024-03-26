"use client"
import {useState} from "react";
import {useRouter} from "next/navigation";
import Button from "@/app/components/Button";


export default function Page() {
    const router = useRouter()
    const list = [
        {name: "第一个项目", id: "1"},
        {name: "第二个项目第二个项目", id: "2"},
        {name: "第二个项目第二个项目第二个项目", id: "2"},
        {name: "第二个项目第二个项目第二个项目第二个项目", id: "2"},
        {name: "第二个项目", id: "2"},
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
            {<div className={"flex justify-end pb-6 pr-6"}>
                <Button label={"添加项目"} onClick={() => {
                }}/>
            </div>}
            <div className="sm:columns-2 sm:gap-6 lg:columns-3 lg:gap-8">
                {items.map(item => {
                    return (
                        <div key={item.id}
                             className="
                             mb-8
                             sm:break-inside-avoid
                             p-6
                             rounded-xl
                             shadow-lg
                             duration-200
                             dark:bg-gray-700 dark:hover:shadow-blue-400/40
                             hover:shadow-2xl hover:shadow-purple-400/50">
                            {item.name}
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
