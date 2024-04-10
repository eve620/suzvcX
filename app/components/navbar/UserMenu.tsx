"use client"
import Link from "next/link";
import { useState} from "react";
import showMessage from "@/app/components/Message";
import MenuItem from "@/app/components/navbar/MenuItem";
import {signOut} from "next-auth/react";
import {useRouter} from "next/navigation";
import {SafeUser} from "@/types";
import Avatar from "@/app/components/Avatar";
import useProfileModal from "@/app/hooks/useProfileModal";

interface UserMenuProps {
    currentUser?: SafeUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({currentUser}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const router = useRouter()
    const profileModal = useProfileModal()
    return (
        <div>
            {currentUser ?
                <div className={"flex items-center"}>
                    <Avatar/>
                    <div className={"relative nav-button"}
                         onMouseLeave={() => setIsDropdownOpen(false)}
                         onMouseEnter={() => setIsDropdownOpen(true)}>
                        <p className={"cursor-pointer"}>{currentUser.name}</p>
                        {isDropdownOpen &&
                            <div
                                className={"absolute right-0 shadow-sm rounded-2xl border dark:border-0 overflow-hidden"}>
                                <MenuItem label={"详情"} onClick={profileModal.onOpen}/>
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