"use client"
import React, {useCallback, useState} from 'react';
import Column from './Column';
import {DragDropContext, DropResult} from "@hello-pangea/dnd";
import Modal from "@/app/components/modals/Modal";

interface TaskBoxProps {
    events: any[];
    setEvents: any;
    currentEvent: any;
    setCurrentEvent: any;
}

const TaskBox: React.FC<TaskBoxProps> = ({events, setEvents, currentEvent, setCurrentEvent}) => {
    const [isRemove, setIsRemove] = useState(false);

    const handleRemove = useCallback(async () => {
        const removeEvent = await fetch("/api/kanban", {
            method: "DELETE",
            body: JSON.stringify({title: currentEvent.title}),
        })
        if (removeEvent.ok) {
            setEvents((prev:any) => {
                const result = prev.filter((item:any) => item.title != currentEvent.title);
                if (result.length) {
                    setCurrentEvent(result[0]);
                }
                return result;
            });
            setIsRemove(false)
        }
    }, [setEvents, currentEvent, setCurrentEvent]);

    const handleDragEnd = useCallback((result: DropResult) => {
        if (!result.destination) return
        const {source, destination} = result;
        const curEvent = events.find((item) => item.title === currentEvent.title);
        if (!curEvent) return;
        const taskCopy = curEvent[source.droppableId][source.index];
        setEvents((prev:any) =>
            prev.map((event:any) => {
                if (event.title === currentEvent.title) {
                    let eventCopy = {...event};
                    // Remove from source
                    const taskListSource = event[source.droppableId];
                    taskListSource.splice(source.index, 1);
                    eventCopy = {...event, [source.droppableId]: taskListSource};
                    // Add to destination
                    const taskListDes = event[destination.droppableId];
                    taskListDes.splice(destination.index, 0, taskCopy);
                    eventCopy = {...event, [destination.droppableId]: taskListDes};
                    return eventCopy;
                } else {
                    return event;
                }
            })
        );
    }, [events, setEvents, currentEvent]);


    return (
        <>
            <div className='task-box'>
                <header className='task-box-header'>
                    <h1 className='task-box-title'>所有任务</h1>
                    <button className='remove-button tracking-wider' onClick={() => {
                        setIsRemove(true)
                    }}>
                        删除事件
                    </button>
                </header>
                <DragDropContext onDragEnd={(result) => handleDragEnd(result)}>
                    <div className='task-box-body'>
                        {
                            ['toDo', 'inProgress', 'completed'].map((tag) => (
                                <Column
                                    key={tag}
                                    tag={tag}
                                    events={events}
                                    setEvents={setEvents}
                                    currentEvent={currentEvent}
                                />
                            ))
                        }
                    </div>
                </DragDropContext>
            </div>
            <Modal title={"确定删除吗？"} isOpen={isRemove} secondaryAction={() => {
                setIsRemove(false)
            }} secondaryActionLabel={"取消"} onClose={() => {
                setIsRemove(false)
            }} onSubmit={handleRemove} actionLabel={"确认"}/>
        </>
    );
};

export default TaskBox;
