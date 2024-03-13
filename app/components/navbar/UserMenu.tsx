"use client"
import Link from "next/link";
import {useState} from "react";
import showMessage from "@/app/components/Message";
import MenuItem from "@/app/components/navbar/MenuItem";
import {SessionUser} from "@/app/actions/getCurrentUser";
import {signOut} from "next-auth/react";

interface UserMenuProps {
    currentUser?: SessionUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({currentUser}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const logout = () => {
        signOut()
        showMessage("退出成功！")
        setIsDropdownOpen(false)
    }
    return (
        <div>
            {currentUser ?
                <div className={"nav-button"}
                     onMouseLeave={() => setIsDropdownOpen(false)}
                     onMouseEnter={() => setIsDropdownOpen(true)}>
                    <p>{currentUser.account}</p>
                    {isDropdownOpen &&
                        <div className={"absolute shadow-sm rounded-2xl border dark:border-0 overflow-hidden"}>
                            <MenuItem label={"详情"}/>
                            <MenuItem label={"退出"} onClick={logout}/>
                        </div>
                    }
                </div>
                : <Link href={"/login"}>
                    <p className={"nav-button"}>请登录</p>
                </Link>
            }
        </div>
    )
}

export default UserMenu