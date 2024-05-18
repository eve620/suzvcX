interface AddEventButtonProps {
    handleClick: () => void;
}

const AddEventButton: React.FC<AddEventButtonProps> = ({handleClick}) => {
    return (
        <div className='add-button' onClick={handleClick}>
            +
        </div>
    );
};

export default AddEventButton;
