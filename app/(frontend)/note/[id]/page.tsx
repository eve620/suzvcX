import Back from "@/app/components/Back";

interface Props {
    params: { id: string }
}

export default function Page({params}: Props) {
    return (
        <div>
            <Back url={"/note"}></Back>
            <div>My Note: {params.id}</div>
        </div>
    )
}