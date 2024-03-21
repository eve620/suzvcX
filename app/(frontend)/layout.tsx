import getCurrentUser from "@/actions/getCurrentUser";
import Navbar from "@/app/components/navbar/Navbar";
import Footer from "@/app/components/Footer";
import RegisterModal from "@/app/components/modals/RegisterModal";
import ModalContainer from "@/app/components/ModalContainer";
import AvatarModal from "@/app/components/modals/AvatarModal";

export default async function FrontLayout({children}: Readonly<{ children: React.ReactNode; }>) {
    const currentUser = await getCurrentUser()

    return (
        <body className={"flex flex-col min-h-screen bg-pink-50"}>
        <ModalContainer>
            <RegisterModal/>
            <AvatarModal/>
        </ModalContainer>
        <Navbar currentUser={currentUser}/>
        <main className={"flex-1 pt-28 md:pt-36 px-12 md:px-36 pb-16"}>
            {children}
        </main>
        <Footer/>
        </body>
    );
}
