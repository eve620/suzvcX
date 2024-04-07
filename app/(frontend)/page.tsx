import Link from "next/link";
import Image from "next/image";

export default function FrontendPage() {
    const logList = [{
        time: "2024",
        content: "此时若发现上个错词未正确修改，可按下退格键 来回退到上一个错词"
    }, {
        time: "2024",
        content: "此时若发现上个错词未正确修改，可按下退格键 来回退到上一个错词"
    }, {
        time: "2024",
        content: "此时若发现上个错词未正确修改，可按下退格键 来回退到上一个错词"
    }, {
        time: "2024",
        content: "此时若发现上个错词未正确修改，可按下退格键 来回退到上一个错词"
    }, {
        time: "2024",
        content: "此时若发现上个错词未正确修改，可按下退格键 来回退到上一个错词"
    }, {
        time: "2024",
        content: "此时若发现上个错词未正确修改，可按下退格键 来回退到上一个错词"
    }, {
        time: "2024",
        content: "此时若发现上个错词未正确修改，可按下退格键 来回退到上一个错词"
    },]

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
                    <Image className={"mx-auto mt-2 rounded-md"} width={150} height={150} src={"/avatar.jpg"}
                           alt={"picture"}/>
                    <span className={"text-3xl leading-loose inline-block"}>Why aren’t you good at English?</span>
                    <span
                        className={"text-3xl leading-loose inline-block"}>It’s because you haven’t used Log yet!</span>
                    <Link className="
                    w-full py-2 my-8 mx-auto sm:mx-0 sm:w-48 text-center rounded-md font-bold duration-200 block
                    text-black dark:text-gray-300
                    bg-gray-200 dark:bg-neutral-800
                    hover:bg-gray-300 dark:hover:bg-neutral-950" href={""}>Github</Link>
                </div>
                <div className="hidden sm:block">
                    <div className="overflow-hidden
                                bg-gray-50 border border-gray-200 dark:border-gray-500
                                dark:from-[#525252e6] dark:bg-gradient-to-b dark:to-gray-900
                                rounded-2xl p-4
                                hover:shadow-xl dark:shadow-md dark:hover:shadow-blue-700/70
                                ">
                        <div className={"pr-2"}>
                            <h2 className={"text-xl font-bold py-4"}>使用指南</h2>
                            <h3 className={"pb-2 font-semibold"}>点击这里开始哦</h3>
                            <p className={"py-1 leading-7 text-sm"}>教你一下怎么用教你一下怎么用教你一下怎么用教你一下怎么用教你一下怎么用教你一下怎么用教你一下怎么用教你一下怎么用教你一下怎么用教你一下怎么用教你一下怎么用教你一下怎么用</p>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <h2 className={"text-center text-xl font-bold tracking-tight sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-gray-200 dark:from-purple-600 dark:to-gray-100 mb-4"}>开发日志</h2>
                <div className={"flex justify-center flex-wrap"}>
                    {logList.map((log, index) => {
                        return (
                            <div key={index} className={"md:w-1/2 lg:w-1/3 xl:w-1/4  scroll-auto p-1 md:p-3"}>
                                <div className="
                                bg-gray-50 border border-gray-200 dark:border-gray-500
                                dark:from-[#525252e6] dark:bg-gradient-to-b dark:to-gray-900
                                rounded-2xl pt-4 pl-4 pb-4
                                hover:shadow-xl dark:shadow-md dark:hover:shadow-blue-700/70
                                ">
                                    <div className={"overflow-y-auto pr-2 h-32"}>
                                        <span>{log.time}</span>
                                        <p>{log.content}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    <div className={"md:w-1/3 lg:w-1/4 scroll-auto p-1 md:p-3"}>
                        <div className="
                                bg-gray-50 border border-gray-200 dark:border-gray-500
                                dark:from-[#525252e6] dark:bg-gradient-to-b dark:to-gray-900
                                rounded-2xl pt-4 pl-4 pb-4
                                hover:shadow-xl dark:shadow-md dark:hover:shadow-blue-700/70
                                ">
                            <div className={"overflow-y-auto pr-2 h-32"}>
                                <span>add预留</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
