import Link from "next/link";
import Image from "next/image";

export default function FrontendPage() {
    return (
        <div className={""}>
            <section className="
            bg-purple-200
            dark:bg-gray-800 dark:text-white
            px-4 py-3 text-black
            sm:flex sm:items-center sm:justify-between sm:px-6
            lg:px-8 rounded-lg">
                <span>About Glog ，My onw project</span>
                <Link href={"/about"}
                      className="mt-4 block rounded-lg bg-white px-5 py-3
                      text-center text-sm font-medium text-purple-600 transition
                      hover:bg-white/90 hover:text-pink-500
                      focus:outline-none focus:ring active:text-pink-500 sm:mt-0">
                    About Me
                </Link>
            </section>
            <section className={"sm:columns-2 p-6 opacity-80"}>
                <div className="overflow-hidden">
                    <span className={"text-3xl leading-loose inline-block"}>Why aren’t you good at English?</span>
                    <span
                        className={"text-3xl leading-loose inline-block"}>It’s because you haven’t used Log yet!</span>
                    <Link className="
                    w-full py-2 my-8 mx-auto sm:mx-0 sm:w-48 text-center rounded-md font-bold duration-200 block
                    text-black dark:text-gray-300
                    bg-gray-200 dark:bg-neutral-800
                    hover:bg-gray-300 dark:hover:bg-neutral-950" href={""}>Github</Link>
                </div>
                <div className="overflow-hidden">
                    <Image className={"mx-auto mt-2 rounded-md"} width={250} height={250} src={"/avatar.jpg"}
                           alt={"picture"}/>
                </div>
            </section>
        </div>
    );
}
