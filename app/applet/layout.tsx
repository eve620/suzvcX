"use client"
import {usePathname, useRouter} from "next/navigation";
import Link from "next/link";
import Back from "@/components/Back";

export default function HomeLayout({children}: Readonly<{ children: React.ReactNode; }>) {
    const router = useRouter()
    const pathname = usePathname()
    const isRoot = pathname === '/applet'
    return (
        <div className={"w-full flex-1 flex flex-col"}>
            {!isRoot && <Back url={"/applet"}></Back>}
            {children}
        </div>
    );
}
