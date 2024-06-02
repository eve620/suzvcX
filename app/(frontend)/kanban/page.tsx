import KanbanBoard from "@/app/(frontend)/kanban/KanbanBoard";
import getCurrentUser from "@/actions/getCurrentUser";

export interface eventDataProps {
    id?: number,
    title: string,
    toDo: string[],
    inProgress: string[],
    completed: string[]
}

export default async function Page() {
    const currentUser = await getCurrentUser()
    let eventData: eventDataProps[] = []
    if (currentUser) {
        const kanbanResponse = await fetch(`http://localhost:3000/api/kanban?id=${currentUser.id}`, {cache: "no-store"});
        if (kanbanResponse.ok) {
            const kanbanData = await kanbanResponse.json()
            eventData = kanbanData.data
        }
    }
    return (
        <KanbanBoard eventData={eventData}/>
    );
}