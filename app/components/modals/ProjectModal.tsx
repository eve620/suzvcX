"use client"
import Modal from "@/app/components/modals/Modal";
import useProjectModal from "@/app/hooks/useProjectModal";
import Input from "@/app/components/Input";
import {useForm} from "react-hook-form";
import {GetProp, Modal as AntdModal, Upload, UploadFile, UploadProps} from "antd"
import {useState} from "react";


type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

const ProjectModal: React.FC = () => {
    const projectModal = useProjectModal()
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm()
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };

    const handleChange: UploadProps['onChange'] = ({file, fileList: newFileList}) => {
        console.log(newFileList)
        setFileList(newFileList);
    }


    const uploadButton = (
        <button style={{border: 0, background: 'none'}} type="button">
            <div style={{marginTop: 8}}>Upload</div>
        </button>
    );
    const bodyContent = (
        <form className={"space-y-3"}>
            <Input id={"title"} label={"标题"} register={register} errors={errors}/>
            <Input id={"time"} label={"时间"} register={register} errors={errors}/>
            <Input id={"job"} label={"职责"} register={register} errors={errors}/>
            <Input id={"stack"} label={"技术栈"} register={register} errors={errors}/>
            <Input id={"describe"} label={"描述"} register={register} errors={errors}/>
            <Input id={"highlight"} label={"亮点"} register={register} errors={errors}/>
            <>
                <Upload
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                >
                    {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                <AntdModal open={previewOpen} title={previewTitle} footer={null} onCancel={() => {
                    setPreviewOpen(false)
                }}>
                    <img alt="example" style={{width: '100%'}} src={previewImage}/>
                </AntdModal>
            </>
        </form>
    )
    return (
        <Modal isOpen={projectModal.isOpen}
               onClose={() => {
                   projectModal.onClose()
                   setFileList([])
               }}
               onSubmit={projectModal.onClose}
               body={bodyContent}
               actionLabel={"添加"}/>
    )
}

export default ProjectModal