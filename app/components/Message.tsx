import {useEffect, useState} from "react";
import {createRoot} from "react-dom/client";
import {clearTimeout} from "timers";

type Props = {
    message: string
    onClose?: void
}

const Message = (props: Props) => {
    const [isShow, setIsAlert] = useState(false)
    useEffect(() => {
        setIsAlert(true)
        const timeout = setTimeout(() => {
            setIsAlert(false)
        }, 800)
        return () => {
            clearTimeout(timeout)
        }
    }, []);
    return (
        <div
            className={`absolute text-sm bg-pink-600 rounded-xl shadow-lg shadow-pink-900 z-10 top-10 left-1/2 -translate-x-1/2 text-center text-neutral-200 p-1 px-6 ${isShow ? 'opacity-100' : 'opacity-0'} duration-300`}>
            {props.message}
        </div>
    )
};

const showMessage = (message: string) => {
    const messageElement = <Message message={message}/>;
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);
    root.render(messageElement);
    setTimeout(() => {
        document.body.removeChild(container)
    }, 1000)
}
export default showMessage;