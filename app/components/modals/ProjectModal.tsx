"use client"
import Modal from "@/app/components/modals/Modal";
import useProjectModal from "@/app/hooks/useProjectModal";
import Input from "@/app/components/Input";
import {useForm} from "react-hook-form";

const ProjectModal: React.FC = () => {
    const projectModal = useProjectModal()
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm()
    const bodyContent = (
        <form className={"space-y-3"}>
            <Input id={"title"} label={"标题"} register={register} errors={errors}/>
            <Input id={"time"} label={"时间"} register={register} errors={errors}/>
            <Input id={"job"} label={"职责"} register={register} errors={errors}/>
            <Input id={"stack"} label={"技术栈"} register={register} errors={errors}/>
            <Input id={"describe"} label={"描述"} register={register} errors={errors}/>
            <Input id={"highlight"} label={"亮点"} register={register} errors={errors}/>
        </form>
    )
    return (
        <Modal isOpen={projectModal.isOpen}
               onClose={projectModal.onClose}
               onSubmit={projectModal.onClose}
               body={bodyContent}
               actionLabel={"添加"}/>
    )
}

export default ProjectModal