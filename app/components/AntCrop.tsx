import ImgCrop from "antd-img-crop";
import {ConfigProvider, Upload} from "antd";
import Image from "next/image";
import zhCN from "antd/locale/zh_CN";
import {Upload as UploadIcon} from 'lucide-react'

const AntCrop = ({beforeUpload, handleChange, imageUrl}: any) => {
    return (
        <ConfigProvider locale={zhCN}>
            <ImgCrop rotationSlider>
                <Upload
                    name="avatar"
                    listType="picture-card"
                    showUploadList={false}
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                >
                    {imageUrl ? <Image src={imageUrl} alt="avatar" width={200} height={200}/> :
                        <UploadIcon className={'text-neutral-500 dark:text-gray-200'}/>
                    }
                </Upload>
            </ImgCrop>
        </ConfigProvider>
    )
}

export default AntCrop