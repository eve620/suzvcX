import getCurrentUser from "@/actions/getCurrentUser";
import Navbar from "@/app/components/navbar/Navbar";
import Footer from "@/app/components/Footer";
import RegisterModal from "@/app/components/modals/RegisterModal";
import ClientContainer from "@/app/components/ClientContainer";
import AvatarModal from "@/app/components/modals/AvatarModal";
import ProfileModal from "@/app/components/modals/ProfileModal";
import ProjectModal from "@/app/components/modals/ProjectModal";
import MessageBox from "@/app/components/messagebox/MessageBox";
import TagModal from "@/app/components/modals/TagModal";

export default async function FrontLayout({children}: Readonly<{ children: React.ReactNode; }>) {
    const currentUser = await getCurrentUser()

    return (
        <div className={"flex flex-col min-h-screen"}>
            <ClientContainer currentUser={currentUser}>
                {/*<MessageBox/>*/}
                <RegisterModal/>
                <AvatarModal/>
                <ProfileModal currentUser={currentUser}/>
                <ProjectModal currentUser={currentUser}/>
                <TagModal/>
            </ClientContainer>
            <Navbar currentUser={currentUser}/>
            <div className={"h-16 md:h-20"}/>
            {/*mt-28 md:mt-36*/}
            <main className={"flex-1 flex flex-col w-2/3 mx-auto my-16"} style={{minHeight: "calc(min(100vh - 20rem))",height:"auto"}}>
                {children}
            </main>
            <Footer/>
        </div>
    );
}
