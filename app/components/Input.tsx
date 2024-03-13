import {FieldErrors, FieldValues, UseFormRegister} from "react-hook-form";

interface InputProps {
    id: string;
    label?: string;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors
}

const Input: React.FC<InputProps> = ({id, label, register, errors}) => {
    return (
        <div className={"flex text-nowrap"}>
            <span>{label}</span>
            <input {...register(id)}
                   className={"w-56 outline-0 border-b-2 px-2 py-1 focus:outline-1"}
                   placeholder={id}/>
            {errors[id] && <span>{errors[id]?.message as string}</span>}
        </div>
    )
}

export default Input