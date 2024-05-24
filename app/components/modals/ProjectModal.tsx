"use client"
import Modal from "@/app/components/modals/Modal";
import useProjectModal from "@/app/hooks/useProjectModal";
import Input from "@/app/components/Input";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {GetProp, Modal as AntdModal, Upload, UploadFile, UploadProps} from "antd"
import {useState} from "react";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {SafeUser} from "@/types";
import {useRouter} from "next/navigation";

interface ProjectModalProps {
    currentUser?: SafeUser | null
}

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

const schema = z.object({
    title: z.string(),
    job: z.string(),
    startTime: z.string().regex(/^\d{4}\.\d{1,2}$/, {message: '时间格式必须为YYYY.M'}),
    endTime: z.string().regex(/^\d{4}\.\d{1,2}$/, {message: '时间格式必须为YYYY.M'}),
    stack: z.string(),
    describe: z.string(),
    highlight: z.string(),
})

const ProjectModal: React.FC<ProjectModalProps> = ({currentUser}) => {
    const projectModal = useProjectModal()
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm<z.infer<typeof schema>>({
        defaultValues: {
            title: '',
            job: '',
            startTime: '',
            endTime: '',
            stack: '',
            describe: '',
            highlight: '',
        },
        resolver: zodResolver(schema)
    })
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
        setFileList(newFileList);
    }

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        // @ts-ignore
        if (!currentUser) return
        const formData = new FormData()
        formData.append('title', data.title || "")
        formData.append('job', data.job || "")
        formData.append('stack', JSON.stringify(data.stack.trim().split(" ")) || "[]")
        formData.append('startTime', data.startTime || "")
        formData.append('endTime', data.endTime || "")
        formData.append('describe', data.describe || "")
        formData.append('highlight', data.highlight || "")
        formData.append('createdBy', currentUser.id.toString())
        fileList.forEach((item, index) => {
            formData.append(`image${index}`, item.originFileObj as FileType)
        })
        const res = await fetch('/api/project', {
            method: 'POST',
            body: formData
        })
        if (res.ok) {
            projectModal.onClose()
            reset()
            setFileList([])
            router.refresh()
        }

    }

    const uploadButton = (
        <button style={{border: 0, background: 'none'}} type="button">
            <div style={{marginTop: 8}}>Upload</div>
        </button>
    );
    const bodyContent = (
        <form className={"space-y-3"}>
            <Input id={"title"} label={"标题"} register={register} errors={errors}/>
            <Input id={"startTime"} label={"开始时间"} register={register} errors={errors}/>
            <Input id={"endTime"} label={"结束时间"} register={register} errors={errors}/>
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
                    <img alt="example" style={{width: '100%'}} className={"hover:hidden"} src={previewImage}/>
                </AntdModal>
            </>
        </form>
    )
    return (
        <Modal isOpen={projectModal.isOpen}
               onClose={() => {
                   reset()
                   projectModal.onClose()
                   setFileList([])
               }}
               onSubmit={handleSubmit(onSubmit)}
               body={bodyContent}
               actionLabel={"添加"}/>
    )
}

export default ProjectModal