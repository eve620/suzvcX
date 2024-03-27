"use client"
import {useState} from "react";
import {useRouter} from "next/navigation";
import Button from "@/app/components/Button";
import useProjectModal from "@/app/hooks/useProjectModal";

const list = [
    {name: "第一个项目", id: "1"},
    {name: "第二个项目第二个项目", id: "2"},
    {name: "第二个项目第二个项目第二个项目", id: "3"},
    {name: "第二个项目第二个项目第二个项目第二个项目", id: "4"},
    {name: "第二个项目", id: "5"},
]

export default function Page() {
    const router = useRouter()
    const [items, setItems] = useState(list);
    const projectModal = useProjectModal()
    return (
        <div className={"flex flex-col"}>
            {<div className={"flex justify-end pb-6 pr-6"}>
                <Button label={"添加项目"} onClick={projectModal.onOpen}/>
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
