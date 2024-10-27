"use client"
import Modal from "@/app/components/modals/Modal";
import useTagModal from "@/app/hooks/useTagModal";
const TagModal = () => {
    const tagModal = useTagModal()
    const bodyContent = (
        <div className={"space-y-6"}>
            标签编辑
        </div>
    )
    return (<Modal isOpen={tagModal.isOpen}
                   onClose={tagModal.onClose}
                   onSubmit={()=>{
                       console.log(111)}}
                   body={bodyContent}
                   actionLabel={"保存"}/>
    )
}
export default TagModal