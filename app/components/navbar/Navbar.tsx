import Logo from "@/app/components/navbar/Logo";
import NavMenu from "@/app/components/navbar/NavMenu";
import UserMenu from "@/app/components/navbar/UserMenu";
import {SafeUser} from "@/types";
import SideBar from "@/app/components/navbar/SideBar";
import ThemeToggle from "@/app/components/navbar/ThemeToggle";
import useUserStore from "@/app/hooks/useUserStore";

interface NavbarProps {
    currentUser?: SafeUser | null
}

const Navbar: React.FC<NavbarProps> = ({currentUser}) => {
    return (
        <header
            className={"text-lg fixed w-full text-black dark:text-white bg-gray-50 dark:bg-gray-800 z-10 shadow-md dark:shadow-blue-900/80 font-bold px-3"}>
            <nav className={"flex h-16 md:h-20 transition-height justify-between items-center p-4"}>
                <div className={"flex items-center"}>
                    <SideBar/>
                    <Logo/>
                </div>
                <NavMenu/>
                <div className={"flex items-center"}>
                    <ThemeToggle/>
                    <UserMenu currentUser={currentUser}/>
                </div>
            </nav>
        </header>
    )
}

export default Navbar