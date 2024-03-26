interface ButtonProps {
    label: string,
    onClick: () => void,
    big?: boolean,
}

const Button: React.FC<ButtonProps> = ({label, onClick, big}) => {
    return (
        <button
            className={`${big ? "text-md":"text-sm"} bold bg-black text-white dark:bg-white dark:text-black px-3 py-1 rounded hover:opacity-80 dark:hover:opacity-90`}
            onClick={onClick}>
            {label}
        </button>
    )
}

export default Button