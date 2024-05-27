"use client"
import {useMemo, useState} from "react";
import TaskBox from "@/app/(frontend)/kanban/component/TaskBox";
import EventBar from "@/app/(frontend)/kanban/component/EventBar";
import "./App.css"
import "./component/event.css"
import "./component/task.css"
import {eventDataProps} from "@/app/(frontend)/kanban/page";

export interface KanbanBoardProps {
    eventData: eventDataProps[]
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({eventData}) => {
    const initEvent = useMemo(() => [
        {
            title: 'Default Event',
            toDo: [],
            inProgress: [],
            completed: [],
        },
    ], []);

    const [events, setEvents] = useState(eventData);
    const [currentEvent, setCurrentEvent] = useState(events[0] || {});

    return (
        <div className='App flex-1 min-w-fit'>
            <EventBar
                events={events}
                setEvents={setEvents}
                currentEvent={currentEvent}
                setCurrentEvent={setCurrentEvent}
            />
            {events.length ? <TaskBox
                setEvents={setEvents}
                currentEvent={currentEvent}
                events={events}
                setCurrentEvent={setCurrentEvent}
            /> : <div className={"flex-1 flex justify-center items-center text-3xl font-bold"}>please add first</div>}
        </div>
    );
}

export default KanbanBoard