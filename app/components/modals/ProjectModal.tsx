"use client"
import Modal from "@/app/components/modals/Modal";
import useProjectModal from "@/app/hooks/useProjectModal";
import FormInput from "@/app/components/FormInput";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {Modal as AntdModal, Upload, UploadFile, UploadProps} from "antd"
import {useEffect, useState} from "react";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {SafeUser} from "@/types";
import {useRouter} from "next/navigation";
import Image from "next/image";
import showMessage from "@/app/components/Message";
import MyButton from "@/app/components/MyButton";
import * as React from "react"
import {Button} from "@/components/ui/button"
import {format} from "date-fns"
import {Calendar as CalendarIcon, Upload as UploadIcon} from "lucide-react"
import {DateRange} from "react-day-picker"
import {Calendar} from "@/components/ui/calendar"
import {zhCN} from "date-fns/locale";
import {cn} from "@/lib/utils";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

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
        defaultValues: {
            title: projectModal.curProject?.title || ''
        },
        resolver: zodResolver(schema)
    })
    const [stacks, setStacks] = useState([])
    const [newStack, setNewStack] = useState('')
    const [isRemove, setIsRemove] = useState(false)
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [date, setDate] = React.useState<DateRange | undefined>()

    useEffect(() => {
        reset({
            title: projectModal.curProject?.title || '',
            job: projectModal.curProject?.job || '',
            describe: projectModal.curProject?.describe || '',
            highlight: projectModal.curProject?.highlight || '',
        })
        if (projectModal.curProject) {
            setDate({
                from: projectModal.curProject.startTime ? new Date(projectModal.curProject.startTime) : undefined,
                to: projectModal.curProject.endTime ? new Date(projectModal.curProject.endTime) : undefined
            })
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

    const handleRemove = async () => {
        if (projectModal.curProject && projectModal.curProject.id) {
            const remove = await fetch("api/project", {
                method: "DELETE",
                body: projectModal.curProject.id,
            })
            if (remove.ok) {
                showMessage("删除成功")
            } else {
                showMessage("删除失败")
            }
            initData()
            projectModal.onClose()
            router.refresh()
        }
        setIsRemove(false)
    }
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
    const initData = () => {
        reset()
        setDate(undefined)
        setFileList([])
        setStacks([])
        setNewStack('')
    }
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        if (!currentUser) {
            showMessage('未登录')
            return
        }
        const formData = new FormData()
        formData.append('title', data.title || "")
        formData.append('job', data.job || "")
        formData.append('stacks', JSON.stringify(stacks || []))
        formData.append('describe', data.describe || "")
        formData.append('highlight', data.highlight || "")
        formData.append('createdBy', currentUser.id.toString())
        if (date?.from) {
            formData.append("startTime", date.from.toISOString()); // 开始日期
        }
        if (date?.to) {
            formData.append("endTime", date.to.toISOString()); // 结束日期
        }
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
            router.refresh()
            projectModal.onClose()
            initData()
        }

    }
    const bodyContent = (
        <form className={"space-y-3"}>
            <FormInput id={"title"} label={"标题"} register={register} errors={errors}/>
            <div className="w-full px-5 relative flex items-center justify-between">
                <label
                    className="text-nowrap text-sm"
                >
                    时间
                </label>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            id="date"
                            variant={"outline"}
                            className={cn(
                                "w-5/6 h-10 justify-start text-left font-normal bg-transparent border border-gray-300 dark:border-neutral-600",
                                !date && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4"/>
                            {date?.from ? (
                                date.to ? (
                                    <>
                                        {format(date.from, "yyyy年MM月dd日", {locale: zhCN})} -{" "}
                                        {format(date.to, "yyyy年MM月dd日", {locale: zhCN})}
                                    </>
                                ) : (
                                    format(date.from, "yyyy年MM月dd日", {locale: zhCN})
                                )
                            ) : (
                                <span>请选择日期...</span>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 dark:border-neutral-700 dark:bg-slate-950" align="start">
                        <Calendar
                            locale={zhCN}
                            initialFocus
                            mode="range"
                            defaultMonth={date?.from}
                            selected={date}
                            onSelect={setDate}
                            numberOfMonths={2}
                        />
                    </PopoverContent>
                </Popover>
            </div>
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
                                return <span key={index} onClick={() => {
                                    const newStacks = [...stacks];
                                    newStacks.splice(index, 1);
                                    setStacks(newStacks)
                                }}
                                             className={'tag'}>{item}</span>
                            })}
                        </div>}
                    <div className={'flex gap-3 items-center'}>
                        <input value={newStack}
                               onKeyDown={(e) => {
                                   if (e.key === " ") {
                                       e.preventDefault();
                                   }
                               }}
                               className={'px-2 py-1 bg-transparent rounded-md outline-none border dark:border-neutral-600 dark:focus:border-white transition'}
                               onChange={(e) => setNewStack(e.target.value)}/>
                        <MyButton label={'添加'} onClick={() => {
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
                    rounded-md outline-none transition min-h-[4.5em] max-h-28"
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
                    rounded-md outline-none transition min-h-[4.5em] max-h-28"
                    placeholder={"请输入亮点"}/>
                <label
                    className={"absolute right-8 text-sm text-rose-500"}>{errors['describe']?.message as string}</label>
            </div>
            <Upload
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                accept="image/*">
                {fileList.length >= 8 ? null : <UploadIcon className={'text-neutral-500 dark:text-gray-200'}/>}
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
        <>
            <Modal isOpen={projectModal.isOpen}
                   onClose={() => {
                       projectModal.onClose()
                       initData()
                   }}
                   secondaryActionLabel={'删除'}
                   secondaryAction={() => {
                       setIsRemove(true)
                   }}
                   onSubmit={handleSubmit(onSubmit)}
                   body={bodyContent}
                   actionLabel={"保存"}/>
            <Modal little title={"确定删除吗？"} isOpen={isRemove} secondaryAction={() => {
                setIsRemove(false)
            }} secondaryActionLabel={"取消"} onClose={() => {
                setIsRemove(false)
            }} onSubmit={handleRemove} actionLabel={"确认"}/>
        </>
    )
}

export default ProjectModal