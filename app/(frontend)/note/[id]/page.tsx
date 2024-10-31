import ContentPage from "@/app/(frontend)/note/[id]/ContentPage";
import prisma from "@/prisma/client";

interface Props {
    params: { id: string }
}

export default async function Page({params}: Props) {
    const note = await prisma.note.findUnique({
        where: {
            id: Number(params.id)
        }
    })
    return (
        <ContentPage note={note}/>
    )
}