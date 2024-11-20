"use client"
import Modal from "@/app/components/modals/Modal";
import useProfileModal from "@/app/hooks/useProfileModal";
import {SafeUser} from "@/types";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {UploadProps} from "antd";
import "./css/profileModal.css"
import AntCrop from "@/app/components/AntCrop";
import Button from "@/app/components/Button";
import FormInput from "@/app/components/FormInput";
import showMessage from "@/app/components/Message";
import {useRouter} from "next/navigation";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

interface ProfileModalProps {
    currentUser?: SafeUser | null
}

const getBase64 = (img: Blob, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
};

const beforeUpload = (file: File) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        console.log('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        console.log('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};

const userSchema = z.object({
    username: z.string().min(1, {message: "用户名不能为空"}),
    account: z.string(),
    oldPassword: z.string().refine(
        (value) => value === "" || value?.length >= 6,
        {message: "原密码至少需要6个字符"}
    ),
    newPassword: z.string().refine(
        (value) => value === "" || value?.length >= 6,
        {message: "新密码至少需要6个字符"}
    ),
    bio: z.string().optional(),
}).refine(
    (data) => !(data.oldPassword && !data.newPassword),
    {path: ['newPassword'], message: "请输入新密码"}
).refine(
    (data) => !(data.newPassword && !data.oldPassword),
    {path: ['oldPassword'], message: "请输入原密码"}
).refine(
    (data) => !data.newPassword || data.newPassword !== data.oldPassword,
    {path: ['newPassword'], message: "新密码与原密码相同"}
);

const ProfileModal: React.FC<ProfileModalProps> = ({currentUser}) => {
    const [imageUrl, setImageUrl] = useState<string>();
    const [isChangePassword, setIsChangePassword] = useState(false)
    const profileModal = useProfileModal()
    const router = useRouter()
    const handleChange: UploadProps['onChange'] = (info) => {
        if (info.file.status === 'uploading') {
            return;
        }
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj as Blob, (url) => {
                setImageUrl(url);
            });
        }
    };

    const {
        register,
        handleSubmit,
        formState: {errors},
        setValue,
        reset
    } = useForm({
        defaultValues: {
            username: currentUser?.username ?? "",
            account: currentUser?.account ?? "",
            oldPassword: "",
            newPassword: "",
            bio: currentUser?.bio ?? "",
        },
        resolver: zodResolver(userSchema)
    })
    const onSave: SubmitHandler<FieldValues> = async (data) => {
        const save = await fetch("http://localhost:3000/api/auth/user", {
            method: "PUT",
            body: JSON.stringify(data)
        })
        const message = await save.json()
        if (save.ok) {
            showMessage(message.message)
            profileModal.onClose()
            setIsChangePassword(false)
            setImageUrl("")
            router.refresh()
        } else {
            showMessage(message.error)
        }
    }

    useEffect(() => {
        reset({
            username: currentUser?.username ?? "",
            account: currentUser?.account ?? "",
            oldPassword: "",
            newPassword: "",
            bio: currentUser?.bio ?? "",
        })
    }, [currentUser, reset])

    const bodyContent = (
        <form className={"space-y-6 pl-6 pr-10"}>
            <div id={'profile'} className="w-full px-5 relative flex items-center justify-between">
                <label className={'text-nowrap text-sm'}>
                    头像
                </label>
                <div className={"w-5/6 flex justify-center"}>
                    <AntCrop beforeUpload={beforeUpload} handleChange={handleChange} imageUrl={imageUrl}/>
                </div>
            </div>
            <FormInput label={'用户名'} id={"username"} register={register} errors={errors}/>
            <FormInput label={'账号'} id={"account"} register={register} errors={errors} disabled/>
            {isChangePassword ? <div className={"flex flex-col space-y-6"}>
                    <FormInput label={'原密码'} id={"oldPassword"} register={register} errors={errors}/>
                    <FormInput label={'新密码'} id={"newPassword"} register={register} errors={errors}/>
                    <div className={'flex justify-end pr-5'}>
                        <Button label={"取消"} big
                                onClick={() => {
                                    setValue('newPassword', '')
                                    setValue('oldPassword', '')
                                    setIsChangePassword(false)
                                }}/>
                    </div>
                </div> :
                <div className="w-full px-5 relative flex items-center justify-between">
                    <label className={`text-nowrap text-sm ${errors[''] && 'text-rose-500'}`}>
                        密码
                    </label>
                    <Button label={"修改密码"} onClick={() => {
                        setIsChangePassword(true)
                    }}/>
                </div>
            }
            <div className="w-full px-5 relative flex items-center justify-between">
                <label className={`
                text-nowrap
                text-sm
                ${errors['describe'] && 'text-rose-500'}`}>
                    描述
                </label>
                <textarea
                    {...register('bio')}
                    maxLength={100}
                    className="w-5/6 p-2 font bg-transparent border dark:border-neutral-600 dark:focus:border-white
                    rounded-md outline-none transition min-h-28 max-h-52"
                    placeholder={"请输入描述"}/>
                <label
                    className={"absolute right-8 text-sm text-rose-500"}>{errors['describe']?.message as string}</label>
            </div>
        </form>
    )
    return (
        <Modal isOpen={profileModal.isOpen}
               onClose={() => {
                   profileModal.onClose()
                   setIsChangePassword(false)
                   setImageUrl("")
                   reset()
               }}
               onSubmit={handleSubmit(onSave)}
               body={bodyContent}
               actionLabel={"保存"}/>
    )
}

export default ProfileModal