import Link from "next/link";

interface BreadcrumbProps {
    first: string | undefined
    second: string | undefined
    firstMenu: any[]
    secondMenu: any[]
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({first, second, firstMenu, secondMenu}) => {
    return (
        <ol className="flex flex-wrap text-gray-500 dark:text-gray-300 font-mono items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5">
            {first ?
                <>{second ?
                    <>
                        <li className={"hover:text-gray-900 dark:hover:text-gray-100"}>
                            <Link className={""} href={"note"}>Home</Link>
                        </li>
                        <li className={"cursor-default"}>{">"}</li>
                        <li className={"hover:text-gray-900 dark:hover:text-gray-100"}>
                            <Link className={""}
                                  href={`note?first=${first}`}>{firstMenu.find(item => item.id === Number(first))?.name}</Link>
                        </li>
                        <li className={"cursor-default"}>{">"}</li>
                        <li className={""}>
                        <span
                            className={"cursor-default"}>{secondMenu.find(item => item.id === Number(second))?.title}</span>
                        </li>
                    </> :
                    <>
                        <li className={"hover:text-gray-900 dark:hover:text-gray-100"}>
                            <Link className={""} href={"note"}>Home</Link>
                        </li>
                        <li className={"cursor-default"}>{">"}</li>
                        <li className={""}>
                        <span
                            className={"cursor-default"}>{firstMenu.find(item => item.id === Number(first))?.name}</span>
                        </li>
                    </>}
                </> :
                <>
                    <li className={""}>
                        <span className={"cursor-default"}>Home</span>
                    </li>
                </>}
        </ol>
    )
}

export default Breadcrumb