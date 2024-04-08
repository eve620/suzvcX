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

const DevLog: React.FC = () => {
    return (
        <>
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
        </>
    )
}

export default DevLog