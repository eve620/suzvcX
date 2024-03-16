import Link from "next/link";

export default function Page() {
    const list = [
        {name: "英语学习", path: "/applet/english", id: 1},
        {name: "看板", path: "/applet/kanban", id: 2},
        {name: "留言板", path: "/applet/comment", id: 3}
    ]
    return (
        <div className="bg-white">
            <div className="flex pb-36">
                {list.map(item => {
                    return (
                        <Link href={item.path} key={item.id}
                              className={"w-28 h-28 m-2 p-2  rounded-xl border hover:bg-amber-500 hover:border-2 hover:border-amber-700"}>
                            {item.name}
                        </Link>
                    )
                })}
            </div>
        </div>

    );
}
