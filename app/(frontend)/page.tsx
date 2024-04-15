import DevLog from "@/app/components/Home/DevLog";
import Guide from "@/app/components/Home/Guide";
import TopBar from "@/app/components/Home/TopBar";
import getCurrentUser from "@/actions/getCurrentUser";

export default async function FrontendPage() {
    const currentUser = await getCurrentUser()
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
                <DevLog currentUser={currentUser}/>
            </section>
        </div>
    );
}
