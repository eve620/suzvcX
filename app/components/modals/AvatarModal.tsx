"use client"
import Modal from "@/app/components/modals/Modal";
import {useState} from "react";
import 'react-image-crop/dist/ReactCrop.css'
import ImgCrop from "antd-img-crop";
import {Upload} from "antd";
import type {GetProp, UploadProps} from 'antd';
import useAvatarModal from "@/app/hooks/useAvatarModal";
import Image from "next/image";
import "@/app/components/modals/css/avatarModal.css";
import AntCrop from "@/app/components/AntCrop";

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (img, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
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
    const handleChange: UploadProps['onChange'] = (info) => {
        if (info.file.status === 'uploading') {
            console.log(info.file.originFileObj)
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj as FileType, (url) => {
                setImageUrl(url);
            });
        }
    };

    const uploadButton = (
        <button style={{border: 0, background: 'none'}} type="button">
            <div style={{marginTop: 8}}>Upload</div>
        </button>
    );
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
               onSubmit={() => {
                   avatarModal.onClose()
                   setImageUrl("")
               }}
               body={bodyContent}
               actionLabel={"保存"}/>
    )
}

export default AvatarModal