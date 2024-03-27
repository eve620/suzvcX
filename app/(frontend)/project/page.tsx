"use client"
import {useState} from "react";
import {useRouter} from "next/navigation";
import Button from "@/app/components/Button";
import useProjectModal from "@/app/hooks/useProjectModal";
import Link from "next/link";

const list = [
    {
        title: "第一个项目",
        time: "2024",
        job: "核心开发",
        describe: "这是我的第1个项目，他的亮点是能够重复我说的话能够重复我说的话能够重复我说的话",
        stacks: ["vue", "react", "js", "tailwind"],
        highlight: "使用了vue组件库，很牛逼;使用了react组件库，更加牛逼",
        images: ["/avatar.jpg"],
        id: "1"
    },
    {
        title: "第二个项目",
        time: "2024",
        job: "核心开发",
        describe: "这是我的第2个项目，他的亮点是能够重复我说的话能够重复我说的话能够重复我说的话",
        stacks: ["vue", "react", "js", "tailwind"],
        highlight: "使用了vue组件库，很牛逼;使用了react组件库，更加牛逼",
        images: ["/avatar.jpg"],
        id: "2"
    },
    {
        title: "第三个项目",
        time: "2024",
        job: "核心开发",
        describe: "这是我的第3个项目，他的亮点是能够重复我说的话能够重复我说的话能够重复我说的话",
        stacks: ["vue", "react", "js", "tailwind"],
        highlight: "使用了vue组件库，很牛逼;使用了react组件库，更加牛逼",
        images: ["/avatar.jpg"],
        id: "3"
    },
    {
        title: "第四个项目",
        time: "2024",
        job: "核心开发",
        describe: "这是我的第4个项目，他的亮点是能够重复我说的话能够重复我说的话能够重复我说的话",
        stacks: ["vue", "react", "js", "tailwind"],
        highlight: "使用了vue组件库，很牛逼;使用了react组件库，更加牛逼",
        images: ["/avatar.jpg"],
        id: "4"
    },
    {
        title: "第五个项目",
        time: "2024",
        job: "核心开发",
        describe: "这是我的第5个项目，他的亮点是能够重复我说的话能够重复我说的话能够重复我说的话",
        stacks: ["vue", "react", "js", "tailwind"],
        highlight: "使用了vue组件库，很牛逼;使用了react组件库，更加牛逼",
        images: ["/avatar.jpg"],
        id: "5"
    },
]

export default function Page() {
    const router = useRouter()
    const [items, setItems] = useState(list);
    const projectModal = useProjectModal()
    return (
        <div className={"flex flex-col"}>
            {<div className={"flex justify-between pb-6 pr-6"}>
                <span className={"font-bold ml-10"}>Show My Project：</span>
                <Button label={"添加项目"} onClick={projectModal.onOpen}/>
            </div>}

            <div className="sm:columns-2 sm:gap-6 lg:columns-3 lg:gap-8">
                {items.map(item => {
                    return (
                        <div key={item.id}
                             className="
                             mb-8
                             sm:break-inside-avoid
                             rounded-xl
                             shadow-lg
                             transition-shadow
                             dark:bg-gray-700 dark:hover:shadow-blue-400/40
                             hover:shadow-2xl hover:shadow-purple-400/50">
                            <div className={"flex flex-col p-6"}>
                                <div className={"flex flex-wrap justify-between text-nowrap"}>
                                    <span className={"font-bold text-black dark:text-white"}>{item.title}</span>
                                    <span className={"text-sm"}>{item.job}</span>
                                </div>
                                <div className={"mt-4 w-full"}>
                                    {item.stacks.map((stack, index) => {
                                        return (
                                            <span className={"tag mr-2 inline-block text-wrap"}
                                                  key={index}>{stack}</span>)
                                    })}
                                </div>
                                <div className={""}>
                                    <p>{item.describe}</p>
                                </div>
                                <div className={"mt-4"}>
                                    <p>{item.highlight}</p>
                                </div>
                                <div className={"my-4"}/>
                                <div className={"flex justify-between text-xs"}>
                                    <p className={"text-gray-400"}>{item.time}</p>
                                    <Link className={"text-blue-500"} href={""}>show images</Link>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
