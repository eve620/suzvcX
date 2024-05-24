"use client"

import AddTaskButton from './AddTaskButton';
import Task from './Task';
import {Droppable, Draggable} from '@hello-pangea/dnd';

import uuid from 'react-uuid';

interface ColumnProps {
    events: any[];
    setEvents: React.Dispatch<React.SetStateAction<any[]>>;
    currentEvent: any;
    tag: string;
}

const Column: React.FC<ColumnProps> = ({tag, currentEvent, events, setEvents}) => {
    const handleAdd = () => {
        const name = prompt('Enter task name:');
        const details = prompt('Enter details:');
        if (!(name && details)) return;
        setEvents((prev) => {
            const arrCopy = [...prev];
            const index = prev.findIndex(
                (event) => event.title === currentEvent.title
            );
            const eventCopy = arrCopy[index];
            // Remove old and add the latest data
            arrCopy.splice(index, 1, {
                ...eventCopy,
                [tag]: [
                    ...eventCopy[tag],
                    {name: name, id: uuid(), details: details},
                ],
            });
            return arrCopy;
        });
    };

    const handleRemove = (id: number, e) => {
        // 禁止冒泡到上层:修改task
        e.stopPropagation();
        setEvents((prev) =>
            prev.map((event) => {
                if (event.title === currentEvent.title) {
                    const taskList = event[tag];
                    const index = taskList.findIndex((item) => item.id === id);
                    taskList.splice(index, 1);
                    return {...event, [tag]: [...taskList]};
                } else {
                    return event;
                }
            })
        );
    };

    const handleUpdate = (id: number) => {
        const name = prompt('Update task name:');
        const details = prompt('Update details:');
        if (!(name && details)) return;
        setEvents((prev) =>
            prev.map((event) => {
                if (event.title === currentEvent.title) {
                    const taskList = event[tag];
                    const index = taskList.findIndex((item) => item.id === id);
                    const updatedTask = {
                        ...taskList[index],
                        name,
                        details,
                    };
                    taskList.splice(index, 1);
                    return {...event, [tag]: [...taskList, updatedTask]};
                } else {
                    return event;
                }
            })
        );
    };

    return (
        <div className='column text-nowrap'>
            {tag === 'toDo' ? 'To do' : tag === 'inProgress' ? 'In progress' : tag === 'completed' ? 'Completed' : null}
            <AddTaskButton handleClick={handleAdd}/>
            <Droppable droppableId={tag}>
                {(provided, snapshot) => {
                    return (
                        <div
                            className='task-container min-h-16 max-h-[40vh] overflow-y-auto'
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {events
                                .find((event) => event.title === currentEvent.title)
                                ?.[tag].map((item, index) => (
                                <Draggable
                                    key={item.id}
                                    draggableId={item.id}
                                    index={index}
                                >
                                    {(provided, snapshot) => (
                                        <Task
                                            name={item.name}
                                            details={item.details}
                                            id={item.id}
                                            provided={provided}
                                            snapshot={snapshot}
                                            handleRemove={handleRemove}
                                            handleUpdate={handleUpdate}
                                        />
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    );
                }}
            </Droppable>
        </div>
    );
};

export default Column;
