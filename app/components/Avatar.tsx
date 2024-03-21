import Image from "next/image";

const defaultAvatar = "/avatar.jpg"
const getAvatar = (avatar?: string) => {
  if (avatar != undefined && avatar.length == 0) {
    return avatar
  }
  return defaultAvatar
}

const Avatar = (props: { avatar?: string }) => {
  return (
      <Image src={getAvatar(props.avatar)} alt="avatar" width={100} height={100}/>
  )
}

export default Avatar