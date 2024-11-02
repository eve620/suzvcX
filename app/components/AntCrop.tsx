import ImgCrop from "antd-img-crop";
import {Upload} from "antd";
import Image from "next/image";
const AntCrop = ({beforeUpload, handleChange, imageUrl}:any) => {
    const uploadButton = (
        <button style={{border: 0, background: 'none'}} type="button">
            <div style={{marginTop: 8}}>Upload</div>
        </button>
    );
    return (
        <ImgCrop rotationSlider>
            <Upload
                name="avatar"
                listType="picture-card"
                showUploadList={false}
                beforeUpload={beforeUpload}
                onChange={handleChange}
            >
                {imageUrl ? <Image src={imageUrl} alt="avatar" width={200} height={200}/> : uploadButton}
            </Upload>
        </ImgCrop>
    )
}

export default AntCrop