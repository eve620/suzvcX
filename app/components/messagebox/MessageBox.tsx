"use client"

import {useEffect, useRef, useState} from "react";
import "./messageBox.css";

const MessageBox: React.FC = () => {
    const [position, setPosition] = useState({x: 0, y: 0});
    const [isNoSelect, setIsNoSelect] = useState(false);

    const messageDragRef = useRef<HTMLDivElement>(null);
    const messageContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let isDragging = false;
        let initialX = 0;
        let initialY = 0;
        const handleMouseDown = (e: MouseEvent) => {
            isDragging = true;
            initialX = e.clientX - position.x;
            initialY = e.clientY - position.y;
            document.body.classList.add('noSelect');
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        };

        const handleMouseMove = (e: MouseEvent) => {
            console.log(e)
            if (!isDragging) return;
            let newX = Math.max(0, e.clientX - initialX);
            let newY = Math.max(0, e.clientY - initialY);

            // 如果需要，也可以限制最大值，确保不会超出窗口边界
            const maxRight = window.innerWidth - messageContainerRef.current!.offsetWidth - 10;
            const maxBottom = window.innerHeight - messageContainerRef.current!.offsetHeight;
            newX = Math.min(maxRight, newX);
            newY = Math.min(maxBottom, newY);

            setPosition({
                x: newX,
                y: newY,
            });
        };

        const handleMouseUp = () => {
            isDragging = false;
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.body.classList.remove('noSelect');
        };

        if (messageDragRef.current) {
            messageDragRef.current.addEventListener('mousedown', handleMouseDown);
        }

        return () => {
            if (messageDragRef.current) {
                messageDragRef.current.removeEventListener('mousedown', handleMouseDown);
            }
        };
    }, [position]);
    return (
        <div ref={messageContainerRef}
             className={"bg-gray-100 rounded-xl overflow-hidden w-64 h-80 fixed z-50 shadow-lg"} style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
        }}>
            <div
                ref={messageDragRef}
                className={"bg-gray-200 cursor-pointer"}>
                顶部
            </div>
            <div>聊天框</div>
        </div>
    )
}
export default MessageBox;