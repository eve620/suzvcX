import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import('react-quill'), {ssr: false});
import 'react-quill/dist/quill.snow.css';
import {FieldValues, UseFormRegister} from "react-hook-form";

interface EditorProps {
    id: string
    register: UseFormRegister<FieldValues>;
}

const Editor: React.FC = () => {

    const options = {
        modules: {
            toolbar: true,
        },
        placeholder: 'Compose an epic...',
        theme: 'snow'
    };
    return (
        <ReactQuill {...options}/>
    );
};

export default Editor;