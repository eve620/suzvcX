"use client"
import Modal from "@/app/components/modals/Modal";
import {useState} from "react";
import 'react-image-crop/dist/ReactCrop.css'
import type {UploadProps} from 'antd';
import useAvatarModal from "@/app/hooks/useAvatarModal";
import "@/app/components/modals/css/avatarModal.css";
import AntCrop from "@/app/components/AntCrop";
import showMessage from "@/app/components/Message";
import {useRouter} from "next/navigation";


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
const AvatarModal: React.FC = () => {
    const [imageUrl, setImageUrl] = useState<string>();
    const avatarModal = useAvatarModal()
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

    const onChangeAvatar = async () => {
        if (!imageUrl) {
            avatarModal.onClose()
            return
        }
        const save = await fetch("http://localhost:3000/api/auth/user/avatar", {
            method: "PUT",
            body: JSON.stringify({base64Image: imageUrl})
        })
        const message = await save.json()
        if (save.ok) {
            showMessage(message.message)
            avatarModal.onClose()
            setImageUrl("")
            router.refresh()
        } else {
            showMessage(message.error)
        }
    };
    const bodyContent = (
        <div className={"flex justify-center h-full items-center"}>
            <div id={"avatar"}>
                <AntCrop beforeUpload={beforeUpload} handleChange={handleChange} imageUrl={imageUrl}/>
            </div>
        </div>
    )
    return (
        <Modal isOpen={avatarModal.isOpen}
               onClose={() => {
                   avatarModal.onClose()
                   setImageUrl("")
               }}
               onSubmit={onChangeAvatar}
               body={bodyContent}
               actionLabel={"保存"}/>
    )
}

export default AvatarModal