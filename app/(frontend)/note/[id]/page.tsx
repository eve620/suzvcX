"use client"
import ContentPage from "@/app/(frontend)/note/components/ContentPage";
interface Props {
    params: { id: string }
}

export default function Page({params}: Props) {
    const note = {
        id: Number(params.id),
        title: "Note Title",
        content: "Note Content",
        tags: ["tag1", "tag2"]
    }
    return (
        <ContentPage note={note}/>
    )
}