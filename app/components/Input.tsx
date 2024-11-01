interface InputProps {
    label?: string;
    type?: "default" | "focus";
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
}

const Input: React.FC<InputProps> = ({
                                         onChange,
                                         value,
                                         label,
                                         type = "default"
                                     }) => {
    return (
        <div className="w-full px-5 relative flex items-center justify-between">
            {type !== "focus" && <label className={`
                text-nowrap
                text-sm
                text-zinc-400`}>
                {label}
            </label>}
            <input
                onChange={onChange}
                value={value}
                placeholder=""
                autoComplete="current-password"
                className={`
                ${label && type !== 'focus' ? "w-5/6" : "w-full"}
                  py-2
                  px-3
                  ${type === "focus" && "peer"}
                  text-black
                  bg-white 
                  border-2
                  rounded-md
                  outline-none
                  transition
                  border-neutral-300
                  focus:border-black`}/>
            {type === "focus" && <label
                className={`
          absolute     
          text-xs
          px-1
          text-neutral-400
          duration-150 
          -translate-y-5
          bg-white
          font-bold
          left-8
          z-10 
          origin-[0] 
          peer-placeholder-shown:scale-100 
          peer-placeholder-shown:translate-y-0 
          peer-focus:scale-90
          peer-focus:-translate-y-5
          peer-focus:text-black
        `}
            >
                {label}
            </label>}
        </div>
    )
}

export default Input