"use client"
import {Modal as AntdModal} from "antd";
import React, {useState} from "react";
import showMessage from "@/app/components/Message";

interface ProjectListProps {
    projectList: any[]
}

const ProjectList: React.FC<ProjectListProps> = ({projectList}) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewTitle, setPreviewTitle] = useState('');
    const [images, setImages] = useState<string[]>([""])
    const [imageIndex, setImageIndex] = useState(0)
    const showImages = (images: string[]) => {
        setImages(images)
        setPreviewOpen(true)
    }
    return (
        <div className="sm:columns-2 sm:gap-6 lg:columns-3 lg:gap-8">
            {projectList.map(item => {
                return (
                    <div key={item.id}
                         className="
                             mb-8
                             sm:break-inside-avoid
                             rounded-xl
                             shadow-lg
                             duration-200
                             transition-shadow
                             dark:bg-gray-700 dark:hover:shadow-blue-400/40
                             hover:shadow-2xl hover:shadow-purple-400/50">
                        <div className={"flex flex-col p-6"}>
                            <div className={"flex flex-wrap justify-between text-nowrap"}>
                                <span className={"font-bold duration-200 text-black dark:text-white"}>{item.title}</span>
                                <span className={"text-sm"}>{item.job}</span>
                            </div>
                            <div className={"mt-4 w-full"}>
                                {JSON.parse(item.stacks).map((stack: string, index: number) => {
                                    return (
                                        <span className={"tag mr-2 inline-block text-wrap"}
                                              key={index}>{stack}</span>)
                                })}
                            </div>
                            <div className={""}>
                                <p>{item.describe}</p>
                            </div>
                            <div className={"mt-4"}>
                                <p>{item.highlight}</p>
                            </div>
                            <div className={"my-4"}/>
                            <div className={"flex justify-between text-xs"}>
                                <p className={"text-gray-400"}>{item.startTime + "-" + item.endTime}</p>
                                <p className={"text-blue-500 cursor-pointer"} onClick={() => {
                                    if (!JSON.parse(item.imageUrl).length) {
                                        showMessage("无图片")
                                        return
                                    }
                                    showImages(JSON.parse(item.imageUrl))
                                }}>show images</p>
                            </div>
                        </div>
                    </div>
                )
            })}
            <AntdModal open={previewOpen} title={previewTitle} footer={null} width={800} onCancel={() => {
                setPreviewOpen(false)
            }}>
                <div className={"pt-8"}>
                    <img alt="example" className={"w-full"}
                         src={`/storage/project/${images[imageIndex]}`}/>
                    <div className={"flex justify-between pt-3"}>
                        <button className={"hover:text-fuchsia-400"} onClick={() => {
                            if (imageIndex > 0) setImageIndex(imageIndex - 1)
                            else setImageIndex(images.length - 1)
                        }}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="2em"
                                height="2em"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1"
                                    d="m15 5l-6 7l6 7"
                                />
                            </svg>
                        </button>
                        <div className={'space-x-1 flex items-center'}>
                            {images.map((item: string, index: number) => {
                                return (
                                    <div onClick={() => {
                                        setImageIndex(index)
                                    }}
                                         className={`rounded-full duration-100 hover:bg-fuchsia-300 ${index === imageIndex ? "size-[0.6rem] bg-fuchsia-300" : "size-2 bg-pink-200"} hover:size-[0.6rem] `}
                                         key={index}/>)
                            })}
                        </div>
                        <button className={"hover:text-fuchsia-400"} onClick={() => {
                            if (imageIndex < images.length - 1) setImageIndex(imageIndex + 1)
                            else setImageIndex(0)
                        }}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="2em"
                                height="2em"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1"
                                    d="m9 5l6 7l-6 7"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </AntdModal>
        </div>
    )
}

export default ProjectList