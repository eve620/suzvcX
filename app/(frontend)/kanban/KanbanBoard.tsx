"use client"
import {useMemo, useState} from "react";
import TaskBox from "@/app/(frontend)/kanban/component/TaskBox";
import EventBar from "@/app/(frontend)/kanban/component/EventBar";
import "./App.css"
import "./component/event.css"
import "./component/task.css"

const KanbanBoard: React.FC = () => {
    const initEvent = useMemo(() => [
        {
            title: 'Default Event',
            'To do': [],
            'In progress': [],
            'Completed': [],
        },
    ], []);

    const [events, setEvents] = useState(() => {
        return initEvent;
    });

    const [currentEvent, setCurrentEvent] = useState(events[0]);

    return (
        <div className='App flex-1 min-w-fit'>
            <EventBar
                events={events}
                setEvents={setEvents}
                currentEvent={currentEvent}
                setCurrentEvent={setCurrentEvent}
            />
            <TaskBox
                setEvents={setEvents}
                currentEvent={currentEvent}
                events={events}
                setCurrentEvent={setCurrentEvent}
            />
        </div>
    );
}

export default KanbanBoard