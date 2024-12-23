import ContentPage from "@/app/(frontend)/note/[id]/ContentPage";
import prisma from "@/prisma/client";
import EmptyState from "@/app/components/EmptyState";

interface Props {
    params: { id: string }
}

export default async function Page({params}: Props) {
    const note = await prisma.note.findUnique({
        where: {
            id: Number(params.id)
        }
    })
    if (!note) {
        return <EmptyState/>
    }
    return (
        <ContentPage note={note}/>
    )
}