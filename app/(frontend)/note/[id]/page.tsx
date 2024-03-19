import Back from "@/app/components/Back";

interface Props {
    params: { id: string }
}

export default function Page({params}: Props) {
    return (
        <div className={""}>
            <Back url={"/note"}></Back>
            <div className={"bg-white flex-1"}>My Note: {params.id}</div>
        </div>
    )
}