import Button from "@/app/components/Button";
import Link from "next/link";
import Back from "@/app/components/Back";

const dira = [
    {id: 1, name: "分类1"},
    {id: 2, name: "分类2"},
    {id: 3, name: "分类3"},
    {id: 4, name: "分类4"},
    {id: 5, name: "分类5"},
    {id: 6, name: "分类6"}]

const menu = [
    {id: 1, parentId: 1, title: "前端"},
    {id: 2, parentId: 1, title: "后端"},
    {id: 3, parentId: 1, title: "移动端"},
    {id: 4, parentId: 2, title: "css"},
    {id: 5, parentId: 2, title: "js"},
    {id: 6, parentId: 3, title: "java"},
    {id: 7, parentId: 3, title: "react"},
    {id: 8, parentId: 4, title: "vue"},
    {id: 9, parentId: 5, title: "python"}
]

export default function Page({searchParams: {dir, id}}: { searchParams: { dir: string, id: string } }) {
    return (
        <div className={"flex flex-wrap w-full"}>
            <div className={"w-1/4 min-w-fit flex flex-col pt-20"}>
                {dira.map((item, index) => {
                    return (
                        <Link key={item.id}
                              style={{zIndex: `${9999 - index}`}}
                              className={"border-2 duration-300 -mt-3 py-2 first:mt-0 hover:mt-0 border-black bg-blue-100 w-28 mx-auto text-center rounded-full"}
                              href={{pathname: "/note", search: `dir=${item.id}`}}>{item.name}</Link>
                    )
                })}
            </div>
            <div className={"w-3/4"}>
                {dir && !id && <Button right={true} label={"添加笔记"}/>}
                <div className={"pt-4"}>
                    {id ?
                        <>
                            <Back url={`/note/?dir=${dir}`}/>
                            {id}
                        </> :
                        <div className={"space-x-5 text-wrap"}>
                            {menu.filter(item => item.parentId === Number(dir)).map((item) => {

                                return (
                                    <Link key={item.id} className={"inline-block bg-pink-50 py-2 rounded px-4"}
                                          href={{
                                              pathname: "/note",
                                              search: `dir=${dir}&id=${item.id}`
                                          }}>{item.title}</Link>
                                )
                            })}
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}
