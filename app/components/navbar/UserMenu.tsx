"use client"
import Link from "next/link";
import {useState} from "react";
import showMessage from "@/app/components/Message";
import MenuItem from "@/app/components/navbar/MenuItem";
import {signOut} from "next-auth/react";
import {useRouter} from "next/navigation";
import {SafeUser} from "@/types";
import Avatar from "@/app/components/Avatar";
import useAvatarModal from "@/app/hooks/useAvatarModal";

interface UserMenuProps {
    currentUser?: SafeUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({currentUser}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const router = useRouter()
    const avatarModal = useAvatarModal()
    return (
        <div>
            {currentUser ?
                <div className={"flex items-center"}>
                    <div
                        className={"w-8 h-8 bg-blue-300 rounded-full overflow-hidden mr-2 cursor-pointer hover:opacity-80"}
                        onClick={avatarModal.onOpen}>
                        <Avatar/>
                    </div>
                    <div className={"relative nav-button"}
                         onMouseLeave={() => setIsDropdownOpen(false)}
                         onMouseEnter={() => setIsDropdownOpen(true)}>
                        <p className={""}>{currentUser.name}</p>
                        {isDropdownOpen &&
                            <div
                                className={"absolute right-0 shadow-sm rounded-2xl border dark:border-0 overflow-hidden"}>
                                <MenuItem label={"详情"}/>
                                <MenuItem label={"退出"} onClick={() => {
                                    signOut({redirect: false}).then(() => {
                                        setIsDropdownOpen(false)
                                        router.refresh()
                                        showMessage("退出成功！")
                                    })
                                }}/>
                            </div>
                        }
                    </div>
                </div>
                : <Link href={"/login"}>
                    <p className={"nav-button"}>请登录</p>
                </Link>
            }
        </div>
    )
}

export default UserMenu