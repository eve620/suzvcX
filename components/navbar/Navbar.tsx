import Logo from "@/components/navbar/Logo";
import NavMenu from "@/components/navbar/NavMenu";
import UserMenu from "@/components/navbar/UserMenu";
import {SafeUser} from "@/types";
import SideBar from "@/components/navbar/SideBar";
import ThemeToggle from "@/components/navbar/ThemeToggle";

interface NavbarProps {
    currentUser?: SafeUser | null
}

const Navbar: React.FC<NavbarProps> = ({currentUser}) => {
    return (
        <header className={"fixed w-full bg-white z-10 shadow-md font-bold px-3"}>
            <nav className={"flex justify-between items-center p-4 border-b"}>
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