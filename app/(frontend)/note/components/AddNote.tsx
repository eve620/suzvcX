import {useController, useForm} from "react-hook-form";
import Editor from "@/app/components/quill/Editor";
import Button from "@/app/components/Button";

interface AddNoteProps {
    onSubmit: (data: any) => void;
    onCancel: () => void;
}

const AddNote: React.FC<AddNoteProps> = ({onSubmit, onCancel}) => {
    const {
        register,
        handleSubmit,
        control,
        watch,
        formState
    } = useForm()
    const {field} = useController({
        name: 'content',
        control
    })
    let content = watch("content")
    return (
        <form className={"space-y-2"}>
            <div>
                <div className={"text-sm font-bold"}>标题</div>
                <input className={"border-2 rounded pl-1"}/>
            </div>
            <div>
                <div className={"text-sm font-bold"}>内容</div>
                <Editor field={field}/>
            </div>
            <div className={"flex justify-end gap-3"}>
                <Button onClick={onCancel} label={"取消"}/>
                <Button onClick={() => {
                    console.log(content)
                }} label={"保存"}/>
            </div>
        </form>
    )
}

export default AddNote