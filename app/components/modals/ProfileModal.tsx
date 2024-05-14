"use client"
import Modal from "@/app/components/modals/Modal";
import useProfileModal from "@/app/hooks/useProfileModal";
import {SafeUser} from "@/types";
import {useForm} from "react-hook-form";
import { useState} from "react";
import ImgCrop from "antd-img-crop";
import {GetProp, Upload, UploadProps} from "antd";
import Image from "next/image";
import "./css/profileModal.css"

interface ProfileModalProps {
    currentUser?: SafeUser | null
}

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType) => {
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
            getBase64(info.file.originFileObj as FileType, (url) => {
                setImageUrl(url);
            });
        }
    };
    const {
        register,
        handleSubmit,
        formState: {errors,}
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
        <form className={"space-y-6 pl-6 pr-10 text-black"}>
            <div id={"profile"} className={"flex justify-center items-center"}>
                <label className={"text-sm w-1/5 text-end pr-3 font-bold inline-block"}>头像:</label>
                <div className={"w-4/5 pl-2"}>
                    <ImgCrop rotationSlider>
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            showUploadList={false}
                            beforeUpload={beforeUpload}
                            onChange={handleChange}
                        >
                            {imageUrl ? <Image src={imageUrl} alt="avatar" width={80} height={80}/> : uploadButton}
                        </Upload>
                    </ImgCrop>
                </div>
            </div>
            <div className={"flex justify-center items-center"}>
                <label className={"w-1/5 text-sm text-end pr-3 font-bold inline-block"}>用户名:</label>
                <input
                    {...register("name")}
                    className={" rounded-md w-4/5 px-4 py-2 mt-1 outline outline-1 outline-neutral-300 focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2"}
                    placeholder={"请输入用户名"}/>
            </div>
            <div className={"flex justify-center"}>
                <label className={"text-sm w-1/5 text-end pr-3 pt-1 font-bold inline-block"}>密码:</label>
                <div className={"w-4/5"}>
                    {isChangePassword ? <div className={"flex flex-col gap-2"}>
                            <input
                                className={"rounded-md block px-4 py-2 mt-1 outline outline-1 outline-neutral-300 focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2"}
                                placeholder={"请输入原密码"}/>
                            <input
                                className={"rounded-md px-4 py-2 mt-1 outline outline-1 outline-neutral-300 focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2"}
                                placeholder={"请输入新密码"}/>
                            <button className={"bg-black text-white text-sm font-bold px-2 py-1 rounded w-16 self-end"}
                                    onClick={() => {
                                        setIsChangePassword(false)
                                    }}>取消
                            </button>
                        </div> :
                        <button className={"bg-black text-white text-sm font-bold px-2 py-1 ml-2 rounded"}
                                onClick={() => {
                                    setIsChangePassword(true)
                                }}>修改密码</button>}
                </div>

            </div>
            <div className={"flex justify-center"}>
                <label className={"text-sm w-1/5 text-end pr-3 pt-2 font-bold inline-block"}>描述:</label>
                <textarea
                    {...register("bio")}
                    maxLength={100}
                    className={"w-4/5 h-auto min-h-32 max-h-56 rounded-md px-4 py-2 mt-2 outline outline-1 outline-neutral-300 focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2"}
                    placeholder={"请输入描述"}/>
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