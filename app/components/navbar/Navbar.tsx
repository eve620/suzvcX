import Logo from "@/app/components/navbar/Logo";
import NavMenu from "@/app/components/navbar/NavMenu";
import UserMenu from "@/app/components/navbar/UserMenu";
import {SessionUser} from "@/app/actions/getCurrentUser";

interface NavbarProps {
    currentUser?: SessionUser | null
}

const Navbar: React.FC<NavbarProps> = ({currentUser}) => {
    return (
        <header className={"fixed w-full"}>
            <nav className={"flex justify-between items-center p-4 border-b"}>
                <Logo/>
                <NavMenu/>
                <UserMenu/>
            </nav>
        </header>
    )
}

export default Navbar