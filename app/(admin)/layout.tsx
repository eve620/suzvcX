import Navbar from "@/app/components/navbar/Navbar";
import Footer from "@/app/components/Footer";
import getCurrentUser from "@/actions/getCurrentUser";

export default async function AdminLayout({children}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div>
            {children}
        </div>
    );
}
