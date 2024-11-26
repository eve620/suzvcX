"use client"
import {useCallback, useEffect, useMemo, useState} from "react";
import TaskBox from "@/app/(frontend)/kanban/component/TaskBox";
import EventBar from "@/app/(frontend)/kanban/component/EventBar";
import {eventDataProps} from "@/app/(frontend)/kanban/page";

export interface KanbanBoardProps {
    eventData: eventDataProps[]
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({eventData}) => {
    const [events, setEvents] = useState<eventDataProps[]>(eventData);
    const [currentEvent, setCurrentEvent] = useState(events[0] || null);
    const [prevLength, setPrevLength] = useState(events.length);
    const updateProgress = useCallback(async () => {
        const response = await fetch("/api/kanban", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({events})
        });

        if (!response.ok) {
            console.error("Failed to update progress:", response.statusText);
        }
    }, [events]);
    useEffect(() => {
        const currentLength = events.length;
        if (currentLength !== prevLength) {
            // Length has changed, execute different logic
            updateProgress()
            setPrevLength(currentLength);
        } else {
            // Length has not changed, set a timeout
            const timeoutId = setTimeout(() => updateProgress(), 1000);
            return () => clearTimeout(timeoutId);
        }
    }, [updateProgress, prevLength, events]);

    return (
        <div className='flex flex-1 min-w-fit'>
            <EventBar
                events={events}
                setEvents={setEvents}
                currentEvent={currentEvent}
                setCurrentEvent={setCurrentEvent}
            />
            {events.length && currentEvent ? <TaskBox
                setEvents={setEvents}
                currentEvent={currentEvent}
                events={events}
                setCurrentEvent={setCurrentEvent}
            /> : <div className={"text-nowrap flex-1 flex justify-center items-center text-3xl font-bold px-8"}>
                点击左侧➕添加事件
            </div>}
        </div>
    );
}

export default KanbanBoard