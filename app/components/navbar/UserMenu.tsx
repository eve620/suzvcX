"use client"
import Link from "next/link";
import {useState} from "react";
import showMessage from "@/app/components/Message";
import MenuItem from "@/app/components/navbar/MenuItem";
import {signOut} from "next-auth/react";
import {useRouter} from "next/navigation";
import {SafeUser} from "@/types";
import Avatar from "@/app/components/Avatar";
import useProfileModal from "@/app/hooks/useProfileModal";
import useUserStore from "@/app/hooks/useUserStore";

interface UserMenuProps {
    currentUser?: SafeUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({currentUser}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const useUser = useUserStore()
    const router = useRouter()
    const profileModal = useProfileModal()
    return (
        <div>
            {currentUser ?
                <div className={"flex items-center"}>
                    <Avatar avatar={currentUser.image || ''}/>
                    <div className={"relative nav-button"}
                         onMouseLeave={() => setIsDropdownOpen(false)}
                         onMouseEnter={() => setIsDropdownOpen(true)}>
                        <p className={"cursor-pointer"}>{currentUser.username}</p>
                        {isDropdownOpen &&
                            <div
                                className={"absolute right-0 shadow-sm rounded-2xl border dark:border-slate-800 overflow-hidden"}>
                                <MenuItem label={"详情"} onClick={profileModal.onOpen}/>
                                <MenuItem label={"站内信"}/>
                                {currentUser.role === "Admin" && <MenuItem label={"管理"} onClick={() => {
                                    router.push("/admin")
                                }}/>}
                                <MenuItem label={"退出"} onClick={() => {
                                    signOut({redirect: false}).then(() => {
                                        setIsDropdownOpen(false)
                                        useUser.clearUser
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