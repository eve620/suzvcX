"use client"
import Modal from "@/app/components/modals/Modal";
import useProfileModal from "@/app/hooks/useProfileModal";
import {SafeUser} from "@/types";
import {useForm} from "react-hook-form";
import {useState} from "react";
import {UploadProps} from "antd";
import "./css/profileModal.css"
import AntCrop from "@/app/components/AntCrop";
import Button from "@/app/components/Button";
import FormInput from "@/app/components/FormInput";

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

const ProfileModal: React.FC<ProfileModalProps> = ({currentUser}) => {
    const [imageUrl, setImageUrl] = useState<string>();
    const [isChangePassword, setIsChangePassword] = useState(false)
    const profileModal = useProfileModal()
    const handleChange: UploadProps['onChange'] = (info) => {
        if (info.file.status === 'uploading') {
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj as Blob, (url) => {
                setImageUrl(url);
            });
        }
    };

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm({
        defaultValues: {
            name: currentUser?.name ?? "",
            bio: currentUser?.bio ?? "",
        }
    })
    const uploadButton = (
        <button style={{border: 0, background: 'none'}} type="button">
            <div style={{marginTop: 8}}>Upload</div>
        </button>
    );
    const bodyContent = (
        <form className={"space-y-6 pl-6 pr-10"}>
            <div id={'profile'} className="w-full px-5 relative flex items-center justify-between">
                <label className={'text-nowrap text-sm'}>
                    密码
                </label>
                <div className={"w-4/5 pl-2"}>
                    <AntCrop beforeUpload={beforeUpload} handleChange={handleChange} imageUrl={imageUrl}/>
                </div>
            </div>
            <FormInput label={'用户名'} id={"user"} register={register} errors={errors}/>
            <div>
                {isChangePassword ? <div className={"flex flex-col gap-2"}>
                        <FormInput label={'原密码'} id={"password"} register={register} errors={errors}/>
                        <FormInput label={'新密码'} id={"oldpassword"} register={register} errors={errors}/>
                        <div className={'flex justify-end pr-5'}>
                            <Button label={"取消"} big
                                    onClick={() => {
                                        setIsChangePassword(false)
                                    }}/>
                        </div>
                    </div> :
                    <div className="w-full px-5 relative flex items-center justify-between">
                        <label className={`text-nowrap text-sm ${errors[''] && 'text-rose-500'}`}>
                            描述
                        </label>
                        <Button label={"修改密码"} onClick={() => {
                            setIsChangePassword(true)
                        }}/>
                    </div>
                }
            </div>
            <div className="w-full px-5 relative flex items-center justify-between">
                <label className={`
                text-nowrap
                text-sm
                ${errors[''] && 'text-rose-500'}`}>
                    描述
                </label>
                <textarea
                    {...register("bio")}
                    maxLength={100}
                    className="w-5/6 p-2 font bg-transparent border dark:border-neutral-600 dark:focus:border-white
                    rounded-md outline-none transition min-h-28"
                    placeholder={"请输入描述"}/>
                <label className={"absolute right-8 text-sm text-rose-500"}>{errors['']?.message as string}</label>
            </div>
        </form>
    )
    return (
        <Modal isOpen={profileModal.isOpen}
               onClose={() => {
                   profileModal.onClose()
                   setIsChangePassword(false)
                   setImageUrl("")
               }}
               onSubmit={() => {
                   profileModal.onClose()
                   setIsChangePassword(false)
                   setImageUrl("")
               }}
               body={bodyContent}
               actionLabel={"保存"}/>
    )
}

export default ProfileModal