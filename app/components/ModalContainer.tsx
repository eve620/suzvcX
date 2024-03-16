    "use client"

    interface ContainerProps {
        children: React.ReactNode
    }

    const ModalContainer: React.FC<ContainerProps> = ({children}) => {
        return (
            <div>
                {children}
            </div>
        );
    }

    export default ModalContainer;