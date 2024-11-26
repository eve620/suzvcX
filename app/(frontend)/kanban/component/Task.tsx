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
            className="bg-gray-50 relative dark:bg-gray-600 p-4 mb-2 rounded text-gray-800
            dark:text-gray-200 hover:opacity-80"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onClick={() => handleUpdate(id)}
        >
            <div className={'flex text-sm items-center'}>
                <span className={'text-[0.6em] mr-1 text-[#9c9c9c]'}>●</span>
                <h2 className='truncate'>{name}</h2>
            </div>
            <p className='text-[0.7em] mt-2 text-[#9c9c9c] break-words mb-2'>{details}</p>
            <div className='remove-bar pr-3 pb-3 leading-3' onClick={(e) => handleRemove(id, e)}>
                -
            </div>
            <div>
            </div>
        </div>
    );
};

export default Task;
