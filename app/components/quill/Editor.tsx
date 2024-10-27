import dynamic from "next/dynamic";
import './quill.css'
const ReactQuill = dynamic(() => import('react-quill'), {ssr: false});
import 'react-quill/dist/quill.snow.css';

interface EditorProps {
    // field: ControllerRenderProps<FieldValues, "content">;
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
}

const Editor: React.FC<EditorProps> = ({value,setValue}) => {
    const options = {
        modules: {
            toolbar: true,
        },
        theme: 'snow'
    };
    const handleChange = (value:string) => {
        setValue(value);
    };
    return (
        <ReactQuill
            {...options}
            value={value}
            onChange={handleChange}/>
        // <ReactQuill
        //     onBlur={field.onBlur}
        //     value={field.value}
        //     onChange={field.onChange}
        //     {...options}/>
    );
};

export default Editor;