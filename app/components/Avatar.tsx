import Image from "next/image";
import useAvatarModal from "@/app/hooks/useAvatarModal";

const defaultAvatar = "/storage/avatar/avatar.jpg"
const getAvatar = (avatar: string) => {
    if (avatar) {
        return `/storage/avatar/${avatar}`
    }
    return defaultAvatar
}

const Avatar = (props: { avatar: string }) => {
    const avatarModal = useAvatarModal()
    return (
        <div
            className={"w-10 h-10 bg-blue-300 rounded-full overflow-hidden mr-2 cursor-pointer hover:opacity-80"}
            onClick={avatarModal.onOpen}>
            <Image src={getAvatar(props.avatar)} alt="avatar" width={100} height={100}/>
        </div>

    )
}

export default Avatar