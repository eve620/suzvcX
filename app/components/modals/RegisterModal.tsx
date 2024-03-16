"use client"
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "@/app/components/modals/Modal";

const RegisterModal = () => {
    const registerModal = useRegisterModal()
    return (<Modal isOpen={registerModal.isOpen}
                   onClose={registerModal.onClose}
                   onSubmit={registerModal.onClose}
                   actionLabel={"注册"}/>
    )
}

export default RegisterModal