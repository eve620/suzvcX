"use client"
import React, {useCallback, useEffect, useState} from 'react';
import Column from './Column';
import {DragDropContext, Draggable, Droppable} from "@hello-pangea/dnd";

interface TaskBoxProps {
    events: any[];
    setEvents: any;
    currentEvent: any;
    setCurrentEvent: any;
}

const TaskBox: React.FC<TaskBoxProps> = ({events, setEvents, currentEvent, setCurrentEvent}) => {
    const handleRemove = useCallback(async () => {
        if (confirm('You really want to remove it?')) {
            const removeEvent = await fetch("http://localhost:3000/api/kanban", {
                method: "DELETE",
                body: JSON.stringify({title: currentEvent.title}),
            })
            if (removeEvent.ok) {
                setEvents((prev) => {
                    const result = prev.filter((item) => item.title != currentEvent.title);
                    if (result.length) {
                        setCurrentEvent(result[0]);
                    }
                    return result;
                });
            }
            // update events
        }
    }, [setEvents, currentEvent, setCurrentEvent]);

    const handleDragEnd = useCallback((result) => {
        if (!result.destination) return
        const {source, destination} = result;
        const curEvent = events.find((item) => item.title === currentEvent.title);
        const taskCopy = curEvent[source.droppableId][source.index];
        setEvents((prev) =>
            prev.map((event) => {
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

    useEffect(() => {
        // console.log(JSON.stringify(events))
        // console.log(JSON.parse(JSON.stringify(events))[0]?.toDo[0]?.name)
    }, [events])

    return (
        <div className='task-box'>
            <header className='task-box-header'>
                <h1 className='task-box-title'>All Tasks</h1>
                <button className='remove-button' onClick={handleRemove}>
                    Remove this Event
                </button>
            </header>
            <DragDropContext onDragEnd={(result) => handleDragEnd(result)}>
                <div className='task-box-body'>
                    {
                        ['toDo', 'inProgress', 'completed'].map(tag => (
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
    );
};

export default TaskBox;
