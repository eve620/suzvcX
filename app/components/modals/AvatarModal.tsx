"use client"
import Modal from "@/app/components/modals/Modal";
import useAvatarModal from "@/app/hooks/useAvatarModal";
import {centerCrop, Crop, makeAspectCrop, ReactCrop} from "react-image-crop";
import {ChangeEvent, useState} from "react";
import 'react-image-crop/dist/ReactCrop.css'
import Image from "next/image";


const defaultAvatar = "/avatar.jpg"
const getAvatar = (avatar?: string) => {
    if (avatar != undefined && avatar.length == 0) {
        return avatar
    }
    return defaultAvatar
}

const AvatarModal: React.FC = () => {
    const [imgSrc, setImgSrc] = useState("")
    const [crop, setCrop] = useState<Crop>()
    const avatarModal = useAvatarModal()
    const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
        setImgSrc("")
        const file = e.target.files?.[0]
        if (!file) return
        const reader = new FileReader()
        reader.addEventListener("load", () => {
            const imageUrl = reader.result?.toString() || ""
            setImgSrc(imageUrl)
        })
        reader.readAsDataURL(file)
    }
    const onImageLoad = (e: any) => {
        const {width, height} = e.currentTarget
        const crop = makeAspectCrop(
            {
                unit: "%",
                width: 100,
            },
            1,
            width,
            height)
        const centeredCrop = centerCrop(crop, width, height)
        setCrop(centeredCrop)
    }
    const bodyContent = (
        <div className={""}>
            <label className={"block ms-3 w-fit"}>
                <span className={"sr-only"}>选择上传图片</span>
                <input type="file"
                       className={"block w-full text-sm text-slate-600 file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:bg-black file:text-white hover:file:opacity-80"}
                       accept="image/*"
                       onChange={onSelectFile}
                />
            </label>


            {imgSrc ?
                <div className={"flex justify-center"}>
                    <ReactCrop crop={crop} circularCrop aspect={1}
                               onChange={c => setCrop(c)} minWidth={10} keepSelection>
                        <Image src={imgSrc} alt={"avatar"} width={300} height={300} onLoad={onImageLoad}/>
                    </ReactCrop>
                </div> :
                <div
                    className={"flex justify-center items-center w-64 h-64 mx-auto border-2 bg-gray-200 border-black rounded-xl border-dotted"}>
                    <svg className="icon" viewBox="0 0 1024 1024" width="48" height="48">
                        <path d="M474 152m8 0l60 0q8 0 8 8l0 704q0 8-8 8l-60 0q-8 0-8-8l0-704q0-8 8-8Z"
                              fill="#2c2c2c"></path>
                        <path d="M168 474m8 0l672 0q8 0 8 8l0 60q0 8-8 8l-672 0q-8 0-8-8l0-60q0-8 8-8Z"
                              fill="#2c2c2c"></path>
                    </svg>
                </div>
            }
        </div>
    )
    return (
        <Modal isOpen={avatarModal.isOpen}
               onClose={() => {
                   avatarModal.onClose()
                   setImgSrc("")
               }}
               onSubmit={() => {
                   avatarModal.onClose()
                   setImgSrc("")
               }}
               body={bodyContent}
               actionLabel={"修改"}/>
    )
}

export default AvatarModal