"use client"
import Modal from "@/app/components/modals/Modal";
import useProfileModal from "@/app/hooks/useProfileModal";

const ProfileModal: React.FC = () => {
    const profileModal = useProfileModal()
    const bodyContent =(
        <div>123</div>
    )
    return (
        <Modal isOpen={profileModal.isOpen}
               onClose={() => {
                   profileModal.onClose()
               }}
               onSubmit={() => {
                   profileModal.onClose()
               }}
               body={bodyContent}
               actionLabel={"保存"}/>
    )
}

export default ProfileModal