import getCurrentUser from "@/actions/getCurrentUser";
import Navbar from "@/app/components/navbar/Navbar";
import Footer from "@/app/components/Footer";
import RegisterModal from "@/app/components/modals/RegisterModal";
import ModalContainer from "@/app/components/ModalContainer";
import AvatarModal from "@/app/components/modals/AvatarModal";
import ProfileModal from "@/app/components/modals/ProfileModal";
import ProjectModal from "@/app/components/modals/ProjectModal";

export default async function FrontLayout({children}: Readonly<{ children: React.ReactNode; }>) {
    const currentUser = await getCurrentUser()

    return (
        <div className={"flex flex-col min-h-screen"}>
            <ModalContainer>
                <RegisterModal/>
                <AvatarModal/>
                <ProfileModal currentUser={currentUser}/>
                <ProjectModal/>
            </ModalContainer>
            <Navbar currentUser={currentUser}/>
            <main className={"flex-1 relative mt-28 md:mt-36 w-2/3 mx-auto mb-16"}>
                {children}
            </main>
            <Footer/>
        </div>
    );
}
