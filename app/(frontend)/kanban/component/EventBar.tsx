"use client"

import React, {useCallback, useState} from 'react';
import AddEventButton from './AddEventButton';
import Modal from "@/app/components/modals/Modal";
import Input from "@/app/components/Input";
import showMessage from "@/app/components/Message";

interface EventBarProps {
    events: any
    setEvents: any
    currentEvent: any
    setCurrentEvent: any
}

const EventBar: React.FC<EventBarProps> = ({events, setEvents, currentEvent, setCurrentEvent}) => {
    const [isAddEvent, setIsAddEvent] = useState(false)
    const [newEventName, setNewEventName] = useState('')
    const modalBody = (
        <Input value={newEventName} onChange={(e) => setNewEventName(e.target.value)}/>
    )
    const handleAdd = useCallback(() => {
        // Prevent Duplicated
        if (
            events.find((event:any) => event.title.toLowerCase() === newEventName.trim().toLowerCase())
        ) {
            showMessage(`${newEventName.trim()}已存在`);
            return;
        }
        if (!newEventName) showMessage("名称不能为空")
        // Add new event
        if (newEventName) {
            setEvents((prev:any) => [
                ...prev,
                {
                    title: newEventName.trim(),
                    toDo: [],
                    inProgress: [],
                    completed: [],
                },
            ]);
        }
        setNewEventName("")
        setIsAddEvent(false)
    }, [newEventName, events, setEvents]);

    return (
        <div className='event-bar'>
            <h1 className='event-bar-title'>代办事项</h1>
            <AddEventButton handleClick={() => setIsAddEvent(true)}/>
            {/*<AddEventButton handleClick={handleAdd}/>*/}
            <div className='event-container'>
                {events.map((item:any) => (
                    <div
                        key={item.title}
                        className={`event over-hide ${currentEvent && currentEvent.title === item.title ? 'selected-event' : ''
                        }`}
                        onClick={() => setCurrentEvent(item)}
                    >
                        {item.title}
                    </div>
                ))}
            </div>
            <Modal title={"请输入名称"} body={modalBody} isOpen={isAddEvent} onClose={() => {
                setIsAddEvent(false)
                setNewEventName("")
            }}
                   onSubmit={handleAdd}
                   actionLabel={"确定"}/>
        </div>
    );
};

export default EventBar;
