import {FieldErrors, FieldValues, UseFormRegister} from "react-hook-form";

interface InputProps {
    id: string;
    label?: string;
    type?: string
    register: UseFormRegister<any>;
    errors: FieldErrors
}

const Input: React.FC<InputProps> = ({
                                         id,
                                         label,
                                         type = "text",
                                         register,
                                         errors,
                                     }) => {
    return (
        <div className="w-full px-5 relative flex items-center justify-between">
            <label
                className={`
                text-nowrap
                text-sm
                ${errors[id] ? 'text-rose-500' : 'text-zinc-400'}
        `}
            >
                {label}
            </label>
            <input
                id={id}
                {...register(id)}
                placeholder=" "
                type={type}
                className={`
          w-5/6
          p-2
          font 
          bg-white 
          border-2
          rounded-md
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
          ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
        `}
            />
            <label className={"absolute right-5 text-sm text-rose-500"}>{errors[id]?.message as string}</label>
        </div>
        // old input
        // <div className="w-full relative">
        //     <input
        //         id={id}
        //         {...register(id)}
        //         placeholder=" "
        //         type={type}
        //         className={`
        //   peer
        //   w-full
        //   p-4
        //   pt-6
        //   font
        //   bg-white
        //   border-2
        //   rounded-md
        //   outline-none
        //   transition
        //   disabled:opacity-70
        //   disabled:cursor-not-allowed
        //   ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
        //   ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
        // `}
        //     />
        //     <label
        //         className={`
        //   absolute
        //   text-sm
        //   duration-150
        //   transform
        //   -translate-y-3
        //   top-5
        //   left-3
        //   z-10
        //   origin-[0]
        //   peer-placeholder-shown:scale-100
        //   peer-placeholder-shown:translate-y-0
        //   peer-focus:scale-75
        //   peer-focus:-translate-y-4
        //   ${errors[id] ? 'text-rose-500' : 'text-zinc-400'}
        // `}
        //     >
        //         {label}
        //     </label>
        //     <label className={"absolute right-5 top-6 text-sm text-rose-500"}>{errors[id]?.message as string}</label>
        // </div>
    )
}

export default Input