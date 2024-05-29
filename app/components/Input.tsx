import {FieldErrors, FieldValues, UseFormRegister} from "react-hook-form";

interface InputProps {
    label?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
}

const Input: React.FC<InputProps> = ({
                                         onChange,
                                         value,
                                         label,
                                     }) => {
    return (
        <div className="w-full px-5 relative flex items-center justify-between">
            <label
                className={`
                text-nowrap
                text-sm
                text-zinc-400
        `}
            >
                {label}
            </label>
            <input
                onChange={onChange}
                value={value}
                placeholder=""
                className={`
          ${label?"w-5/6":"w-full"}
          p-2
          font 
          bg-white 
          border-2
          rounded-md
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          border-neutral-300
          focus:border-black
        `}
            />
        </div>
    )
}

export default Input