interface ViewerProps {
    value: string
}

const Viewer: React.FC<ViewerProps> = ({value}) => {
    return (
        <div className={"prose"} dangerouslySetInnerHTML={{__html: value}}/>
    );
};

export default Viewer;