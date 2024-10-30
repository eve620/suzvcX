import KanbanBoard from "@/app/(frontend)/kanban/KanbanBoard";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getEventList from "@/app/actions/getEventList";

export interface eventDataProps {
    id: number,
    title: string,
    toDo: string[],
    inProgress: string[],
    completed: string[]
}

export default async function Page() {
    let eventData: eventDataProps[] = await getEventList() || []
    return (
        <KanbanBoard eventData={eventData}/>
    );
}