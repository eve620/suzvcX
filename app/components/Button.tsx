interface ButtonProps {
    label: string,
    onClick?: () => void,
    big?: boolean,
    right?: boolean
}

const Button: React.FC<ButtonProps> = ({label, onClick, big, right}) => {
    return (
        <button
            className={`${big ? "text-md" : "text-sm"} ${right && "ml-auto"} block w-fit bold bg-black text-white dark:bg-white dark:text-black px-3 py-1 rounded hover:opacity-80 dark:hover:opacity-90`}
            onClick={onClick}>
            {label}
        </button>
    )
}

export default Button