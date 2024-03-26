"use client"
import Modal from "@/app/components/modals/Modal";
import useProjectModal from "@/app/hooks/useProjectModal";

const ProjectModal: React.FC = () => {
    const projectModal = useProjectModal()
    return (
        <Modal isOpen={projectModal.isOpen} onClose={projectModal.onClose} onSubmit={projectModal.onClose}
               actionLabel={"添加"}/>
    )
}

export default ProjectModal