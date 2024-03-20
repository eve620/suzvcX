interface ViewerProps {
    value: string
}

const Viewer: React.FC<ViewerProps> = ({value}) => {
    return (
        <div className={"prose break-all leading-3"} dangerouslySetInnerHTML={{__html: value}}/>
    );
};

export default Viewer;