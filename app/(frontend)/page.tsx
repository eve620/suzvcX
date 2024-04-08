import Link from "next/link";
import Image from "next/image";
import DevLog from "@/app/components/Home/DevLog";
import Guide from "@/app/components/Home/Guide";
import TopBar from "@/app/components/Home/TopBar";

export default function FrontendPage() {
    return (
        <div>
            <section className="
            bg-purple-200
            dark:bg-gray-800 dark:text-white
            px-4 py-3 text-black
            sm:flex sm:items-center sm:justify-between sm:px-6
            lg:px-8 rounded-lg">
                <TopBar/>
            </section>
            <section className={"sm:columns-2 p-6 opacity-80"}>
                <Guide/>
            </section>
            <section>
                <DevLog/>
            </section>
        </div>
    );
}
