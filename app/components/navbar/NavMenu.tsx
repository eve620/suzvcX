"use client"
import Link from "next/link";
import {usePathname} from "next/navigation";

const NavMenu = () => {
    const pathname = usePathname()
    const isActive = (route: string) => pathname.startsWith(route)
    return (
        <div
            className="rounded-full shadow-sm hover:shadow-md border cursor-pointer hidden py-1 md:py-3 w-1/2 justify-around md:flex">
            <Link href={"/note"} prefetch={true}
                  className={`flex-1 text-center border-r hover:underline ${isActive('/note') && 'underline'}`}>
                笔记
            </Link>
            <Link href={"/project"} prefetch={true}
                  className={`flex-1 text-center border-r hover:underline ${isActive('/project') && 'underline'}`}>
                项目
            </Link>
            <Link href={"/english"} prefetch={true}
                  className={`flex-1 text-center border-r hover:underline ${isActive('/english') && 'underline'}`}>
                英语
            </Link>
            <Link href={"/kanban"} prefetch={true}
                  className={`flex-1 text-center hover:underline ${isActive('/kanban') && 'underline'}`}>
                看板
            </Link>
        </div>
    )
}
export default NavMenu