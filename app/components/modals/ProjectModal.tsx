"use client"
import Modal from "@/app/components/modals/Modal";
import useProjectModal from "@/app/hooks/useProjectModal";
import FormInput from "@/app/components/FormInput";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {Modal as AntdModal, Upload, UploadFile, UploadProps} from "antd"
import {useEffect, useMemo, useRef, useState} from "react";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {SafeUser} from "@/types";
import {useRouter} from "next/navigation";
import Image from "next/image";
import showMessage from "@/app/components/Message";
import Button from "@/app/components/Button";

interface ProjectModalProps {
    currentUser?: SafeUser | null
}

const getBase64 = (file: Blob): Promise<string> =>
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
    } = useForm({
        resolver: zodResolver(schema)
    })
    const [stacks, setStacks] = useState([])
    const [newStack, setNewStack] = useState('')

    // 使用 useEffect 来处理数据加载并更新表单的默认值
    useEffect(() => {
        reset({
            title: projectModal.curProject?.title || '',
            job: projectModal.curProject?.job || '',
            startTime: projectModal.curProject?.startTime || '',
            endTime: projectModal.curProject?.endTime || '',
            describe: projectModal.curProject?.describe || '',
            highlight: projectModal.curProject?.highlight || '',
        })
        if (projectModal.curProject) {
            setStacks(JSON.parse(projectModal.curProject?.stacks))
            let exist = JSON.parse(projectModal.curProject?.imageUrl).map(item => {
                const parts = item.split("_", 1);
                const lastPart = item.substring(parts[0].length + 1)
                return {
                    uid: crypto.randomUUID(),
                    name: lastPart,
                    fileName: item,
                    status: 'uploaded',
                    url: `/storage/project/${item}`,
                }
            })
            setFileList(exist)
        }
    }, [projectModal.curProject, reset])

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as Blob);
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
        if (!currentUser) {
            showMessage('未登录')
            return
        }
        const formData = new FormData()
        formData.append('title', data.title || "")
        formData.append('job', data.job || "")
        formData.append('stacks', JSON.stringify(stacks || []))
        formData.append('startTime', data.startTime || "")
        formData.append('endTime', data.endTime || "")
        formData.append('describe', data.describe || "")
        formData.append('highlight', data.highlight || "")
        formData.append('createdBy', currentUser.id.toString())
        let uploaderImage = []
        fileList.forEach((item, index) => {
            if (item.originFileObj) {
                formData.append('images[]', item.originFileObj as Blob);
            }
            if (item.status === 'uploaded') {
                uploaderImage.push(item.fileName)
            }
        });
        let res
        if (projectModal.curProject && projectModal.curProject.id) {
            formData.append('id', projectModal.curProject.id)
            formData.append('uploadedImage', JSON.stringify(uploaderImage))
            showMessage('更新逻辑')
            res = await fetch('/api/project', {
                method: 'PUT',
                body: formData as BodyInit
            })
        } else {
            res = await fetch('/api/project', {
                method: 'POST',
                body: formData as BodyInit
            })
        }

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
            <FormInput id={"title"} label={"标题"} register={register} errors={errors}/>
            <FormInput id={"startTime"} label={"开始时间"} register={register} errors={errors}/>
            <FormInput id={"endTime"} label={"结束时间"} register={register} errors={errors}/>
            <FormInput id={"job"} label={"职责"} register={register} errors={errors}/>
            <div className="w-full px-5 relative flex items-center justify-between">
                <label className={'text-nowrap text-sm'}>
                    技术栈
                </label>
                <div className={'w-5/6'}>
                    {stacks.length !== 0 &&
                        <div
                            className={'border-neutral-300 flex flex-wrap gap-2 p-2 mb-2 bg-transparent border dark:border-neutral-600 rounded-md outline-none transition'}>
                            {stacks.map((item, index) => {
                                return <span onClick={() => {
                                    const newStacks = [...stacks];
                                    newStacks.splice(index, 1);
                                    setStacks(newStacks)
                                }}
                                             className={'tag'}>{item}</span>
                            })}
                        </div>}
                    <div className={'flex gap-3 items-center'}>
                        <input value={newStack}
                               className={'px-2 py-1 bg-transparent rounded-md outline-none border dark:border-neutral-600 dark:focus:border-white transition'}
                               onChange={(e) => setNewStack(e.target.value)}/>
                        <Button label={'添加'} onClick={() => {
                            if (newStack.trim().length === 0) {
                                showMessage('不能为空')
                                setNewStack('')
                                return
                            }
                            console.log(newStack)
                            setStacks([...stacks, newStack.trim()])
                            setNewStack('')
                        }}/>
                    </div>
                </div>
            </div>
            <div className="w-full px-5 relative flex items-center justify-between">
                <label className={`
                text-nowrap
                text-sm
                ${errors['describe'] && 'text-rose-500'}`}>
                    描述
                </label>
                <textarea
                    {...register('describe')}
                    maxLength={100}
                    className="w-5/6 p-2 font bg-transparent border dark:border-neutral-600 dark:focus:border-white
                    rounded-md outline-none transition min-h-20 max-h-42"
                    placeholder={"请输入描述"}/>
                <label
                    className={"absolute right-8 text-sm text-rose-500"}>{errors['describe']?.message as string}</label>
            </div>
            <div className="w-full px-5 relative flex items-center justify-between">
                <label className={`
                text-nowrap
                text-sm
                ${errors['describe'] && 'text-rose-500'}`}>
                    亮点
                </label>
                <textarea
                    {...register('highlight')}
                    maxLength={100}
                    className="w-5/6 p-2 font bg-transparent border dark:border-neutral-600 dark:focus:border-white
                    rounded-md outline-none transition min-h-20 max-h-42"
                    placeholder={"请输入亮点"}/>
                <label
                    className={"absolute right-8 text-sm text-rose-500"}>{errors['describe']?.message as string}</label>
            </div>
            <Upload
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                accept="image/*"
            >
                {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            <AntdModal open={previewOpen} title={previewTitle} footer={null} width={1000} onCancel={() => {
                setPreviewOpen(false)
            }}>
                <Image width={10000} height={10000} className={'object-contain mx-auto max-h-[40em]'} alt="example"
                       src={previewImage}/>
            </AntdModal>
        </form>
    )
    return (
        <Modal isOpen={projectModal.isOpen}
               onClose={() => {
                   reset()
                   projectModal.onClose()
                   setFileList([])
                   setStacks([])
                   setNewStack('')
               }}
               onSubmit={handleSubmit(onSubmit)}
               body={bodyContent}
               actionLabel={"保存"}/>
    )
}

export default ProjectModal