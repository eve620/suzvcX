interface TaskProps {
    name: string;
    details: string;
    id: number;
    provided: any;
    handleUpdate: (id: number) => void;
    handleRemove: (id: number, e: any) => void;
}

const Task: React.FC<TaskProps> = ({name, details, id, provided, handleUpdate, handleRemove}) => {
    return (
        <div
            className='task relative overflow-hidden'
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onClick={() => handleUpdate(id)}
        >
            <h2 className='task-name over-hide'>{name}</h2>
            <p className='task-details'>{details}</p>
            <div className='remove-bar pr-3 pb-3 leading-3' onClick={(e) => handleRemove(id, e)}>
                -
            </div>
            <div>
            </div>
        </div>
    );
};

export default Task;
