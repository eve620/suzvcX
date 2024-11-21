import {FieldErrors, UseFormRegister} from "react-hook-form";

interface InputProps {
    id: string;
    label?: string;
    type?: string;
    register: UseFormRegister<any>;
    errors: FieldErrors;
    disabled?: boolean
}

const FormInput: React.FC<InputProps> = ({
                                             id,
                                             label,
                                             type = "text",
                                             register,
                                             errors,
                                             disabled = false
                                         }) => {
    return (
        <div className="w-full px-5 relative flex items-center justify-between">
            <label
                className={`
                text-nowrap
                text-sm
                ${errors[id] && 'text-rose-500'}
        `}
            >
                {label}
            </label>
            <input
                disabled={disabled}
                id={id}
                {...register(id)}
                onKeyDown={(e) => {
                    if (e.key === " ") {
                        e.preventDefault();
                    }
                }}
                type={type}
                className={`
          w-5/6
          p-2
          bg-transparent
          border
          dark:border-neutral-600
          dark:focus:border-white
          rounded-md
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
          ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
        `}
            />
            <label className={"absolute right-8 text-sm text-rose-500"}>{errors[id]?.message as string}</label>
        </div>
    )
}

export default FormInput