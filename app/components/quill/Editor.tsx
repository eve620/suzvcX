import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import('react-quill'), {ssr: false});
import 'react-quill/dist/quill.snow.css';
import {ControllerRenderProps, FieldValues} from "react-hook-form";

interface EditorProps {
    field: ControllerRenderProps<FieldValues,"value">;
}

const Editor: React.FC<EditorProps> = ({field}) => {

    const options = {
        modules: {
            toolbar: true,
        },
        placeholder: 'Compose an epic...',
        theme: 'snow'
    };
    return (
        <ReactQuill
            {...field}
            {...options}/>
    );
};

export default Editor;