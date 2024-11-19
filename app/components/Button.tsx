interface ButtonProps {
    label: string,
    onClick: () => void,
    big?: boolean,
    type?: "default" | "red" | "outline",
}

const Button: React.FC<ButtonProps> = ({label, onClick, big, type = "default"}) => {
    return (
        <>
            {type === "red" ?
                <button
                    className={`${big ? "text-md" : "text-sm"} h-7 text-nowrap duration-200 inline-block w-fit bold bg-transparent border border-red-400 text-red-400 dark:text-white dark:border-white px-3 py-1 rounded hover:opacity-80 dark:hover:opacity-90`}
                    onClick={(e) => {
                        e.preventDefault()
                        onClick()
                    }}>
                    {label}
                </button> : type === "outline" ?
                    <button
                        className={`${big ? "text-md" : "text-sm"} h-7 text-nowrap duration-200 inline-block w-fit bold bg-transparent border border-gray-600 text-gray-600 dark:text-white dark:border-white px-3 py-1 rounded hover:opacity-80 dark:hover:opacity-90`}
                        onClick={(e) => {
                            e.preventDefault()
                            onClick()
                        }}>
                        {label}
                    </button> :
                    <button
                        className={`${big ? "text-md" : "text-sm"} h-7 text-nowrap duration-200 inline-block w-fit bold bg-foreground text-background px-3 py-1 rounded hover:opacity-80 dark:hover:opacity-90`}
                        onClick={(e) => {
                            e.preventDefault()
                            onClick()
                        }}>
                        {label}
                    </button>}
        </>
    )
}

export default Button