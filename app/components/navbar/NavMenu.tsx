"use client"
import Link from "next/link";
import {usePathname} from "next/navigation";

const NavMenu = () => {
    const pathname = usePathname()
    const isActive = (route: string) => pathname.startsWith(route)
    return (
        <div className="hidden py-2 md:py-3 w-1/2 justify-around md:flex">
            <Link href={"/"}
                  className={`flex-1 text-center border-r hover:underline ${isActive('/about') && 'underline'}`}>
                关于
            </Link>
            <Link href={"/"}
                  className={`flex-1 text-center border-r hover:underline ${isActive('/note') && 'underline'}`}>
                笔记
            </Link>
            <Link href={"/"}
                  className={`flex-1 text-center border-r hover:underline ${isActive('/project') && 'underline'}`}>
                项目
            </Link>
            <Link href={"/"}
                  className={`flex-1 text-center border-r hover:underline ${isActive('/applet') && 'underline'}`}>
                开发
            </Link>
            <Link href={"/"}
                  className={`flex-1 text-center hover:underline ${isActive('/acg') && 'underline'}`}>
                ACG
            </Link>
        </div>
    )
}
export default NavMenu