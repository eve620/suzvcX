interface AddTaskButtonProps {
    handleClick: () => void;
}

const AddTaskButton: React.FC<AddTaskButtonProps> = ({handleClick}) => {
    return (
        <div className='add-task-button' onClick={handleClick}>
            +
        </div>
    );
};

export default AddTaskButton;
