"use client"
import Link from "next/link";
import {useEffect, useRef, useState} from "react";
import {useOnClickOutside} from "next/dist/client/components/react-dev-overlay/internal/hooks/use-on-click-outside";

const SideBar: React.FC = () => {
    const [isMenuShow, setIsMenuShow] = useState(false)
    const menuRef = useRef<HTMLDivElement | null>(null);
    const iconRef = useRef<HTMLDivElement | null>(null);

    // useEffect(() => {
    //     // 添加点击事件监听器
    //     const handleClickOutside = (event: MouseEvent) => {
    //         if (isMenuShow && menuRef.current && iconRef.current
    //             && !menuRef.current.contains(event.target as Node)
    //             && !iconRef.current.contains(event.target as Node)) {
    //             setIsMenuShow(false);
    //         }
    //     };
    //
    //     document.addEventListener('mousedown', handleClickOutside);
    //
    //     // 清理函数，在组件卸载时移除事件监听器
    //     return () => {
    //         document.removeEventListener('mousedown', handleClickOutside);
    //     };
    // }, [isMenuShow]);
    useOnClickOutside(menuRef.current, () => {
        setIsMenuShow(false)
    })
    const showMenu = () => {
        setIsMenuShow(true)
    }

    return (
        <div>
            <div ref={menuRef}
                 className={`h-32 z-20 theme-color absolute text-center rounded-br-2xl duration-200 -left-14 top-12 w-14 md:hidden ${isMenuShow && "translate-x-14"}`}>
                <ul>
                    <Link href={"/about"} className={"block cursor-pointer bg-white"}>关于
                    </Link>
                    <Link href={"/note"} className={"block cursor-pointer bg-white"}>笔记
                    </Link>
                    <Link href={"/project"} className={"block cursor-pointer bg-white"}>项目
                    </Link>
                    <Link href={"/english"} className={"block cursor-pointer bg-white"}>英语
                    </Link>
                    <Link href={"/kanban"} className={"block cursor-pointer bg-white"}>看板
                    </Link>
                </ul>
            </div>
            <div ref={iconRef} className="md:hidden cursor-pointer pr-2">
                {isMenuShow ?
                    <svg key={1} viewBox="0 0 1024 1024"
                         width="20"
                         height="20">
                        <path
                            className={"fill-black dark:fill-white"}
                            d="M563.8 512l262.5-312.9c4.4-5.2 0.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9c-4.4 5.2-0.7 13.1 6.1 13.1h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path>
                    </svg> :
                    <svg onClick={showMenu} viewBox="0 0 1024 1024"
                         width="20"
                         height="20">
                        <path
                            className={"fill-black dark:fill-white"}
                            d="M912 192H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM912 476H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM912 760H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8z"></path>
                        <path
                            className={"fill-black dark:fill-white"}
                            d="M160 228m-56 0a56 56 0 1 0 112 0 56 56 0 1 0-112 0Z"></path>
                        <path
                            className={"fill-black dark:fill-white"}
                            d="M160 512m-56 0a56 56 0 1 0 112 0 56 56 0 1 0-112 0Z"></path>
                        <path
                            className={"fill-black dark:fill-white"}
                            d="M160 796m-56 0a56 56 0 1 0 112 0 56 56 0 1 0-112 0Z"></path>
                    </svg>}
            </div>
        </div>
    )
}
export default SideBar